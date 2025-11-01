import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { workspaceRoot } from '@nx/devkit';

import { API_DOC } from '../src/router/router';

const outputPath = join(
  workspaceRoot,
  'libs/client-codegen/specs/core-api-openapi.json'
);

mkdirSync(dirname(outputPath), { recursive: true });

writeFileSync(
  outputPath,
  JSON.stringify(API_DOC, null, 2)
);

console.log(`✅ OpenAPI spec generated at: \n ${outputPath}`);
