import { z } from 'zod';

export const tokenSchema = z.object({
  id: z.number().int(),
  surface: z.string(),
  lemmaId: z.string(),
  morphCode: z.string(),
  gloss: z.string()
});

export const lemmaSchema = z.object({
  id: z.string(),
  headword: z.string(),
  glosses: z.array(z.string())
});

export const verseSchema = z.object({
  book: z.string(),
  chapter: z.number().int(),
  verse: z.number().int(),
  tokenIds: z.array(z.number().int())
});

export const versesResponseSchema = z.object({
  book: z.string(),
  chapter: z.number().int(),
  verses: z.array(verseSchema)
});

export const tokenResponseSchema = z.object({
  token: tokenSchema,
  lemma: lemmaSchema.optional()
});

export const lemmaResponseSchema = z.object({
  lemma: lemmaSchema,
  tokens: z.array(tokenSchema)
});
