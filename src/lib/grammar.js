export const quickDefinitions = {
  tense: {
    Present: 'Ongoing or habitual action, often unfolding in the present.',
    Imperfect: 'Ongoing action in past time.',
    Future: 'Action expected to occur in future time.',
    Aorist: 'Action viewed as a whole, often a simple past.',
    Perfect: 'Completed action with ongoing results.',
    Pluperfect: 'Completed action in the past with ongoing results in the past.'
  },
  voice: {
    Active: 'The subject performs the action.',
    Middle: 'The subject participates in or is affected by the action.',
    Passive: 'The subject receives the action.',
    'Middle or Passive': 'Form can be middle or passive; context clarifies.',
    'Middle Deponent': 'Middle form with active meaning.',
    'Passive Deponent': 'Passive form with active meaning.'
  },
  mood: {
    Indicative: 'States a fact or asks a question about reality.',
    Subjunctive: 'Expresses possibility, purpose, or potential.',
    Optative: 'Expresses wish or potential (rare in NT).',
    Imperative: 'Gives a command or request.',
    Infinitive: 'Verbal noun; the action as a concept.',
    Participle: 'Verbal adjective; action describing a noun.'
  },
  case: {
    Nominative: 'Usually the subject or predicate noun.',
    Genitive: 'Often shows possession or source.',
    Dative: 'Often indirect object or means/association.',
    Accusative: 'Often direct object or extent.',
    Vocative: 'Direct address.'
  },
  number: {
    Singular: 'One.',
    Plural: 'More than one.'
  },
  gender: {
    Masculine: 'Masculine grammatical gender.',
    Feminine: 'Feminine grammatical gender.',
    Neuter: 'Neuter grammatical gender.'
  },
  person: {
    'First person': 'Speaker(s).',
    'Second person': 'Addressed person(s).',
    'Third person': 'Person(s) spoken about.'
  }
};

export const nounEndingsFirstSecond = {
  title: 'Master Case Endings (First & Second Declension) — from UGG',
  note: 'Columns show endings with stem vowel, followed by the true case ending.',
  columns: [
    'Case',
    '2nd Masc (with vowel)',
    '2nd Masc (ending)',
    '1st Fem α (with vowel)',
    '1st Fem η (with vowel)',
    '1st Fem (ending)',
    '2nd Neut (with vowel)',
    '2nd Neut (ending)'
  ],
  rows: [
    ['Singular — Nominative', 'ος', 'ς', 'α', 'η', '-', 'ον', 'ν'],
    ['Singular — Genitive', 'ου', 'υ', 'ας', 'ης', 'ς', 'ου', 'υ'],
    ['Singular — Dative', 'ῳ', 'ι', 'ᾳ', 'ῃ', 'ι', 'ῳ', 'ι'],
    ['Singular — Accusative', 'ον', 'ν', 'αν', 'ην', 'ν', 'ον', 'ν'],
    ['Plural — Nominative', 'οι', 'ι', 'αι', 'αι', 'ι', 'α', 'α'],
    ['Plural — Genitive', 'ων', 'ων', 'ων', 'ων', 'ων', 'ων', 'ων'],
    ['Plural — Dative', 'οις', 'ις', 'αις', 'αις', 'ις', 'οις', 'ις'],
    ['Plural — Accusative', 'ους', 'υς', 'ας', 'ας', 'ς', 'α', 'α']
  ]
};

export const nounEndingsThird = {
  title: 'Master Case Endings (Third Declension) — from UGG',
  note: 'Masculine and feminine are identical; endings are the same with or without stem vowel.',
  columns: ['Case', 'Masculine/Feminine', 'Neuter'],
  rows: [
    ['Singular — Nominative', 'ς / -', '- / -'],
    ['Singular — Genitive', 'ος', 'ος'],
    ['Singular — Dative', 'ι', 'ι'],
    ['Singular — Accusative', 'α/ν', '-'],
    ['Plural — Nominative', 'ες', 'α'],
    ['Plural — Genitive', 'ων', 'ων'],
    ['Plural — Dative', 'σι(ν)', 'σι(ν)'],
    ['Plural — Accusative', 'ας', 'α']
  ]
};

export const verbEndings = {
  title: 'Primary and Secondary Endings (Thematic Verbs) — from UGG',
  note: 'Shown with example forms from λύω / ἔλυον.',
  columns: [
    'Person/Number',
    'Primary Active (form)',
    'Primary Active (ending)',
    'Secondary Active (form)',
    'Secondary Active (ending)',
    'Primary Mid/Pass (form)',
    'Primary Mid/Pass (ending)',
    'Secondary Mid/Pass (form)',
    'Secondary Mid/Pass (ending)'
  ],
  rows: [
    ['1st Singular', 'λύω', '-', 'ἔλυον', 'ν', 'λύομαι', 'μαι', 'ἐλυόμην', 'μην'],
    ['2nd Singular', 'λύεις', 'ς', 'ἔλυες', 'ς', 'λύῃ', 'σαι', 'ἐλύου', 'σο'],
    ['3rd Singular', 'λύει', 'ι', 'ἔλυε(ν)', '-', 'λύεται', 'ται', 'ἐλύετο', 'το'],
    ['1st Plural', 'λύομεν', 'μεν', 'ἐλυόμεν', 'μεν', 'λυόμεθα', 'μεθα', 'ἐλυόμεθα', 'μεθα'],
    ['2nd Plural', 'λύετε', 'τε', 'ἐλύετε', 'τε', 'λύεσθε', 'σθε', 'ἐλύεσθε', 'σθε'],
    ['3rd Plural', 'λύουσι(ν)', 'νσι(ν)', 'ἔλυον', 'ν', 'λύονται', 'νται', 'ἐλύοντο', 'ντο']
  ]
};
