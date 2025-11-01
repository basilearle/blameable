declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production' | 'test';
      PORT?: string;
      CORS_ORIGINS?: string;
      CORS_CREDENTIALS?: string;
    }
  }
}

export {};