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

const book = argMap.get('book');
const output = argMap.get('output');

const bookToFile = {
  matthew: '61-Mt-morphgnt.txt',
  mark: '62-Mk-morphgnt.txt',
  luke: '63-Lk-morphgnt.txt',
  john: '64-Jn-morphgnt.txt',
  acts: '65-Ac-morphgnt.txt',
  romans: '66-Ro-morphgnt.txt',
  '1corinthians': '67-1Co-morphgnt.txt',
  '2corinthians': '68-2Co-morphgnt.txt',
  galatians: '69-Ga-morphgnt.txt',
  ephesians: '70-Eph-morphgnt.txt',
  philippians: '71-Php-morphgnt.txt',
  colossians: '72-Col-morphgnt.txt',
  '1thessalonians': '73-1Th-morphgnt.txt',
  '2thessalonians': '74-2Th-morphgnt.txt',
  '1timothy': '75-1Ti-morphgnt.txt',
  '2timothy': '76-2Ti-morphgnt.txt',
  titus: '77-Tit-morphgnt.txt',
  philemon: '78-Phm-morphgnt.txt',
  hebrews: '79-Heb-morphgnt.txt',
  james: '80-Jas-morphgnt.txt',
  '1peter': '81-1Pe-morphgnt.txt',
  '2peter': '82-2Pe-morphgnt.txt',
  '1john': '83-1Jn-morphgnt.txt',
  '2john': '84-2Jn-morphgnt.txt',
  '3john': '85-3Jn-morphgnt.txt',
  jude: '86-Jud-morphgnt.txt',
  revelation: '87-Re-morphgnt.txt'
};

if (!book || !bookToFile[book]) {
  console.error('Usage: node scripts/fetch-morphgnt.mjs --book 1john [--output data/raw/83-1Jn-morphgnt.txt]');
  process.exit(1);
}

const filename = bookToFile[book];
const outputPath = output ?? path.join('data', 'raw', filename);
const url = `https://raw.githubusercontent.com/morphgnt/sblgnt/master/${filename}`;

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

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const content = await download(url);
await fs.writeFile(outputPath, content, 'utf-8');

console.log(`Downloaded ${filename} to ${outputPath}`);
