import versesData from './data/1john.json';
import tokensData from './data/tokens.json';
import lemmasData from './data/lemmas.json';

const tokenMap = new Map(tokensData.map((token) => [token.id, token]));
const lemmaMap = new Map(lemmasData.map((lemma) => [lemma.id, lemma]));

export function getVerses(book, chapter) {
  if (book !== versesData.book || Number(chapter) !== versesData.chapter) {
    return null;
  }

  return versesData;
}

export function getToken(id) {
  return tokenMap.get(Number(id)) ?? null;
}

export function getLemma(id) {
  return lemmaMap.get(id) ?? null;
}

export function getTokensByLemma(lemmaId) {
  return tokensData.filter((token) => token.lemmaId === lemmaId);
}

export { tokensData, lemmasData };
