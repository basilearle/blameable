import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';

import { createClient } from '@hey-api/openapi-ts';
import { workspaceRoot } from '@nx/devkit';

import { API_DOC } from '../src/router/router';

async function generateClient() {
  const specPath = join(process.cwd(), 'tmp/openapi.json');

  mkdirSync(dirname(specPath), { recursive: true });
  writeFileSync(specPath, JSON.stringify(API_DOC, null, 2));

  const REPO_OUTPUT_PATH = 'libs/client-codegen/artifacts/core-api';
  const FULL_OUTPUT_PATH = join(workspaceRoot, REPO_OUTPUT_PATH);

  await createClient({
    input: specPath,
    output: FULL_OUTPUT_PATH,
  });

  rmSync(join(process.cwd(), 'tmp'), { recursive: true, force: true });

  console.log(`✅ OpenAPI client generated at: ${REPO_OUTPUT_PATH}`);
}

generateClient().catch(console.error);
