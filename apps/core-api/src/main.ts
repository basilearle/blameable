import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const PORT = process.env.PORT || 3000;

const app = new Hono();

app.get('/', (c) => c.text('Hello Node.js!'));

const server = serve({
  fetch: app.fetch,
  port: +PORT,
}, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// graceful shutdown
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    process.exit(0);
  });
});
