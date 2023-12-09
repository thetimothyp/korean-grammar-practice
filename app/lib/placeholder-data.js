// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const concepts = [
  // [concept_id]
  {
    // 1
    text: 'VERB + -(으)ㄴ 적 있으세요?',
    explanation: 'Have you PAST PARTICIPLE VERB before?'
  },
  {
    // 2
    text: '왠지 ADJECTIVE + -(으)ㄹ 것 같더라고요',
    explanation: 'It kind of looked like it would be ADJECTIVE. / For some reason, I thought it would be ADJECTIVE.'
  },
  {
    // 3
    text: 'VERB + -(으)시면 VERB + -(으)실 수 있어요',
    explanation: 'If you VERB, you can VERB.'
  },
];

const exercises = [
  // [exercise_id] - [concept_id]
  {
    // 1 - 1
    krText: '지연 씨는 전에 이 모임 참석한 적 있으세요?',
    enText: 'Ji-yeon, have you attended this meetup before?',
  },
  {
    // 2 - 1
    krText: '멤버쉽 가입한 적 있으세요?',
    enText: 'Have you signed up for a membership before?',
  },
  {
    // 3 - 1
    krText: '여기에 온 적 있으세요?',
    enText: 'Have you come here before?',
  },
  {
    // 4 - 1
    krText: '이 남자 본 적 있으세요?',
    enText: 'Have you seen this guy before?',
  },
  {
    // 5 - 1
    krText: '저 사람 만난 적 있으세요?',
    enText: 'Have you met that person before?',
  },
  {
    // 6 - 2
    krText: '왠지 재밌을 것 같더라고요.',
    enText: 'For some reason, it looked like it would be fun.',
  },
  {
    // 7 - 2
    krText: '왠지 무서울 것 같더라고요.',
    enText: 'For some reason, it looked like it would be scary.',
  },
  {
    // 8 - 2
    krText: '그 영화 왠지 슬플 것 같더라고요.',
    enText: 'The movie kind of looked like it would be sad.',
  },
  {
    // 9 - 2
    krText: '왠지 맛있을 것 같더라고요.',
    enText: 'For some reason, it kind of looked delicious.',
  },
  {
    // 10 - 2
    krText: '왠지 괜찮을 것 같더라고요.',
    enText: 'For some reason, it kind of looked like it would be okay.',
  },
  {
    // 11 - 3
    krText: '심심할 때 사이트 놀러 오시면 제 그림 보실 수 있어요.',
    enText: 'When you’re bored, if you come to my site (for fun), you can see my drawings.',
  },
  {
    // 12 - 3
    krText: '여기로 가시면 나가실 수 있어요.',
    enText: 'If you go here, you can go out.',
  },
  {
    // 13 - 3
    krText: '지금 결제하시면 다 보실 수 있어요.',
    enText: 'If you pay now, you can watch everything.',
  },
  {
    // 14 - 3
    krText: '기다리시면 그녀를 만나실 수 있어요.',
    enText: 'If you wait, you can meet her.',
  },
  {
    // 15 - 3
    krText: '지금 전화하시면 그 사람과 이야기하실 수 있어요.',
    enText: 'If you call now, you can talk to that person.',
  },
];

const vocabs = [
  // [vocab_id] - [exercise_id]
  {
    // 1 - 1
    krText: '이 모임',
    enText: 'this meetup',
  },
  {
    // 2 - 1
    krText: '참석하가',
    enText: 'to attend',
  },
  {
    // 3 - 2
    krText: '멤버쉽',
    enText: 'membership',
  },
  {
    // 4 - 2
    krText: '가입하다',
    enText: 'to sign up for',
  },
  {
    // 5 - 3
    krText: '여기',
    enText: 'here',
  },
  {
    // 6 - 3
    krText: '오다',
    enText: 'to come',
  },
  {
    // 7 - 4
    krText: '보다',
    enText: 'to see/watch',
  },
  {
    // 8 - 4
    krText: '이 남자',
    enText: 'this guy',
  },
  {
    // 9 - 5
    krText: '만나다',
    enText: 'to meet',
  },
  {
    // 10 - 5
    krText: '저 사람',
    enText: 'that person',
  },
  {
    // 11 - 6
    krText: '재미있다 (written) / 재밌다 (spoken)',
    enText: 'to be fun',
  },
  {
    // 12 - 7
    krText: '무섭다',
    enText: 'to be scared/scary',
  },
  {
    // 13 - 8
    krText: '그 영화',
    enText: 'that movie',
  },
  {
    // 14 - 8
    krText: '슬프다',
    enText: 'to be sad',
  },
  {
    // 15 - 9
    krText: '맛있다',
    enText: 'to be delicious',
  },
  {
    // 16 - 10
    krText: '괜찮다',
    enText: 'to be okay',
  },
  {
    // 17 - 11
    krText: '심심하다',
    enText: 'to be bored',
  },
  {
    // 18 - 11
    krText: '놀러',
    enText: 'in order to play/have fun',
  },
  {
    // 19 - 11
    krText: '제 그림',
    enText: 'my drawing(s)',
  },
  {
    // 20 - 11
    krText: '사이트',
    enText: 'site',
  },
  {
    // 21 - 12
    krText: '나가다',
    enText: 'to go out',
  },
  {
    // 22 - 13
    krText: '지금',
    enText: 'now',
  },
  {
    // 23 - 13
    krText: '결제하다',
    enText: 'to pay',
  },
  {
    // 24 - 14
    krText: '기다리다',
    enText: 'to wait',
  },
  {
    // 25 - 14
    krText: '그녀',
    enText: 'her',
  },
  {
    // 26 - 15
    krText: '전화하다',
    enText: 'to call',
  },
  {
    // 27 - 15
    krText: '그 사람과 이야기하다',
    enText: 'to talk to that person',
  },
];

