# Repo name: koine-greek-reader

An interactive SvelteKit-based reader for studying Koine Greek texts with morphological, lexical, and grammatical annotations.  
This project is intentionally **single-user / personal** (no accounts), focused on deep learning and senior-level engineering practices.

---

## 1. Purpose & Personal Scope

This app exists to help me:
- Read **Koine Greek** slowly and accurately
- Understand **inflections, parsing, and grammar** in context
- Learn verse-by-verse through **1 John 1**
- Interact with the text in a way that mirrors real scholarly tools, but simplified

Non-goals:
- No user accounts or authentication
- No multi-user collaboration
- No commercial ambitions

Progress and preferences are stored **locally** only.

---

## 2. Text Source & Licensing

### Source
- **SBL Greek New Testament (SBLGNT)**

### License
- Creative Commons Attribution 4.0 (CC BY 4.0)

### Compliance plan
- Attribute SBLGNT clearly in:
  - App footer
  - `/about` page
  - Repository README
- Link to license and source
- Indicate that the text is adapted/processed

No copyrighted English translations are included.

---

## 3. Technology Stack

### Framework
- **SvelteKit** (frontend + backend)
- JavaScript

### Deployment
- **Vercel** (Hobby / Free)
- `@sveltejs/adapter-vercel`

### Styling
- Simple, readable UI
- Tailwind

### Testing
- Unit tests: Vitest
- E2E tests: Playwright (key interactions only)

---

## 4. Architecture Overview

This is a **local-first, static-content-heavy** application.

### Data strategy
- SBLGNT source is processed into **normalized JSON** at build time
- No runtime database
- SvelteKit `+server.ts` endpoints serve structured data

### Why this approach
- Deterministic builds
- Fast page loads
- Easy deployment
- Still demonstrates backend discipline (validation, caching, APIs)

---

## 5. Core Features (MVP)

### Reader
- Display **1 John 1**, verse by verse
- Greek tokens rendered inline
- Clean typography optimized for polytonic Greek

### Token interaction
- **Hover** → popover with:
  - lemma
  - gloss
  - parsing
- **Click** → pin details to a “Study Panel”

### Study panel
- Lemma details
- Morphology breakdown
- Short grammar explanations (written for learners)
- “Add to vocab” button

### Toggles
- Show / hide glosses
- Show / hide parsing under tokens

### Navigation
- Keyboard navigation:
  - next / previous token
  - next / previous verse
- Mobile-friendly interactions

---

## 6. Pages & Routes

### UI routes
- `/reader/1john/1`
- `/lemma/[lemmaId]`
- `/search`
- `/about`

### API routes (SvelteKit server)
- `GET /api/verses?book=1john&chapter=1`
- `GET /api/token/[id]`
- `GET /api/lemma/[id]`

All API responses:
- Typed
- Validated with Zod
- Cached with headers where appropriate

---

## 7. Data Model (Conceptual)

### Verse
- book
- chapter
- verse
- tokenIds[]

### Token
- id
- surface (Greek form)
- lemmaId
- morphCode
- gloss

### Lemma
- id
- headword
- glosses[]

### MorphCode
- code (e.g. V-AAI-3S)
- expanded explanation
- teaching note

---

## 8. Local-Only Persistence (No Accounts)

Stored in IndexedDB:
- bookmarked verses
- vocabulary list
- quiz / review history

### Export / Import
- Export progress to JSON
- Import JSON to restore state
- No server involvement

This preserves privacy while still allowing portability.

---

## 9. Testing Strategy

### Unit tests
- Morphology code parsing
- Token lookup
- Search logic

### E2E tests
1. Hover a token → popover appears
2. Click token → study panel pins
3. Navigate verses → state updates correctly
4. Add vocab → persists after reload

---

## 10. What This Project Demonstrates

- Text ingestion & normalization
- Domain modeling for linguistic data
- Rich, accessible UI interactions
- SvelteKit frontend + backend usage
- Licensing awareness & compliance
- Thoughtful scope control

---

## 11. Future (Optional, Not Required)

- More chapters/books
- Grammar index pages
- Spaced repetition vocab trainer
- Pronunciation audio

The MVP stands on its own as a senior-level project.
