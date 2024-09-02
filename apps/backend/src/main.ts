#!/usr/bin/env node

import { parseOptions } from './options/parse-options';
import { ensureConfig } from './infrastructure/config';
import { getEntryGlobs, inferDeps } from './infrastructure/deps';
import { isRepo } from './infrastructure/git';
import { openSync } from './utils/open';
import { setupExpress } from './express';

const options = parseOptions(process.argv.slice(2));

if (options.path) {
  process.chdir(options.path);
}

ensureConfig(options);

if (!inferDeps(options)) {
  console.error(
    'No entry points found. Tried:',
    getEntryGlobs(options).join(', ')
  );
  console.error(
    '\nPlease configured your entry points in .detective/config.json'
  );
  process.exit(1);
}

if (!isRepo()) {
  console.warn('This does not seem to be a git repository.');
  console.warn('Most diagrams provided by detective do not work without git!');
}

const app = setupExpress(options);

app.listen(options.port, () => {
  const url = `http://localhost:${options.port}`;
  console.log(`Detective runs at ${url}`);
  if (options.open) {
    openSync(url);
  }
});