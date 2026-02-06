import fs from 'node:fs/promises';
import path from 'node:path';
import https from 'node:https';

const args = process.argv.slice(2);
const argMap = new Map();
for (let i = 0; i < args.length; i += 1) {
  const key = args[i];
  const value = args[i + 1];
  if (key?.startsWith('--')) {
    argMap.set(key.replace(/^--/, ''), value ?? true);
  }
}

const output = argMap.get('output') ?? path.join('data', 'raw', 'lexemes.yaml');
const url =
  'https://raw.githubusercontent.com/morphgnt/morphological-lexicon/master/lexemes.yaml';

const download = (targetUrl, redirectCount = 0) =>
  new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error('Too many redirects.'));
      return;
    }

    https
      .get(targetUrl, (response) => {
        if ([301, 302, 307, 308].includes(response.statusCode)) {
          const nextUrl = response.headers.location;
          if (!nextUrl) {
            reject(new Error('Redirect without location.'));
            return;
          }
          resolve(download(nextUrl, redirectCount + 1));
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Request failed with status ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      })
      .on('error', reject);
  });

await fs.mkdir(path.dirname(output), { recursive: true });
const content = await download(url);
await fs.writeFile(output, content, 'utf-8');

console.log(`Downloaded lexemes.yaml to ${output}`);
