import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { config } from 'dotenv';

import { environment } from './environment';
import { apiRouter } from './router/router';
import { CoreDataClientService } from './services/core-data-client/CoreDataClientService';

// Load environment variables
config();

// Initialize core data connection pool
CoreDataClientService.initialize();

const app = new OpenAPIHono();

app.route('/api', apiRouter);

serve({
  fetch: app.fetch,
  port: +environment.port,
}, () => {
  console.log(`Server is running on http://localhost:${environment.port}`);
  console.log(`CORS origins: ${environment.corsOrigins?.join(', ') ?? 'NONE DEFINED.'}`);
});
