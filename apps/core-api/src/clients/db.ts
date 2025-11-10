import { createDatabase, type Database } from '@blameable/core-data';

import { environment } from '../environment';

export const db: Database = createDatabase(environment.databaseUrl);
