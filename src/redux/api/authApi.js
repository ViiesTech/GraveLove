import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  DEVICE_NAME,
} from '../constants/apiEndpoints';
import { clearCredentials, setCredentials } from '../slices/authSlice';
import { withApiLogger } from './apiLogger';

const extractMessage = payload => {
  if (!payload) {
    return 'Something went wrong';
  }

  if (typeof payload === 'string') {
    return payload;
  }

  if (typeof payload?.message === 'string') {
    return payload.message;
  }

  if (typeof payload?.data?.message === 'string') {
    return payload.data.message;
  }

  const errors = payload?.errors;

  if (errors && typeof errors === 'object') {
    const firstError = Object.values(errors)[0];

    if (Array.isArray(firstError) && firstError.length) {
      return firstError[0]?.toString();
    }

    if (firstError) {
      return firstError.toString();
    }
  }

  return 'Something went wrong';
};

const firstValue = (...values) =>
  values.find(value => value !== undefined && value !== null);

const booleanFrom = value => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'string') {
    return ['1', 'true', 'yes', 'completed', 'complete'].includes(
      value.toLowerCase(),
    );
  }

  return undefined;
};

const inferVendorProfileCreated = userData => {
  const explicit = booleanFrom(
    firstValue(
      userData?.isProfileCreated,
      userData?.is_profile_created,
      userData?.profile_created,
      userData?.profile_completed,
      userData?.is_profile_completed,
      userData?.has_profile,
    ),
  );

  if (explicit !== undefined) {
    return explicit;
  }

  const business = userData?.vendor_business || userData?.business;

  if (business && typeof business === 'object') {
    return Boolean(
      business.business_name ||
        business.service_location ||
        business.phone_number ||
        business.business_phone_number ||
        (Array.isArray(business.services) && business.services.length),
    );
  }

  return true;
};

const normalizeAuthPayload = (response, role = 'user') => {
  const data =
    response?.data && typeof response.data === 'object'
      ? response.data
      : response || {};
  const token = firstValue(data?.token, response?.token, null);
  const userData = firstValue(
    data?.user,
    data?.client,
    data?.vendor,
    data?.profile,
    data?.auth_user,
    data,
    response?.user,
    null,
  );
  const isProfileCreated =
    role === 'vendor' ? inferVendorProfileCreated(userData) : true;

  return { data, isProfileCreated, token, userData };
};

const persistAuthResponse = (dispatch, response, role) => {
  const { isProfileCreated, token, userData } = normalizeAuthPayload(
    response,
    role,
  );

  if (token) {
    dispatch(setCredentials({ token, userData, role, isProfileCreated }));
  }
};

const makeFormData = ({ bodyFields = {}, profileImage, services = [] }) => {
  const formData = new FormData();

  formData.append('full_name', bodyFields.full_name || bodyFields.name || '');
  formData.append('email', bodyFields.email || '');
  formData.append('password', bodyFields.password || '');
  formData.append(
    'password_confirmation',
    bodyFields.password_confirmation ||
      bodyFields.c_password ||
      bodyFields.password ||
      '',
  );
  formData.append('phone_number', bodyFields.phone_number || '');
  formData.append('city', bodyFields.city || '');
  formData.append('device_name', bodyFields.device_name || DEVICE_NAME);
  formData.append('services', JSON.stringify(services));

  if (profileImage?.uri) {
    formData.append('profile_picture', {
      uri: profileImage.uri,
      type: profileImage.type || 'image/jpeg',
      name: profileImage.fileName || 'profile_picture.jpg',
    });
  }

  return formData;
};

const authBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;

      headers.set('Accept', 'application/json');
      headers.set('User-Agent', 'GraveLove-Mobile-App/1.0');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: withApiLogger(authBaseQuery, 'AUTH'),
  endpoints: builder => ({
    forgotPassword: builder.mutation({
      query: ({ email, role = 'user' }) => ({
        url:
          role === 'vendor'
            ? AUTH_ENDPOINTS.vendorForgotPassword
            : AUTH_ENDPOINTS.userForgotPassword,
        method: 'POST',
        body: { email },
      }),
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: AUTH_ENDPOINTS.userLogin,
        method: 'POST',
        body: { email, password, device_name: DEVICE_NAME },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        persistAuthResponse(dispatch, response, 'user');
      },
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    loginVendor: builder.mutation({
      query: ({ email, password }) => ({
        url: AUTH_ENDPOINTS.vendorLogin,
        method: 'POST',
        body: { email, password, device_name: DEVICE_NAME },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        persistAuthResponse(dispatch, response, 'vendor');
      },
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    logout: builder.mutation({
      query: ({ role = 'user' } = {}) => ({
        url:
          role === 'vendor'
            ? AUTH_ENDPOINTS.vendorLogout
            : AUTH_ENDPOINTS.userLogout,
        method: 'POST',
        body: { device_name: DEVICE_NAME },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
        }
      },
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    registerUser: builder.mutation({
      query: body => ({
        url: AUTH_ENDPOINTS.userRegister,
        method: 'POST',
        body: { ...body, device_name: body?.device_name || DEVICE_NAME },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        persistAuthResponse(dispatch, response, 'user');
      },
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    registerVendor: builder.mutation({
      query: payload => ({
        url: AUTH_ENDPOINTS.vendorRegister,
        method: 'POST',
        body: makeFormData(payload),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        persistAuthResponse(dispatch, response, 'vendor');
      },
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    resendOtp: builder.mutation({
      query: userId => ({
        url: AUTH_ENDPOINTS.resendOtp,
        method: 'POST',
        body: { user_id: userId },
      }),
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ role = 'user', ...body }) => ({
        url:
          role === 'vendor'
            ? AUTH_ENDPOINTS.vendorResetPassword
            : AUTH_ENDPOINTS.userResetPassword,
        method: 'POST',
        body,
      }),
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ otp, role = 'user', userId }) => ({
        url: AUTH_ENDPOINTS.verifyOtp,
        method: 'POST',
        body: {
          otp,
          user_id: userId,
          user_type: role === 'vendor' ? 1 : 2,
        },
      }),
      async onQueryStarted({ role = 'user' }, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        persistAuthResponse(dispatch, response, role);
      },
      transformErrorResponse: response => ({
        message: extractMessage(response?.data),
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLoginUserMutation,
  useLoginVendorMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  useRegisterVendorMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} = authApi;
