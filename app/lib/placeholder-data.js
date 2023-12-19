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
    text: 'VERB + -기',
    explanation: 'VERB-ing (as noun)'
  },
  {
    // 8
    text: '왜 이렇게 ADJECTIVE + -아/어/여요?',
    explanation: 'Why am/is/are (SUBJECT) so ADJECTIVE?'
  },
  {
    // 9
    text: 'VERB + -느라 정신이 없어요',
    explanation: '(SUBJECT) am/is/are so busy VERB-ing/with NOUN (that SUBJECT am/is/are distracted/feeling stressed/going crazy)'
  },
  {
    // 10
    text: 'VERB + -(으)ㄴ 지 진짜 오래 됐어요',
    explanation: 'It’s been a really long time since (someone/something) last PAST TENSE VERB.'
  },
  {
    // 11
    text: 'VERB/ADJECTIVE + -게 됐어요',
    explanation: '(SUBJECT) happened to VERB... / (SUBJECT) ended up VERB-ing...'
  },
  {
    // 12
    text: '어쩔 수 없이 VERB',
    explanation: '(SUBJECT) had no choice but to VERB.'
  },
  {
    // 13
    text: 'VERB + -고 있어요',
    explanation: '(SUBJECT) am/is/are VERB-ing. (Present progressive)'
  },
  {
    // 14
    text: '우리 VERB + -(으)ㄹ까요?',
    explanation: 'Shall we VERB?'
  },
  {
    // 15
    text: 'VERB + -(으)ㄹ 수 있다',
    explanation: 'to be able to VERB'
  },
  {
    // 16
    text: 'SOMEONE + -(이)랑 VERB',
    explanation: 'to VERB with SOMEONE'
  },
  {
    // 17
    text: 'PLACE + 에/(으)로 가다/오다',
    explanation: 'to go/come to PLACE'
  },
  {
    // 18
    text: 'PLACE + 에서 VERB',
    explanation: 'to VERB at PLACE / to VERB from PLACE'
  },
  {
    // 19
    text: 'TIME + 에 VERB',
    explanation: 'to VERB at TIME'
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
    // 6 - 3, 42
    krText: '오다',
    enText: 'to come',
  },
  {
    // 7 - 4, 11, 13, 41, 49, 64
    krText: '보다',
    enText: 'to see/watch',
  },
  {
    // 8 - 4
    krText: '이 남자',
    enText: 'this guy',
  },
  {
    // 9 - 5, 14, 28
    krText: '만나다',
    enText: 'to meet',
  },
  {
    // 10 - 5
    krText: '저 사람',
    enText: 'that person (over there)',
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
    // 13 - 8, 64
    krText: '영화',
    enText: 'movie',
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
    // 22 - 13, 15, 17, 27, 30, 56, 57
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
  {
    // 46 - 31, 36, 38, 39
    krText: '요즘',
    enText: 'these days',
  },
  {
    // 47 - 31
    krText: '조용하다',
    enText: 'to be quiet',
  },
  {
    // 48 - 32
    krText: '저기',
    enText: 'over there',
  },
  {
    // 49 - 32
    krText: '시끄럽다',
    enText: 'to be loud/noisy',
  },
  {
    // 50 - 33
    krText: '비싸다',
    enText: 'to be expensive',
  },
  {
    // 51 - 34
    krText: '저 남자',
    enText: 'that guy',
  },
  {
    // 52 - 34
    krText: '잘생기다 (conjugate in past tense)',
    enText: 'to be handsome',
  },
  {
    // 53 - 35
    krText: '늦다',
    enText: 'to be late',
  },
  {
    // 54 - 36
    krText: '결혼 준비하다',
    enText: 'to prepare for a wedding',
  },
  {
    // 55 - 37, 59
    krText: '시험 공부하다',
    enText: 'to study for a test',
  },
  {
    // 56 - 38, 58
    krText: '일하다',
    enText: 'to work',
  },
  {
    // 57 - 39
    krText: '그 남자',
    enText: 'he',
  },
  {
    // 58 - 39
    krText: '연애하다',
    enText: 'to date',
  },
  {
    // 59 - 40
    krText: '준비하다',
    enText: 'to prepare',
  },
  {
    // 60 - 40
    krText: '그 행사',
    enText: 'the event',
  },
  {
    // 61 - 42
    krText: '영화관',
    enText: 'movie theater',
  },
  {
    // 62 - 43
    krText: '여행가다',
    enText: 'to travel',
  },
  {
    // 63 - 44
    krText: '밖에 나가다',
    enText: 'to go outside',
  },
  {
    // 64 - 45
    krText: '지하철 타다',
    enText: 'to ride the subway',
  },
  {
    // 65 - 46
    krText: '이번 주는 주말',
    enText: 'this weekend (in particular)',
  },
  {
    // 66 - 46
    krText: '쉬다',
    enText: 'to rest',
  },
  {
    // 67 - 47
    krText: '번호',
    enText: 'number',
  },
  {
    // 68 - 47
    krText: '바꾸다',
    enText: 'to change',
  },
  {
    // 69 - 48
    krText: '일을 맡다',
    enText: 'to take charge of a task',
  },
  {
    // 70 - 49
    krText: '카페',
    enText: 'cafe',
  },
  {
    // 71 - 15, 27, 40, 49, 58
    krText: '그 사람',
    enText: 'that person (we are talking about)',
  },
  {
    // 72 - 50
    krText: '지난 주말',
    enText: 'last weekend',
  },
  {
    // 73 - 50, 65
    krText: '공원',
    enText: 'park',
  },
  {
    // 74 - 50, 52, 65
    krText: '가다',
    enText: 'to go',
  },
  {
    // 75 - 51
    krText: '진실을 알려주다',
    enText: 'to explain/tell the truth',
  },
  {
    // 76 - 52
    krText: '병원',
    enText: 'hospital',
  },
  {
    // 77 - 53
    krText: '공부하다',
    enText: 'to study',
  },
  {
    // 78 - 28, 54
    krText: '다시',
    enText: 'again',
  },
  {
    // 79 - 54
    krText: '하다',
    enText: 'to do',
  },
  {
    // 80 - 55
    krText: '집',
    enText: 'home/house',
  },
  {
    // 81 - 55
    krText: '도라가다',
    enText: 'to go back/return',
  },
  {
    // 82 - 56
    krText: '맛집',
    enText: 'good restaurant',
  },
  {
    // 83 - 56
    krText: '찾아보다',
    enText: 'to look for',
  },
  {
    // 84 - 57
    krText: '저녁',
    enText: 'dinner',
  },
  {
    // 85 - 57, 61, 63
    krText: '먹다',
    enText: 'to eat',
  },
  {
    // 86 - 60
    krText: '친구',
    enText: 'friend',
  },
  {
    // 87 - 60
    krText: '게임하다',
    enText: 'to play games',
  },
  {
    // 88 - 61
    krText: '일요일',
    enText: 'Sunday',
  },
  {
    // 89 - 61
    krText: '점심',
    enText: 'lunch',
  },
  {
    // 90 - 61, 62, 64, 65
    krText: '같이',
    enText: 'together',
  },
  {
    // 91 - 62
    krText: '야구',
    enText: 'baseball game',
  },
  {
    // 92 - 63
    krText: '저녁에',
    enText: 'for dinner',
  },
  {
    // 93 - 64
    krText: '오늘 저녁에',
    enText: 'tonight',
  },
  {
    // 94 - 65
    krText: '이번 주말',
    enText: 'this weekend',
  },
];

// To change password:
// 1. Change password in this file and save. Do NOT commit the new password to GitHub!
// 2. In `seed.js:main()`, comment out everything except seedUsers()
// 3. Run `yarn run seed`
// 4. Revert the password here back to `adminadmin`
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    email: 'thetimothyp@gmail.com',
  },
];

const lessons = [
  {
    id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1',
    title: 'VERB + -고 있다',
    summary: 'SUBJECT is VERBing (present progressive)',
    body: '# This is a header!'
  }
];

const userLessons = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    lesson_id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1'
  }
];

const exercises = [
  // [exercise_id] - [concept_id]
  {
    // 1 - 1
    id: '33523680-88de-455e-b704-2353df1d1ab8',
    tlText: '지연 씨는 전에 이 모임 참석한 적 있어요?',
    nlText: 'Ji-yeon, have you attended this meetup before?',
  },
];

const userExercises = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    exercise_id: '33523680-88de-455e-b704-2353df1d1ab8',
  }
];

module.exports = {
  concepts,
  exercises,
  vocabs,
  users,
  lessons,
  userLessons,
  userExercises,
};