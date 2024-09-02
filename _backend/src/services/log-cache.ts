import { loadTreeHash, saveTreeHash } from '../infrastructure/tree-hash';
import { calcTreeHash, getGitLog } from '../infrastructure/git';
import { saveCachedLog } from '../infrastructure/log';

export function isStale(): boolean {
  const lastHash = loadTreeHash();

  if (!lastHash) {
    return true;
  }

  const currentHash = calcTreeHash();
  return currentHash !== lastHash;
}

export async function updateLogCache(): Promise<void> {
  const start = new Date();

  const log = await getGitLog();
  saveCachedLog(log);

  const hash = calcTreeHash();
  saveTreeHash(hash);

  const end = new Date();
  console.log(end.getTime() - start.getTime(), ' msec');
}