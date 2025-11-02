export const environment = {
  port: process.env.PORT || '3000',
  corsOrigins: process.env.CORS_ORIGINS?.split(',').map(o => o.trim()),
  corsCredentials: process.env.CORS_CREDENTIALS === 'true',
  apiSpec: process.env.API_SPEC === 'true',
  databaseUrl: process.env.DATABASE_URL,
  // NOTE: hardcoded for now... will likely need a requesting origin lookup table in the future
  siteId: 'effa29b5-6e0e-4ea4-9ffc-5f826170fe09',
};
