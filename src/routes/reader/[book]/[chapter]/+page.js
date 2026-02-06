import { error } from '@sveltejs/kit';
import { getVerses, getToken, lemmasData } from '$lib/data';

export async function load({ params }) {
  const { book, chapter } = params;
  const data = getVerses(book, Number(chapter));

  if (!data) {
    throw error(404, 'Verse set not found');
  }

  const tokens = {};
  for (const verse of data.verses) {
    for (const tokenId of verse.tokenIds) {
      tokens[tokenId] = getToken(tokenId);
    }
  }

  const lemmas = {};
  for (const lemma of lemmasData) {
    lemmas[lemma.id] = lemma;
  }

  return {
    book: data.book,
    chapter: data.chapter,
    verses: data.verses,
    tokens,
    lemmas
  };
}
