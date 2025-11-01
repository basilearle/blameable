export const environment = {
  port: process.env.PORT || '3000',
  corsOrigins: process.env.CORS_ORIGINS?.split(',').map(o => o.trim()) || ['http://localhost:4200'],
  corsCredentials: process.env.CORS_CREDENTIALS === 'true',
  apiSpec: process.env.API_SPEC === 'true',
};
