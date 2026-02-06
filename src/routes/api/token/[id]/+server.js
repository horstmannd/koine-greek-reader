import { json } from '@sveltejs/kit';
import { getLemma, getToken } from '$lib/data';
import { tokenResponseSchema } from '$lib/schema';

export function GET({ params }) {
  const token = getToken(params.id);

  if (!token) {
    return json({ error: 'Token not found.' }, { status: 404 });
  }

  const lemma = getLemma(token.lemmaId) ?? undefined;
  const payload = { token, lemma };
  const parsed = tokenResponseSchema.safeParse(payload);

  if (!parsed.success) {
    return json({ error: 'Invalid token payload.' }, { status: 500 });
  }

  return json(parsed.data, {
    headers: {
      'cache-control': 'public, max-age=600'
    }
  });
}
