import { OpenAPIHono } from '@hono/zod-openapi';

import { localeRouter } from './locale/router';
import { metricsRouter } from './metrics/router';
import { staticRouter } from './static/router';
import { themeRouter } from './theme/router';

export const sitesRouter = new OpenAPIHono();

sitesRouter.route('/:siteId/locales', localeRouter);
sitesRouter.route('/:siteId/metrics', metricsRouter);
sitesRouter.route('/:siteId/static', staticRouter);
sitesRouter.route('/:siteId/theme', themeRouter);

// ---

sitesRouter.post('/');

sitesRouter.get('/:siteId');

sitesRouter.patch('/:siteId');

sitesRouter.delete('/:siteId');
