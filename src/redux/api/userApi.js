import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, USER_ENDPOINTS } from '../constants/apiEndpoints';
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

export const unwrapData = response => response?.data ?? response;

export const unwrapList = response => {
  const data = unwrapData(response);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

const makeProfileFormData = ({ fields = {}, profileImage }) => {
  const formData = new FormData();

  formData.append('_method', 'PUT');
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value ?? '');
  });

  if (profileImage?.uri) {
    formData.append('profile_picture', {
      uri: profileImage.uri,
      type: profileImage.type || 'image/jpeg',
      name: profileImage.fileName || 'profile_picture.jpg',
    });
  }

  return formData;
};

const userBaseQuery = fetchBaseQuery({
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

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: withApiLogger(userBaseQuery, 'USER'),
  tagTypes: [
    'Bookings',
    'Dashboard',
    'Memorials',
    'Notifications',
    'Profile',
    'Wallet',
  ],
  endpoints: builder => ({
    getClientDashboard: builder.query({
      query: () => USER_ENDPOINTS.dashboard,
      providesTags: ['Dashboard'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientProfile: builder.query({
      query: () => USER_ENDPOINTS.profile,
      providesTags: ['Profile'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    updateClientProfile: builder.mutation({
      query: payload => ({
        url: USER_ENDPOINTS.profile,
        method: 'POST',
        body: makeProfileFormData(payload),
      }),
      invalidatesTags: ['Profile'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    updateClientProfilePassword: builder.mutation({
      query: body => ({
        url: USER_ENDPOINTS.profilePassword,
        method: 'PUT',
        body,
      }),
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientMemorials: builder.query({
      query: () => USER_ENDPOINTS.memorials,
      providesTags: ['Memorials'],
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientMemorialDetail: builder.query({
      query: memorialId => USER_ENDPOINTS.memorialDetail(memorialId),
      providesTags: (_result, _error, memorialId) => [
        { type: 'Memorials', id: memorialId },
      ],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    createClientMemorial: builder.mutation({
      query: body => ({
        url: USER_ENDPOINTS.memorials,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Dashboard', 'Memorials'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    updateClientMemorial: builder.mutation({
      query: ({ memorialId, body }) => ({
        url: USER_ENDPOINTS.memorialDetail(memorialId),
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { memorialId }) => [
        'Dashboard',
        'Memorials',
        { type: 'Memorials', id: memorialId },
      ],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    updateClientMemorialLocation: builder.mutation({
      query: ({ memorialId, body }) => ({
        url: USER_ENDPOINTS.memorialLocation(memorialId),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { memorialId }) => [
        'Dashboard',
        'Memorials',
        { type: 'Memorials', id: memorialId },
      ],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    deleteClientMemorial: builder.mutation({
      query: memorialId => ({
        url: USER_ENDPOINTS.memorialDetail(memorialId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Dashboard', 'Memorials'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    selectMemorial: builder.mutation({
      query: memorialId => ({
        url: USER_ENDPOINTS.selectMemorial(memorialId),
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['Dashboard', 'Memorials'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    selectDashboardMemorial: builder.mutation({
      query: memorialId => ({
        url: USER_ENDPOINTS.dashboardSelectedMemorial,
        method: 'POST',
        body: { memorial_id: memorialId },
      }),
      invalidatesTags: ['Dashboard', 'Memorials'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientBookings: builder.query({
      query: () => USER_ENDPOINTS.bookings,
      providesTags: ['Bookings'],
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientBookingDetail: builder.query({
      query: bookingId => USER_ENDPOINTS.bookingDetail(bookingId),
      providesTags: (_result, _error, bookingId) => [
        { type: 'Bookings', id: bookingId },
      ],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientBookingVisitLogs: builder.query({
      query: bookingId => USER_ENDPOINTS.bookingVisitLogs(bookingId),
      providesTags: (_result, _error, bookingId) => [
        { type: 'Bookings', id: `${bookingId}-visit-logs` },
      ],
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    createClientBookingVisitLog: builder.mutation({
      query: ({ bookingId, body }) => ({
        url: USER_ENDPOINTS.createBookingVisitLog(bookingId),
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { bookingId }) => [
        'Bookings',
        { type: 'Bookings', id: bookingId },
        { type: 'Bookings', id: `${bookingId}-visit-logs` },
      ],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientNotifications: builder.query({
      query: () => USER_ENDPOINTS.notifications,
      providesTags: ['Notifications'],
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientNotificationsUnreadCount: builder.query({
      query: () => USER_ENDPOINTS.notificationsUnreadCount,
      providesTags: ['Notifications'],
      transformResponse: response => {
        const data = unwrapData(response);
        return Number(data?.unread_count ?? data ?? 0) || 0;
      },
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    markAllClientNotificationsRead: builder.mutation({
      query: () => ({
        url: USER_ENDPOINTS.notificationsReadAll,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['Notifications'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    markClientNotificationRead: builder.mutation({
      query: notificationId => ({
        url: USER_ENDPOINTS.notificationRead(notificationId),
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['Notifications'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientWallet: builder.query({
      query: () => USER_ENDPOINTS.wallet,
      providesTags: ['Wallet'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientWalletTransactions: builder.query({
      query: () => USER_ENDPOINTS.walletTransactions,
      providesTags: ['Wallet'],
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientVendors: builder.query({
      query: ({ search, perPage = 30 } = {}) => {
        const params = [];
        if (search?.trim()) {
          params.push(`search=${encodeURIComponent(search.trim())}`);
        }
        if (perPage) {
          params.push(`per_page=${perPage}`);
        }
        return params.length
          ? `${USER_ENDPOINTS.vendors}?${params.join('&')}`
          : USER_ENDPOINTS.vendors;
      },
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientTopVendors: builder.query({
      query: ({ perPage = 10 } = {}) =>
        `${USER_ENDPOINTS.topVendors}?per_page=${perPage}`,
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientVendorDetail: builder.query({
      query: vendorId => USER_ENDPOINTS.vendorDetail(vendorId),
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientVendorServices: builder.query({
      query: vendorId => USER_ENDPOINTS.vendorServices(vendorId),
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientVendorSlots: builder.query({
      query: ({ vendorId, date }) => USER_ENDPOINTS.vendorSlots(vendorId, date),
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientBookingOptions: builder.query({
      query: () => USER_ENDPOINTS.bookingOptions,
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    createClientBooking: builder.mutation({
      query: body => ({
        url: USER_ENDPOINTS.createBooking,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bookings', 'Dashboard'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientMemorialServices: builder.query({
      query: memorialId => USER_ENDPOINTS.memorialServices(memorialId),
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientMemorialPhotos: builder.query({
      query: memorialId => USER_ENDPOINTS.memorialPhotos(memorialId),
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientMemorialPosts: builder.query({
      query: memorialId => USER_ENDPOINTS.memorialPosts(memorialId),
      providesTags: ['Memorials'],
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    createClientMemorialPost: builder.mutation({
      query: ({ memorialId, body }) => ({
        url: USER_ENDPOINTS.memorialPosts(memorialId),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Memorials'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientMemorialTributes: builder.query({
      query: memorialId => USER_ENDPOINTS.memorialTributes(memorialId),
      transformResponse: unwrapList,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    createClientMemorialTribute: builder.mutation({
      query: ({ memorialId, body }) => ({
        url: USER_ENDPOINTS.memorialTributes(memorialId),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Memorials'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    reactToClientPost: builder.mutation({
      query: ({ postId, body }) => ({
        url: USER_ENDPOINTS.postReactions(postId),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Memorials'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    commentOnClientPost: builder.mutation({
      query: ({ postId, body }) => ({
        url: USER_ENDPOINTS.postComments(postId),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Memorials'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    shareClientPost: builder.mutation({
      query: ({ postId, body }) => ({
        url: USER_ENDPOINTS.postShare(postId),
        method: 'POST',
        body,
      }),
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    getClientMemorialAlerts: builder.query({
      query: memorialId => USER_ENDPOINTS.memorialAlerts(memorialId),
      providesTags: ['Memorials'],
      transformResponse: unwrapData,
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
    updateClientMemorialAlerts: builder.mutation({
      query: ({ memorialId, body }) => ({
        url: USER_ENDPOINTS.memorialAlerts(memorialId),
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Memorials'],
      transformErrorResponse: response => ({ message: extractMessage(response?.data) }),
    }),
  }),
});

export const {
  useCommentOnClientPostMutation,
  useCreateClientBookingMutation,
  useCreateClientBookingVisitLogMutation,
  useCreateClientMemorialMutation,
  useCreateClientMemorialPostMutation,
  useCreateClientMemorialTributeMutation,
  useDeleteClientMemorialMutation,
  useGetClientBookingDetailQuery,
  useGetClientBookingsQuery,
  useGetClientBookingOptionsQuery,
  useGetClientBookingVisitLogsQuery,
  useGetClientDashboardQuery,
  useGetClientMemorialAlertsQuery,
  useGetClientMemorialDetailQuery,
  useGetClientMemorialPhotosQuery,
  useGetClientMemorialPostsQuery,
  useGetClientMemorialServicesQuery,
  useGetClientMemorialsQuery,
  useGetClientMemorialTributesQuery,
  useGetClientNotificationsQuery,
  useGetClientNotificationsUnreadCountQuery,
  useGetClientProfileQuery,
  useGetClientTopVendorsQuery,
  useGetClientVendorDetailQuery,
  useGetClientVendorsQuery,
  useGetClientVendorServicesQuery,
  useGetClientVendorSlotsQuery,
  useLazyGetClientVendorSlotsQuery,
  useGetClientWalletQuery,
  useGetClientWalletTransactionsQuery,
  useMarkAllClientNotificationsReadMutation,
  useMarkClientNotificationReadMutation,
  useReactToClientPostMutation,
  useSelectDashboardMemorialMutation,
  useSelectMemorialMutation,
  useShareClientPostMutation,
  useUpdateClientMemorialAlertsMutation,
  useUpdateClientMemorialLocationMutation,
  useUpdateClientMemorialMutation,
  useUpdateClientProfileMutation,
  useUpdateClientProfilePasswordMutation,
} = userApi;
