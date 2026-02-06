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

const definitions = {
  ...Object.fromEntries(
    Object.entries(POS_MAP).map(([key, value]) => [value, `${value} part of speech.`])
  ),
  ...Object.fromEntries(
    Object.entries(POS_PREFIX_MAP).map(([key, value]) => [value, `${value} part of speech.`])
  ),
  Nominative: 'Usually the subject or predicate noun.',
  Genitive: 'Often shows possession or source.',
  Dative: 'Often indirect object or means/association.',
  Accusative: 'Often direct object or extent.',
  Vocative: 'Direct address.',
  Singular: 'One.',
  Plural: 'More than one.',
  Masculine: 'Masculine grammatical gender.',
  Feminine: 'Feminine grammatical gender.',
  Neuter: 'Neuter grammatical gender.',
  Present: 'Ongoing or habitual action, often unfolding in the present.',
  Imperfect: 'Ongoing action in past time.',
  Future: 'Action expected to occur in future time.',
  Aorist: 'Action viewed as a whole, often a simple past.',
  Perfect: 'Completed action with ongoing results.',
  Pluperfect: 'Completed action in the past with ongoing results in the past.',
  Active: 'The subject performs the action.',
  Middle: 'The subject participates in or is affected by the action.',
  Passive: 'The subject receives the action.',
  'Middle or Passive': 'Form can be middle or passive; context clarifies.',
  'Middle Deponent': 'Middle form with active meaning.',
  'Passive Deponent': 'Passive form with active meaning.',
  Indicative: 'States a fact or asks a question about reality.',
  Subjunctive: 'Expresses possibility, purpose, or potential.',
  Optative: 'Expresses wish or potential (rare in NT).',
  Imperative: 'Gives a command or request.',
  Infinitive: 'Verbal noun; the action as a concept.',
  Participle: 'Verbal adjective; action describing a noun.',
  'First person': 'Speaker(s).',
  'Second person': 'Addressed person(s).',
  'Third person': 'Person(s) spoken about.'
};

const buildExplanations = (pos, features) => {
  const labels = [pos, ...(features ?? [])].filter(Boolean);
  const seen = new Set();

  return labels
    .filter((label) => {
      if (seen.has(label)) return false;
      seen.add(label);
      return definitions[label];
    })
    .map((label) => ({ label, definition: definitions[label] }));
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
    raw: code,
    explanations: buildExplanations(pos, features)
  };
};
