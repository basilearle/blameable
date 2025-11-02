import { createDatabase, type Database } from '@blameable/core-data';

import { environment } from '../../environment';

class CoreDataClientService {
  private static instance: Database | null = null;

  static initialize(): void {
    if (this.instance) {
      console.warn('CoreDataClientService already initialized');
      return;
    }

    this.instance = createDatabase(environment.databaseUrl);

    console.log('CoreDataClientService connection pool initialized');
  }

  static getDatabase(): Database {
    if (!this.instance) {
      throw new Error('CoreDataClientService not initialized.');
    }

    return this.instance;
  }
}

export { CoreDataClientService };
