import { createBetterAuthPool } from '@blameable/core-data';

import { environment } from '../environment';
import { db } from './db';

export const auth = createBetterAuthPool(db, environment.corsOrigins);
