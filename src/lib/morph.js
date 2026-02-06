const POS_MAP = {
  N: 'Noun',
  V: 'Verb',
  A: 'Adjective',
  R: 'Pronoun',
  D: 'Adverb',
  C: 'Conjunction',
  P: 'Preposition',
  T: 'Article',
  I: 'Interjection',
  X: 'Particle'
};

const POS_PREFIX_MAP = {
  RA: 'Article',
  RR: 'Relative pronoun',
  RP: 'Personal pronoun',
  RD: 'Demonstrative pronoun',
  RI: 'Interrogative pronoun',
  RE: 'Reflexive pronoun',
  RX: 'Reciprocal pronoun'
};

const CASE_MAP = {
  N: 'Nominative',
  G: 'Genitive',
  D: 'Dative',
  A: 'Accusative',
  V: 'Vocative'
};

const NUMBER_MAP = {
  S: 'Singular',
  P: 'Plural'
};

const GENDER_MAP = {
  M: 'Masculine',
  F: 'Feminine',
  N: 'Neuter'
};

const TENSE_MAP = {
  P: 'Present',
  I: 'Imperfect',
  F: 'Future',
  A: 'Aorist',
  X: 'Perfect',
  Y: 'Pluperfect'
};

const VOICE_MAP = {
  A: 'Active',
  M: 'Middle',
  P: 'Passive',
  E: 'Middle or Passive',
  D: 'Middle Deponent',
  O: 'Passive Deponent'
};

const MOOD_MAP = {
  I: 'Indicative',
  S: 'Subjunctive',
  O: 'Optative',
  M: 'Imperative',
  N: 'Infinitive',
  P: 'Participle'
};

const PERSON_MAP = {
  1: 'First',
  2: 'Second',
  3: 'Third'
};

const matchCng = (code) => {
  const match = code.match(/([NGDAV])([SP])([MFN])/);
  if (!match) return null;
  const [, c, n, g] = match;
  return {
    case: CASE_MAP[c],
    number: NUMBER_MAP[n],
    gender: GENDER_MAP[g]
  };
};

const matchVerb = (code) => {
  const match = code.match(/([123])([PIFAXY])([AMPEDO])([ISOMNP])-?([SP])?/);
  if (!match) return null;
  const [, person, tense, voice, mood, number] = match;
  return {
    person: PERSON_MAP[person],
    tense: TENSE_MAP[tense],
    voice: VOICE_MAP[voice],
    mood: MOOD_MAP[mood],
    number: number ? NUMBER_MAP[number] : null
  };
};

export const parseMorphCode = (code) => {
  if (!code) return { raw: '' };

  const posSegment = code.split('-')[0];
  const pos = POS_PREFIX_MAP[posSegment] ?? POS_MAP[posSegment?.[0]] ?? 'Unknown';
  const features = [];

  const verb = matchVerb(code);
  if (verb) {
    features.push(verb.tense, verb.voice, verb.mood, verb.person && `${verb.person} person`, verb.number);
  } else {
    const cng = matchCng(code);
    if (cng) {
      features.push(cng.case, cng.number, cng.gender);
    }
  }

  return {
    pos,
    features: features.filter(Boolean),
    raw: code
  };
};
