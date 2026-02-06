import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'yaml';

const args = process.argv.slice(2);
const argMap = new Map();
for (let i = 0; i < args.length; i += 1) {
  const key = args[i];
  const value = args[i + 1];
  if (key?.startsWith('--')) {
    argMap.set(key.replace(/^--/, ''), value ?? true);
  }
}

const inputPath = argMap.get('input');
const book = argMap.get('book');
const chapter = Number(argMap.get('chapter'));
const format = argMap.get('format') ?? (inputPath?.endsWith('.txt') ? 'morphgnt' : 'json');
const lexiconPath = argMap.get('lexicon');

if (!inputPath || !book || Number.isNaN(chapter)) {
  console.error(
    'Usage: node scripts/ingest-sblgnt.mjs --input data/raw/83-1Jn-morphgnt.txt --book 1john --chapter 1 --format morphgnt --lexicon data/raw/lexemes.yaml'
  );
  process.exit(1);
}

const slugFor = (osis) => {
  const map = {
    '1Jn': '1john',
    '2Jn': '2john',
    '3Jn': '3john',
    Jn: 'john',
    Mt: 'matthew',
    Mk: 'mark',
    Lk: 'luke',
    Ac: 'acts',
    Ro: 'romans',
    '1Co': '1corinthians',
    '2Co': '2corinthians',
    Ga: 'galatians',
    Eph: 'ephesians',
    Php: 'philippians',
    Col: 'colossians',
    '1Th': '1thessalonians',
    '2Th': '2thessalonians',
    '1Ti': '1timothy',
    '2Ti': '2timothy',
    Tit: 'titus',
    Phm: 'philemon',
    Heb: 'hebrews',
    Jas: 'james',
    '1Pe': '1peter',
    '2Pe': '2peter',
    Jud: 'jude',
    Re: 'revelation'
  };

  return map[osis] ?? osis?.toLowerCase();
};

const normalizeBook = (value) => {
  if (!value) return '';
  if (value.includes('john')) return value.toLowerCase();
  return slugFor(value);
};

const bookNumberMap = {
  1: 'matthew',
  2: 'mark',
  3: 'luke',
  4: 'john',
  5: 'acts',
  6: 'romans',
  7: '1corinthians',
  8: '2corinthians',
  9: 'galatians',
  10: 'ephesians',
  11: 'philippians',
  12: 'colossians',
  13: '1thessalonians',
  14: '2thessalonians',
  15: '1timothy',
  16: '2timothy',
  17: 'titus',
  18: 'philemon',
  19: 'hebrews',
  20: 'james',
  21: '1peter',
  22: '2peter',
  23: '1john',
  24: '2john',
  25: '3john',
  26: 'jude',
  27: 'revelation'
};

const parseMorphgntLine = (line) => {
  const parts = line.split('\t').map((value) => value.trim()).filter(Boolean);
  let fields = parts;

  if (fields.length < 7) {
    fields = line.split(/\s+/).map((value) => value.trim()).filter(Boolean);
  }

  if (fields.length < 7) return null;

  const [bcv, pos, parse, text, word, norm, lemma] = fields;

  if (/^\d{6}$/.test(bcv)) {
    const bookNumber = Number(bcv.slice(0, 2));
    const chapterValue = Number(bcv.slice(2, 4));
    const verseValue = Number(bcv.slice(4, 6));
    const bookSlug = bookNumberMap[bookNumber];

    if (!bookSlug) return null;

    return {
      book: bookSlug,
      chapter: chapterValue,
      verse: verseValue,
      surface: text,
      lemma,
      morph: [pos, parse].filter(Boolean).join('-'),
      norm,
      word
    };
  }

  const match = bcv.match(/([1-3]?[A-Za-z]+)\s*(\d+):(\d+)/);
  if (!match) return null;

  const [, osis, chapterValue, verseValue] = match;

  return {
    book: normalizeBook(osis),
    chapter: Number(chapterValue),
    verse: Number(verseValue),
    surface: text,
    lemma,
    morph: [pos, parse].filter(Boolean).join('-'),
    norm,
    word
  };
};

