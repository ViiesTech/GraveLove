export const API_BASE_URL = 'https://grave-love.predemo.site/api/v1';

export const AUTH_ENDPOINTS = {
  userRegister: 'client/auth/register',
  userLogin: 'client/auth/login',
  vendorRegister: 'vendor/auth/register',
  vendorLogin: 'vendor/auth/login',
  userForgotPassword: 'client/auth/forgot-password',
  vendorForgotPassword: 'vendor/auth/forgot-password',
  verifyOtp: 'verify-otp',
  resendOtp: 'resend-otp',
  userResetPassword: 'client/auth/reset-password',
  vendorResetPassword: 'vendor/auth/reset-password',
  userLogout: 'client/auth/logout',
  vendorLogout: 'vendor/auth/logout',
};

export const DEVICE_NAME = 'GraveLove Mobile App';

export const USER_ENDPOINTS = {
  dashboard: 'client/dashboard',
  profile: 'client/profile',
  profilePassword: 'client/profile/password',
  memorials: 'client/memorials',
  memorialDetail: memorialId => `client/memorials/${memorialId}`,
  memorialLocation: memorialId => `client/memorials/${memorialId}/location`,
  selectMemorial: memorialId => `client/memorials/${memorialId}/select`,
  dashboardSelectedMemorial: 'client/dashboard/selected-memorial',
  bookings: 'client/bookings',
  bookingDetail: bookingId => `client/bookings/${bookingId}`,
  bookingVisitLogs: bookingId => `client/bookings/${bookingId}/visit-logs`,
  createBookingVisitLog: bookingId => `client/bookings/${bookingId}/visit-logs`,
  notifications: 'client/notifications',
  notificationsUnreadCount: 'client/notifications/unread-count',
  notificationsReadAll: 'client/notifications/read-all',
  notificationRead: notificationId => `client/notifications/${notificationId}/read`,
  wallet: 'client/wallet',
  walletTransactions: 'client/wallet/transactions',
  vendors: 'client/vendors',
  topVendors: 'client/vendors/top',
  vendorDetail: vendorId => `client/vendors/${vendorId}`,
  vendorServices: vendorId => `client/vendors/${vendorId}/services`,
  vendorSlots: (vendorId, date) =>
    `client/vendors/${vendorId}/slots?date=${encodeURIComponent(date)}`,
  bookingOptions: 'client/booking-options',
  createBooking: 'client/bookings',
  memorialServices: memorialId => `client/memorials/${memorialId}/services`,
  memorialPhotos: memorialId => `client/memorials/${memorialId}/photos`,
  memorialPosts: memorialId => `client/memorials/${memorialId}/posts`,
  memorialTributes: memorialId => `client/memorials/${memorialId}/tributes`,
  postReactions: postId => `client/posts/${postId}/reactions`,
  postComments: postId => `client/posts/${postId}/comments`,
  postShare: postId => `client/posts/${postId}/share`,
  memorialAlerts: memorialId => `client/memorials/${memorialId}/alerts`,
};

export const VENDOR_ENDPOINTS = {
  authMe: 'vendor/auth/me',
  profile: 'vendor/profile',
  servicesUpdate: 'vendor/services/update',
  password: 'vendor/settings/password',
};
