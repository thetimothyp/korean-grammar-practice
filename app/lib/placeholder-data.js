// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const concepts = [
  {
    text: '왠지 ADJECTIVE + -(으)ㄹ 것 같더라고요',
    explanation: 'It kind of looked like it would be ADJECTIVE. / For some reason, I thought it would be ADJECTIVE.'
  },
  {
    text: 'VERB + -(으)시면 VERB + -(으)실 수 있어요',
    explanation: 'If you VERB, you can VERB.'
  },
];

const exercises = [
  {
    krText: '왠지 재밌을 것 같더라고요.',
    enText: 'It kind of looked like it would be fun.',
  },
];

const vocabs = [
  {
    krText: '재미있다',
    enText: 'to have fun',
  }
];

const exerciseVocabs = [
  {
    exerciseId: 1,
    vocabId: 1
  },
]

const exerciseConcepts = [
  {
    exerciseId: 1,
    conceptId: 1
  },
  {
    exerciseId: 1,
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
