import { error } from '@sveltejs/kit';
import { getLemma, getTokensByLemma } from '$lib/data';

export function load({ params }) {
  const lemma = getLemma(params.lemmaId);

  if (!lemma) {
    throw error(404, 'Lemma not found');
  }

  const tokens = getTokensByLemma(lemma.id);

  return { lemma, tokens };
}