const exerciseConcepts = [
  {
    exerciseId: 1,
    conceptId: 1
  },
  {
    exerciseId: 2,
    conceptId: 1
  },
  {
    exerciseId: 3,
    conceptId: 1
  },
  {
    exerciseId: 4,
    conceptId: 1
  },
  {
    exerciseId: 5,
    conceptId: 1
  },
  {
    exerciseId: 6,
    conceptId: 2
  },
  {
    exerciseId: 7,
    conceptId: 2
  },
  {
    exerciseId: 8,
    conceptId: 2
  },
  {
    exerciseId: 9,
    conceptId: 2
  },
  {
    exerciseId: 10,
    conceptId: 2
  },
  {
    exerciseId: 11,
    conceptId: 3
  },
  {
    exerciseId: 12,
    conceptId: 3
  },
  {
    exerciseId: 13,
    conceptId: 3
  },
  {
    exerciseId: 14,
    conceptId: 3
  },
  {
    exerciseId: 15,
    conceptId: 3
  },
];

const exerciseVocabs = [
  {
    exerciseId: 1,
    vocabId: 1
  },
  {
    exerciseId: 1,
    vocabId: 2
  },
  {
    exerciseId: 2,
    vocabId: 3
  },
  {
    exerciseId: 2,
    vocabId: 4
  },
  {
    exerciseId: 3,
    vocabId: 5
  },
  {
    exerciseId: 3,
    vocabId: 6
  },
  {
    exerciseId: 4,
    vocabId: 7
  },
  {
    exerciseId: 4,
    vocabId: 8
  },
  {
    exerciseId: 5,
    vocabId: 9
  },
  {
    exerciseId: 5,
    vocabId: 10
  },
  {
    exerciseId: 6,
    vocabId: 11
  },
  {
    exerciseId: 7,
    vocabId: 12
  },
  {
    exerciseId: 8,
    vocabId: 13
  },
  {
    exerciseId: 8,
    vocabId: 14
  },
  {
    exerciseId: 9,
    vocabId: 15
  },
  {
    exerciseId: 10,
    vocabId: 16
  },
  {
    exerciseId: 11,
    vocabId: 17
  },
  {
    exerciseId: 11,
    vocabId: 18
  },
  {
    exerciseId: 11,
    vocabId: 19
  },
  {
    exerciseId: 11,
    vocabId: 20
  },
  {
    exerciseId: 12,
    vocabId: 21
  },
  {
    exerciseId: 13,
    vocabId: 22
  },
  {
    exerciseId: 13,
    vocabId: 23
  },
  {
    exerciseId: 14,
    vocabId: 24
  },
  {
    exerciseId: 14,
    vocabId: 25
  },
  {
    exerciseId: 15,
    vocabId: 26
  },
  {
    exerciseId: 15,
    vocabId: 27
  },
]

// To change password:
// 1. Change password in this file and save. Do NOT commit the new password to GitHub!
// 2. In `seed.js:main()`, comment out everything except seedUsers()
// 3. Run `yarn run seed`
// 4. Revert the password here back to `adminadmin`
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Tim',
    email: 'thetimothyp@gmail.com',
    password: 'adminadmin',
  },
];

module.exports = {
  concepts,
  exercises,
  vocabs,
  exerciseConcepts,
  exerciseVocabs,
  users,
};