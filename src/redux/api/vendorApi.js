import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, VENDOR_ENDPOINTS } from '../constants/apiEndpoints';
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

const unwrapData = response => response?.data ?? response;

const makeVendorProfileFormData = ({ fields = {}, profileImage }) => {
  const formData = new FormData();

  formData.append('_method', 'PUT');
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value ?? '');
  });

  if (profileImage?.uri) {
    formData.append('profile_picture', {
      uri: profileImage.uri,
      type: profileImage.type || 'image/jpeg',
      name: profileImage.fileName || 'vendor_profile.jpg',
    });
  }

  return formData;
};

const makeServicesFormData = ({ services }) => {
  const formData = new FormData();
  formData.append('services', JSON.stringify(services));
  return formData;
};

const vendorBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;

    headers.set('Accept', 'application/json');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: withApiLogger(vendorBaseQuery, 'VENDOR'),
  tagTypes: ['VendorProfile'],
  endpoints: builder => ({
    getVendorAuthMe: builder.query({
      query: () => VENDOR_ENDPOINTS.authMe,
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getVendorProfile: builder.query({
      query: () => VENDOR_ENDPOINTS.profile,
      providesTags: ['VendorProfile'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    updateVendorProfile: builder.mutation({
      query: payload => ({
        url: VENDOR_ENDPOINTS.profile,
        method: 'POST',
        body: makeVendorProfileFormData(payload),
      }),
      invalidatesTags: ['VendorProfile'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    updateVendorServices: builder.mutation({
      query: payload => ({
        url: VENDOR_ENDPOINTS.servicesUpdate,
        method: 'POST',
        body: makeServicesFormData(payload),
      }),
      invalidatesTags: ['VendorProfile'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    changeVendorPassword: builder.mutation({
      query: body => ({
        url: VENDOR_ENDPOINTS.password,
        method: 'POST',
        body,
      }),
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
  }),
});

export const {
  useChangeVendorPasswordMutation,
  useGetVendorAuthMeQuery,
  useGetVendorProfileQuery,
  useUpdateVendorProfileMutation,
  useUpdateVendorServicesMutation,
} = vendorApi;
