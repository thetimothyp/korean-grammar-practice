// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const concepts = [
  {
    text: '왠지 ADJECTIVE + -(으)ㄹ 것 같더라고요',
    explanation: 'It kind of looked like it would be ADJECTIVE. / For some reason, I thought it would be ADJECTIVE.'
  },
  {
    text: 'VERB + -고 싶은 거 있어?',
    explanation: 'Is there something that you want to/would like to VERB?'
  }
];

const exercises = [
  {
    krText: '왠지 재밌을 것 같더라고요.',
    enText: 'It kind of looked like it would be fun.',
  },
  {
    krText: '뭐 먹고 싶은 거 있어?',
    enText: 'Is there something you’d like to eat?',
  },
];

const vocabs = [
  {
    krText: '재미있다',
    enText: 'to be/have fun',
  },
  {
    krText: '먹다',
    enText: 'to eat',
  }
];

const exerciseVocabs = [
  {
    exerciseId: 1,
    vocabId: 1
  },
  {
    exerciseId: 2,
    vocabId: 2
  }
]

const exerciseConcepts = [
  {
    exerciseId: 1,
    conceptId: 1
  },
  {
    exerciseId: 2,
    conceptId: 2
  },
];

module.exports = {
  concepts,
  exercises,
  vocabs,
  exerciseConcepts,
  exerciseVocabs,
};
