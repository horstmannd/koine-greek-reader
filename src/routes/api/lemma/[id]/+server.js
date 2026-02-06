import { json } from '@sveltejs/kit';
import { getLemma, getTokensByLemma } from '$lib/data';
import { lemmaResponseSchema } from '$lib/schema';

export function GET({ params }) {
  const lemma = getLemma(params.id);

  if (!lemma) {
    return json({ error: 'Lemma not found.' }, { status: 404 });
  }

  const tokens = getTokensByLemma(lemma.id);
  const payload = { lemma, tokens };
  const parsed = lemmaResponseSchema.safeParse(payload);

  if (!parsed.success) {
    return json({ error: 'Invalid lemma payload.' }, { status: 500 });
  }

  return json(parsed.data, {
    headers: {
      'cache-control': 'public, max-age=600'
    }
  });
}
