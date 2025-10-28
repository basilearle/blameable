import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { apiRouter } from './router/router';

const PORT = process.env.PORT || 3000;

const app = new Hono();

app.route('/api', apiRouter);

serve({
  fetch: app.fetch,
  port: +PORT,
}, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
