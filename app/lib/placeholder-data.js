// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const concepts = [
  // [concept_id]
  {
    // 1
    text: 'VERB + -(으)ㄴ 적 있어요?',
    explanation: 'Have you PAST PARTICIPLE VERB before?'
  },
  {
    // 2
    text: '왠지 ADJECTIVE + -(으)ㄹ 것 같더라고요',
    explanation: 'It kind of looked like it would be ADJECTIVE. / For some reason, I thought it would be ADJECTIVE.'
  },
  {
    // 3
    text: 'VERB + -(으)면 VERB + -(으)ㄹ 수 있어요',
    explanation: 'If you VERB, you can VERB.'
  },
  {
    // 4
    text: 'VERB + -아/어/여/야겠아요',
    explanation: 'I think I/we should VERB.'
  },
  {
    // 5
    text: '어떻게 VERB + -아/어/여요?',
    explanation: 'How could you VERB?'
  },
  {
    // 6
    text: 'VERB/ADJECTIVE + -아/어/여서 그래요',
    explanation: '(It is/SUBJECT does it) because (someone/something) VERB/ADJECTIVE.'
  },
  {
    // 7
    text: 'VERB + -기 싫다',
    explanation: 'SUBJECT hates VERBing'
  },
];

const exercises = [
  // [exercise_id] - [concept_id]
  {
    // 1 - 1
    krText: '지연 씨는 전에 이 모임 참석한 적 있어요?',
    enText: 'Ji-yeon, have you attended this meetup before?',
  },
  {
    // 2 - 1
    krText: '멤버쉽 가입한 적 있어요?',
    enText: 'Have you signed up for a membership before?',
  },
  {
    // 3 - 1
    krText: '여기에 온 적 있어요?',
    enText: 'Have you come here before?',
  },
  {
    // 4 - 1
    krText: '이 남자 본 적 있어요?',
    enText: 'Have you seen this guy before?',
  },
  {
    // 5 - 1
    krText: '저 사람 만난 적 있어요?',
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
    krText: '심심할 때 사이트 놀러 오면 제 그림 볼 수 있어요.',
    enText: 'When you’re bored, if you come to my site (for fun), you can see my drawings.',
  },
  {
    // 12 - 3
    krText: '여기로 가면 나갈 수 있어요.',
    enText: 'If you go here, you can go out.',
  },
  {
    // 13 - 3
    krText: '지금 결제하면 다 볼 수 있어요.',
    enText: 'If you pay now, you can watch everything.',
  },
  {
    // 14 - 3
    krText: '기다리면 그녀를 만날 수 있어요.',
    enText: 'If you wait, you can meet her.',
  },
  {
    // 15 - 3
    krText: '지금 전화하면 그 사람과 이야기할 수 있어요.',
    enText: 'If you call now, you can talk to that person.',
  },
  {
    // 16 - 4
    krText: '이제 준비 시작해야겠어요.',
    enText: 'I think we should start preparing.',
  },
  {
    // 17 - 4
    krText: '지금 전화해 봐야겠어요.',
    enText: 'I think I should try calling now.',
  },
  {
    // 18 - 4
    krText: '한 시간 뒤에 출발해야겠어요.',
    enText: 'I think I should leave in an hour.',
  },
  {
    // 19 - 4
    krText: '내일 머리 자르러 가야겠다.',
    enText: 'I think I should go get my haircut tomorrow.',
  },
  {
    // 20 - 4
    krText: '우산 가지고 가야겠다.',
    enText: 'I think I should bring an umbrella.',
  },
  {
    // 21 - 5
    krText: '어떻게 이름도 몰라요?',
    enText: 'How could you not even know my name?',
  },
  {
    // 22 - 5
    krText: '어떻게 저한테 그래요?',
    enText: 'How could you do that to me?',
  },
  {
    // 23 - 5
    krText: '어떻게 우리 기념일을 잊어버려요?',
    enText: 'How could you forget our anniversary?',
  },
  {
    // 24 - 5
    krText: '어떻게 그런 말을 해요?',
    enText: 'How could you say something like that?',
  },
  {
    // 25 - 5
    krText: '어떻게 이걸 그냥 넘어가요?',
    enText: 'How could you just let this pass?',
  },
  {
    // 26 - 6
    krText: '생각이 안 나서 그래요.',
    enText: 'It is because I don’t remember.',
  },
  {
    // 27 - 6
    krText: '그 사람 지금 아파서 그래요.',
    enText: 'He does that because he is sick now.',
  },
  {
    // 28 - 6, 7
    krText: '다시 만나기 싫어서 그래요.',
    enText: 'It is because I hate meeting (them) again.',
  },
  {
    // 29 - 6
    krText: '무서워서 그래요.',
    enText: 'It is because I am scared.',
  },
  {
    // 30 - 6
    krText: '지금 졸려서 그래요.',
    enText: 'It is because I am sleepy now.',
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
    // 7 - 4, 11, 13
    krText: '보다',
    enText: 'to see/watch',
  },
  {
    // 8 - 4
    krText: '이 남자',
    enText: 'this guy',
  },
  {
    // 9 - 5, 14
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
    // 12 - 7, 29
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
    // 22 - 13, 15, 17, 27, 30
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
    // 26 - 15, 17
    krText: '전화하다',
    enText: 'to call',
  },
  {
    // 27 - 15
    krText: '그 사람과 이야기하다',
    enText: 'to talk to that person',
  },
  {
    // 28 - 16
    krText: '준비',
    enText: 'preparation',
  },
  {
    // 29 - 16
    krText: '시작하다',
    enText: 'to start',
  },
  {
    // 30 - 18
    krText: '출발하다',
    enText: 'to leave/depart',
  },
  {
    // 31 - 19
    krText: '머리 자르러 가다',
    enText: 'to go get a haircut',
  },
  {
    // 32 - 19
    krText: '내일',
    enText: 'tomorrow',
  },
  {
    // 33 - 20
    krText: '가지고 가다',
    enText: 'to bring (while going)',
  },
  {
    // 34 - 20
    krText: '우산',
    enText: 'umbrella',
  },
  {
    // 35 - 21
    krText: '이름',
    enText: 'name',
  },
  {
    // 36 - 21
    krText: '모르다',
    enText: 'to not know',
  },
  {
    // 37 - 22
    krText: '저한테 그래요',
    enText: 'do this/that to me',
  },
  {
    // 38 - 23
    krText: '기념일',
    enText: 'anniversary',
  },
  {
    // 39 - 23
    krText: '잊어버리다',
    enText: 'to forget',
  },
  {
    // 40 - 24
    krText: '그런 말을 하다',
    enText: 'to say something like that',
  },
  {
    // 41 - 25
    krText: '그냥 넘어 가다',
    enText: 'to just let something pass',
  },
  {
    // 42 - 26
    krText: '생각이 안 나다',
    enText: 'to not remember',
  },
  {
    // 43 - 27
    krText: '아프다',
    enText: 'to be sick/hurt',
  },
  {
    // 44 - 28
    krText: '싫다',
    enText: 'to hate',
  },
  {
    // 45 - 30
    krText: '졸리다',
    enText: 'to be sleepy',
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
  {
    exerciseId: 16,
    conceptId: 4
  },
  {
    exerciseId: 17,
    conceptId: 4
  },
  {
    exerciseId: 18,
    conceptId: 4
  },
  {
    exerciseId: 19,
    conceptId: 4
  },
  {
    exerciseId: 20,
    conceptId: 4
  },
  {
    exerciseId: 21,
    conceptId: 5
  },
  {
    exerciseId: 22,
    conceptId: 5
  },
  {
    exerciseId: 23,
    conceptId: 5
  },
  {
    exerciseId: 24,
    conceptId: 5
  },
  {
    exerciseId: 25,
    conceptId: 5
  },
  {
    exerciseId: 26,
    conceptId: 6
  },
  {
    exerciseId: 27,
    conceptId: 6
  },
  {
    exerciseId: 28,
    conceptId: 6
  },
  {
    exerciseId: 28,
    conceptId: 7
  },
  {
    exerciseId: 29,
    conceptId: 6
  },
  {
    exerciseId: 30,
    conceptId: 6
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
    exerciseId: 11,
    vocabId: 7
  },
  {
    exerciseId: 13,
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
    exerciseId: 14,
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
    exerciseId: 29,
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
    exerciseId: 15,
    vocabId: 22
  },
  {
    exerciseId: 17,
    vocabId: 22
  },
  {
    exerciseId: 27,
    vocabId: 22
  },
  {
    exerciseId: 30,
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
    exerciseId: 17,
    vocabId: 26
  },
  {
    exerciseId: 15,
    vocabId: 27
  },
  {
    exerciseId: 16,
    vocabId: 28
  },
  {
    exerciseId: 16,
    vocabId: 29
  },
  {
    exerciseId: 18,
    vocabId: 30
  },
  {
    exerciseId: 19,
    vocabId: 31
  },
  {
    exerciseId: 19,
    vocabId: 32
  },
  {
    exerciseId: 20,
    vocabId: 33
  },
  {
    exerciseId: 20,
    vocabId: 34
  },
  {
    exerciseId: 21,
    vocabId: 35
  },
  {
    exerciseId: 21,
    vocabId: 36
  },
  {
    exerciseId: 22,
    vocabId: 37
  },
  {
    exerciseId: 23,
    vocabId: 38
  },
  {
    exerciseId: 23,
    vocabId: 39
  },
  {
    exerciseId: 24,
    vocabId: 40
  },
  {
    exerciseId: 25,
    vocabId: 41
  },
  {
    exerciseId: 26,
    vocabId: 42
  },
  {
    exerciseId: 27,
    vocabId: 43
  },
  {
    exerciseId: 28,
    vocabId: 44
  },
  {
    exerciseId: 30,
    vocabId: 45
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