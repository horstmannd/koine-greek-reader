# Raw SBLGNT Input

Place raw token data here. The ingestion script supports:

1) MorphGNT SBLGNT text files (tab-separated, e.g. `83-1Jn-morphgnt.txt`)
2) JSON arrays of token rows (custom)

For MorphGNT input:
- Download `83-1Jn-morphgnt.txt` from the MorphGNT SBLGNT dataset
- Run the script with `--format morphgnt`

For JSON input, each row should have at least:

- `book` (string, e.g. "1john")
- `chapter` (number)
- `verse` (number)
- `surface` (string, Greek form)
- `lemma` (string, lemma headword)
- `morph` (string, morph code)
- `gloss` (string, gloss)

Optional fields:
- `lemmaId` (string) preferred stable ID
- `tokenId` (number) stable token ID (if omitted, the script assigns incrementing IDs)

Run:

```bash
npm run fetch:morphgnt -- --book 1john
npm run ingest:sblgnt -- --input data/raw/83-1Jn-morphgnt.txt --book 1john --chapter 1 --format morphgnt
```
