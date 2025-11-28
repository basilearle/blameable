import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { config } from 'dotenv';

import { environment } from './environment';
import { apiRouter } from './router/router';

// Load environment variables
config({
  // removes stupid marketing logs from dotenv
  quiet: true,
});

const app = new OpenAPIHono();

app.route('/api', apiRouter);

serve({
  fetch: app.fetch,
  port: +environment.port,
}, () => {
  console.log(`Server is running on http://localhost:${environment.port}`);
  console.log(`CORS origins: ${environment.corsOrigins?.join(', ') ?? 'NONE DEFINED.'}`);
});
