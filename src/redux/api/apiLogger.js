const SENSITIVE_KEYS = ['authorization', 'password', 'token', 'access_token'];

const isSensitiveKey = key =>
  SENSITIVE_KEYS.some(item => key.toLowerCase().includes(item));

const sanitizeValue = value => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (typeof FormData !== 'undefined' && value instanceof FormData) {
    return '[FormData]';
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  return Object.entries(value).reduce((next, [key, item]) => {
    next[key] = isSensitiveKey(key) ? '***' : sanitizeValue(item);
    return next;
  }, {});
};

const normalizeRequest = args => {
  if (typeof args === 'string') {
    return { url: args, method: 'GET' };
  }

  return {
    url: args?.url,
    method: args?.method || 'GET',
    body: sanitizeValue(args?.body),
    params: sanitizeValue(args?.params),
  };
};

export const withApiLogger = (baseQuery, label) => async (args, api, extraOptions) => {
  const startedAt = Date.now();
  const result = await baseQuery(args, api, extraOptions);

  if (__DEV__) {
    const request = normalizeRequest(args);
    const duration = `${Date.now() - startedAt}ms`;

    if (result.error) {
      console.log(`[${label} API ERROR]`, {
        ...request,
        duration,
        error: sanitizeValue(result.error),
      });
    } else {
      console.log(`[${label} API RESPONSE]`, {
        ...request,
        duration,
        data: sanitizeValue(result.data),
      });
    }
  }

  return result;
};
