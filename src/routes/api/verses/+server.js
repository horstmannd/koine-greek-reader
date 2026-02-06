import { json } from '@sveltejs/kit';
import { getVerses } from '$lib/data';
import { versesResponseSchema } from '$lib/schema';

export function GET({ url }) {
  const book = url.searchParams.get('book');
  const chapter = url.searchParams.get('chapter');

  if (!book || !chapter) {
    return json({ error: 'Missing book or chapter.' }, { status: 400 });
  }

  const data = getVerses(book, Number(chapter));

  if (!data) {
    return json({ error: 'Verse set not found.' }, { status: 404 });
  }

  const parsed = versesResponseSchema.safeParse(data);

  if (!parsed.success) {
    return json({ error: 'Invalid verse payload.' }, { status: 500 });
  }

  return json(parsed.data, {
    headers: {
      'cache-control': 'public, max-age=600'
    }
  });
}