const rawText = await fs.readFile(inputPath, 'utf-8');
let lexiconMap = new Map();

const buildLexiconMap = (data) => {
  const map = new Map();

  if (Array.isArray(data)) {
    for (const entry of data) {
      if (!entry || typeof entry !== 'object') continue;
      const key = entry.lexeme ?? entry.lemma ?? entry.id ?? entry.key;
      const gloss = entry.gloss ?? entry.short_gloss ?? entry.glosses;
      if (key && gloss) {
        const value = Array.isArray(gloss) ? gloss[0] : gloss;
        map.set(String(key), String(value));
      }
    }
  } else if (data && typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      if (!value || typeof value !== 'object') continue;
      const gloss = value.gloss ?? value.short_gloss ?? value.glosses;
      if (gloss) {
        const normalized = Array.isArray(gloss) ? gloss[0] : gloss;
        map.set(String(key), String(normalized));
      }
    }
  }

  return map;
};

if (lexiconPath) {
  const lexiconText = await fs.readFile(lexiconPath, 'utf-8');
  const lexiconData = yaml.parse(lexiconText);
  lexiconMap = buildLexiconMap(lexiconData);
}

let raw = [];

if (format === 'morphgnt') {
  const rows = rawText.split('\n').map((line) => line.trim()).filter(Boolean);
  raw = rows.map(parseMorphgntLine).filter(Boolean);
} else {
  raw = JSON.parse(rawText);
  if (!Array.isArray(raw)) {
    console.error('Input must be a JSON array of token rows.');
    process.exit(1);
  }
}

let tokenIdCounter = 1;
const tokens = [];
const lemmaMap = new Map();
const verseMap = new Map();

for (const row of raw) {
  if (row.book !== book || Number(row.chapter) !== chapter) {
    continue;
  }

  const tokenId = row.tokenId ?? tokenIdCounter++;
  const lemmaId = row.lemmaId ?? row.lemma;
  const gloss = row.gloss ?? lexiconMap.get(row.lemma) ?? '';

  const token = {
    id: tokenId,
    surface: row.surface,
    lemmaId,
    morphCode: row.morph,
    gloss
  };

  tokens.push(token);

  if (!lemmaMap.has(lemmaId)) {
    lemmaMap.set(lemmaId, {
      id: lemmaId,
      headword: row.lemma,
      glosses: gloss ? [gloss] : []
    });
  } else if (gloss) {
    const existing = lemmaMap.get(lemmaId);
    if (!existing.glosses.includes(gloss)) {
      existing.glosses.push(gloss);
    }
  }

  const verseKey = `${row.book}-${row.chapter}-${row.verse}`;
  if (!verseMap.has(verseKey)) {
    verseMap.set(verseKey, {
      book: row.book,
      chapter: Number(row.chapter),
      verse: Number(row.verse),
      tokenIds: []
    });
  }

  verseMap.get(verseKey).tokenIds.push(tokenId);
}

const verses = Array.from(verseMap.values()).sort((a, b) => a.verse - b.verse);
const lemmaList = Array.from(lemmaMap.values()).sort((a, b) => a.headword.localeCompare(b.headword));

const outputRoot = path.resolve('src/lib/data');
await fs.mkdir(outputRoot, { recursive: true });

await fs.writeFile(
  path.join(outputRoot, `${book}.json`),
  JSON.stringify({ book, chapter, verses }, null, 2)
);
await fs.writeFile(path.join(outputRoot, 'tokens.json'), JSON.stringify(tokens, null, 2));
await fs.writeFile(path.join(outputRoot, 'lemmas.json'), JSON.stringify(lemmaList, null, 2));

console.log(`Wrote ${verses.length} verses, ${tokens.length} tokens, ${lemmaList.length} lemmas.`);
