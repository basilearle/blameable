import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';

import { apiRouter } from './router/router';

const PORT = process.env.PORT || 3000;

const app = new OpenAPIHono();

app.route('/api', apiRouter);

serve({
  fetch: app.fetch,
  port: +PORT,
}, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
