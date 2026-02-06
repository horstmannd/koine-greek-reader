import { describe, expect, it } from 'vitest';
import { getToken, getVerses } from '$lib/data';

describe('data access', () => {
  it('returns verses for 1john chapter 1', () => {
    const data = getVerses('1john', 1);
    expect(data?.book).toBe('1john');
    expect(data?.chapter).toBe(1);
  });

  it('returns a token by id', () => {
    const token = getToken(1);
    expect(token?.surface).toBe('ὃ');
  });
});
