export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  appMode: import.meta.env.VITE_APP_MODE || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};