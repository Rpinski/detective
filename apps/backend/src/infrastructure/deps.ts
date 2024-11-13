import fs from 'fs';
import { cwd } from 'process';

import { getProjectData } from '@softarc/sheriff-core';
import { globSync } from 'fast-glob';

import { Deps } from '../model/deps';
import { Options } from '../options/options';

import { loadConfig } from './config';

const DEFAULT_ENTRIES = [
  'src/main.tsx?',
  'main.tsx?',
  'src/index.tsx?',
  'index.tsx?',
  'projects/*/src/main.tsx?',
  'projects/*/src/index.tsx?',
  'packages/*/src/main.tsx?',
  'packages/*/src/index.tsx?',
];

const DEFAULT_NX_ENTRIES = [
  'apps/**/src/main.tsx?',
  'libs/**/src/index.tsx?',
  'packages/**/src/main.tsx?',
];

let deps: Deps;

export function loadDeps(_options: Options): Deps {
  if (!deps) {
    throw new Error('no dependencies loaded!');
  }
  return deps;
}

export function inferDeps(options: Options): boolean {
  const entryGlobs = getEntryGlobs(options);
  const entries = globSync(entryGlobs);

  if (entries.length === 0) {
    return false;
  }

  const dir = cwd();

  const sheriffDump = entries
    .map((e) => getProjectData(e, dir))
    .reduce((acc, curr) => ({ ...acc, ...curr }));

  deps = normalizeObject(sheriffDump);

  return true;
}

export function getEntryGlobs(options: Options) {
  const config = loadConfig(options);

  let entryGlobs = DEFAULT_ENTRIES;
  if (config.entries?.length > 0) {
    entryGlobs = config.entries;
  } else if (fs.existsSync('nx.json')) {
    entryGlobs = DEFAULT_NX_ENTRIES;
  }
  return entryGlobs;
}

function normalizeObject<T>(obj: T): T {
  const normalized = JSON.stringify(obj).replace(/\\\\/g, '/');
  return JSON.parse(normalized);
}
