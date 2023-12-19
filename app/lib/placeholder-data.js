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
    // 3 - 1, 17
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
    // 11 - 3, 15
    krText: '심심할 때 사이트 놀러 오면 제 그림 볼 수 있어요.',
    enText: 'When you’re bored, if you come to my site (for fun), you can see my drawings.',
  },
  {
    // 12 - 3, 15, 17
    krText: '여기로 가면 나갈 수 있어요.',
    enText: 'If you go here, you can go out.',
  },
  {
    // 13 - 3, 15
    krText: '지금 결제하면 다 볼 수 있어요.',
    enText: 'If you pay now, you can watch everything.',
  },
  {
    // 14 - 3, 15
    krText: '기다리면 그녀를 만날 수 있어요.',
    enText: 'If you wait, you can meet her.',
  },
  {
    // 15 - 3, 15
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
    krText: '내일 머리 자르러 가야겠어요.',
    enText: 'I think I should go get my haircut tomorrow.',
  },
  {
    // 20 - 4
    krText: '우산 가지고 가야겠어요.',
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
  {
    // 31 - 8
    krText: '요즘 왜 이렇게 조용해요?',
    enText: 'Why are you so quiet these days?',
  },
  {
    // 32 - 8
    krText: '저기 왜 이렇게 시끄러워요?',
    enText: 'Why is it so loud over there?',
  },
  {
    // 33 - 8
    krText: '왜 이렇게 비싸요?',
    enText: 'Why is it so expensive?',
  },
  {
    // 34 - 8
    krText: '저 남자 왜 이렇게 잘생겼어요?',
    enText: 'Why is that guy so handsome?',
  },
  {
    // 35 - 8
    krText: '왜 이렇게 늦어요?',
    enText: 'Why are you so late?',
  },
  {
    // 36 - 9
    krText: '요즘 결혼 준비하느라 정신이 없어요.',
    enText: 'I’m so busy these days with wedding preparations (that I’m going crazy).',
  },
  {
    // 37 - 9
    krText: '시험 공부하느라 정신이 없어요.',
    enText: 'I’m so busy studying for my test (that I’m completely distracted).',
  },
  {
    // 38 - 9
    krText: '요즘 일하느라 정신이 없어요.',
    enText: 'I’m so busy with work these days (that I’m going crazy).',
  },
  {
    // 39 - 9
    krText: '그 남자 요즘 연애하느라 정신이 없어요.',
    enText: 'He is so busy dating these days (that he is completely distracted).',
  },
  {
    // 40 - 9
    krText: '그 사람들 그 행사를 준비하느라 정신이 없어요.',
    enText: 'They are so busy preparing for the event (that they can’t think about anything else).',
  },
  {
    // 41 - 10
    krText: '본 지 진짜 오래 됐어요.',
    enText: 'It’s been a really long time since I last saw (you).',
  },
  {
    // 42 - 10, 17
    krText: '영화관에 온 지 진짜 오래 됐어요.',
    enText: 'It’s been a really long time since I last came to a movie theater.',
  },
  {
    // 43 - 10
    krText: '여행간 지 진짜 오래 됐어요.',
    enText: 'It’s been a really long time since I last traveled.',
  },
  {
    // 44 - 10, 17
    krText: '밖에 나간 지 진짜 오래 됐어요.',
    enText: 'It’s been a really long time since I last went outside.',
  },
  {
    // 45 - 10
    krText: '지하철 탄 지 진짜 오래 됐어요.',
    enText: 'It’s been a really long time since I last rode the subway.',
  },
  {
    // 46 - 11, 19
    krText: '이번 주는 주말에 쉴 수 있게 됐어요.',
    enText: 'He happened to be able to rest this weekend.',
  },
  {
    // 47 - 11, 12
    krText: '어쩔 수 없이 번호를 바꾸게 됐어요.',
    enText: 'I ended up having no choice but to change my number.',
  },
  {
    // 48 - 11
    krText: '그 일을 제가 맡게 됐어요.',
    enText: 'I happened to be put in charge of that task.',
  },
  {
    // 49 - 11, 18
    krText: '그 사람을 카페에서 보게 됐어요.',
    enText: 'I happened to see him at a café.',
  },
  {
    // 50 - 11, 17, 19
    krText: '지난 주말에 공원에 가게 됐어요.',
    enText: 'I ended up going to the park last weekend.',
  },
  {
    // 51 - 12
    krText: '어쩔 수 없이 진실을 알려줬어요.',
    enText: 'I had no choice but to tell the truth.',
  },
  {
    // 52 - 12, 17
    krText: '어쩔 수 없이 병원에 갔어요.',
    enText: 'I had no choice but to go to the hospital.',
  },
  {
    // 53 - 12
    krText: '어쩔 수 없이 열심히 공부해요.',
    enText: 'I have no choice but to study hard.',
  },
  {
    // 54 - 12
    krText: '어쩔 수 없이 다시 해요.',
    enText: 'I have no choice but to do it again.',
  },
  {
    // 55 - 12, 17
    krText: '어쩔 수 없이 집에 도라가요.',
    enText: 'I have no choice but to go back home.',
  },
  {
    // 56 - 13
    krText: '지금 맛집 찾아보고 있어요.',
    enText: 'I’m looking for a good restaurant right now.',
  },
  {
    // 57 - 13
    krText: '지금 저녁 먹고 있어요.',
    enText: 'I’m eating dinner right now.',
  },
  {
    // 58 - 13
    krText: '그 사람 일하고 있어요.',
    enText: 'He is working.',
  },
  {
    // 59 - 13
    krText: '시험 공부하고 있어요.',
    enText: 'I’m studying for my test.',
  },
  {
    // 60 - 13, 16
    krText: '친구랑 게임하고 있어요.',
    enText: 'I’m playing games with my friend.',
  },
  {
    // 61 - 14, 19
    krText: '우리 일요일에 같이 점심 먹을까요?',
    enText: 'Shall we eat lunch together on Sunday?',
  },
  {
    // 62 - 14
    krText: '우리 오늘 같이 야구 보러 갈까요?',
    enText: 'Shall we go watch a baseball game together today?',
  },
  {
    // 63 - 14
    krText: '우리 저녁에 삼겹살 먹을까요?',
    enText: 'Shall we eat sam-gyeop-sal for dinner?',
  },
  {
    // 64 - 14
    krText: '우리 오늘 저녁에 같이 영화 볼까요?',
    enText: 'Shall we watch a movie together tonight?',
  },
  {
    // 65 - 14, 18, 19
    krText: '우리 이번 주말에 같이 공원에 갈까요?',
    enText: 'Shall we go to the park together this weekend?',
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
    exerciseId: 3,
    conceptId: 17
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
    exerciseId: 11,
    conceptId: 15
  },
  {
    exerciseId: 12,
    conceptId: 3
  },
  {
    exerciseId: 12,
    conceptId: 15
  },
  {
    exerciseId: 12,
    conceptId: 17
  },
  {
    exerciseId: 13,
    conceptId: 3
  },
  {
    exerciseId: 13,
    conceptId: 15
  },
  {
    exerciseId: 14,
    conceptId: 3
  },
  {
    exerciseId: 14,
    conceptId: 15
  },
  {
    exerciseId: 15,
    conceptId: 3
  },
  {
    exerciseId: 15,
    conceptId: 15
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
  {
    exerciseId: 31,
    conceptId: 8
  },
  {
    exerciseId: 32,
    conceptId: 8
  },
  {
    exerciseId: 33,
    conceptId: 8
  },
  {
    exerciseId: 34,
    conceptId: 8
  },
  {
    exerciseId: 35,
    conceptId: 8
  },
  {
    exerciseId: 36,
    conceptId: 9
  },
  {
    exerciseId: 37,
    conceptId: 9
  },
  {
    exerciseId: 38,
    conceptId: 9
  },
  {
    exerciseId: 39,
    conceptId: 9
  },
  {
    exerciseId: 40,
    conceptId: 9
  },
  {
    exerciseId: 41,
    conceptId: 10
  },
  {
    exerciseId: 42,
    conceptId: 10
  },
  {
    exerciseId: 42,
    conceptId: 17
  },
  {
    exerciseId: 43,
    conceptId: 10
  },
  {
    exerciseId: 44,
    conceptId: 10
  },
  {
    exerciseId: 44,
    conceptId: 17
  },
  {
    exerciseId: 45,
    conceptId: 10
  },
  {
    exerciseId: 46,
    conceptId: 11
  },
  {
    exerciseId: 46,
    conceptId: 19
  },
  {
    exerciseId: 47,
    conceptId: 11
  },
  {
    exerciseId: 47,
    conceptId: 12
  },
  {
    exerciseId: 48,
    conceptId: 11
  },
  {
    exerciseId: 49,
    conceptId: 11
  },
  {
    exerciseId: 49,
    conceptId: 18
  },
  {
    exerciseId: 50,
    conceptId: 11
  },
  {
    exerciseId: 50,
    conceptId: 17
  },
  {
    exerciseId: 50,
    conceptId: 19
  },
  {
    exerciseId: 51,
    conceptId: 12
  },
  {
    exerciseId: 52,
    conceptId: 12
  },
  {
    exerciseId: 52,
    conceptId: 17
  },
  {
    exerciseId: 53,
    conceptId: 12
  },
  {
    exerciseId: 54,
    conceptId: 12
  },
  {
    exerciseId: 55,
    conceptId: 12
  },
  {
    exerciseId: 55,
    conceptId: 17
  },
  {
    exerciseId: 56,
    conceptId: 13
  },
  {
    exerciseId: 57,
    conceptId: 13
  },
  {
    exerciseId: 58,
    conceptId: 13
  },
  {
    exerciseId: 59,
    conceptId: 13
  },
  {
    exerciseId: 60,
    conceptId: 13
  },
  {
    exerciseId: 60,
    conceptId: 16
  },
  {
    exerciseId: 61,
    conceptId: 14
  },
  {
    exerciseId: 61,
    conceptId: 19
  },
  {
    exerciseId: 62,
    conceptId: 14
  },
  {
    exerciseId: 63,
    conceptId: 14
  },
  {
    exerciseId: 64,
    conceptId: 14
  },
  {
    exerciseId: 65,
    conceptId: 14
  },
  {
    exerciseId: 65,
    conceptId: 18
  },
  {
    exerciseId: 65,
    conceptId: 19
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
    exerciseId: 42,
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
    exerciseId: 41,
    vocabId: 7
  },
  {
    exerciseId: 49,
    vocabId: 7
  },
  {
    exerciseId: 64,
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
    exerciseId: 28,
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
    exerciseId: 64,
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
    exerciseId: 56,
    vocabId: 22
  },
  {
    exerciseId: 57,
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
  {
    exerciseId: 31,
    vocabId: 46
  },
  {
    exerciseId: 36,
    vocabId: 46
  },
  {
    exerciseId: 38,
    vocabId: 46
  },
  {
    exerciseId: 39,
    vocabId: 46
  },
  {
    exerciseId: 31,
    vocabId: 47
  },
  {
    exerciseId: 32,
    vocabId: 48
  },
  {
    exerciseId: 32,
    vocabId: 49
  },
  {
    exerciseId: 33,
    vocabId: 50
  },
  {
    exerciseId: 34,
    vocabId: 51
  },
  {
    exerciseId: 34,
    vocabId: 52
  },
  {
    exerciseId: 35,
    vocabId: 53
  },
  {
    exerciseId: 36,
    vocabId: 54
  },
  {
    exerciseId: 37,
    vocabId: 55
  },
  {
    exerciseId: 59,
    vocabId: 55
  },
  {
    exerciseId: 38,
    vocabId: 56
  },
  {
    exerciseId: 58,
    vocabId: 56
  },
  {
    exerciseId: 39,
    vocabId: 57
  },
  {
    exerciseId: 39,
    vocabId: 58
  },
  {
    exerciseId: 40,
    vocabId: 59
  },
  {
    exerciseId: 40,
    vocabId: 60
  },
  {
    exerciseId: 42,
    vocabId: 61
  },
  {
    exerciseId: 43,
    vocabId: 62
  },
  {
    exerciseId: 44,
    vocabId: 63
  },
  {
    exerciseId: 45,
    vocabId: 64
  },
  {
    exerciseId: 46,
    vocabId: 65
  },
  {
    exerciseId: 46,
    vocabId: 66
  },
  {
    exerciseId: 47,
    vocabId: 67
  },
  {
    exerciseId: 47,
    vocabId: 68
  },
  {
    exerciseId: 48,
    vocabId: 69
  },
  {
    exerciseId: 49,
    vocabId: 70
  },
  {
    exerciseId: 15,
    vocabId: 71
  },
  {
    exerciseId: 27,
    vocabId: 71
  },
  {
    exerciseId: 40,
    vocabId: 71
  },
  {
    exerciseId: 49,
    vocabId: 71
  },
  {
    exerciseId: 58,
    vocabId: 71
  },
  {
    exerciseId: 50,
    vocabId: 72
  },
  {
    exerciseId: 50,
    vocabId: 73
  },
  {
    exerciseId: 65,
    vocabId: 73
  },
  {
    exerciseId: 50,
    vocabId: 74
  },
  {
    exerciseId: 52,
    vocabId: 74
  },
  {
    exerciseId: 65,
    vocabId: 74
  },
  {
    exerciseId: 51,
    vocabId: 75
  },
  {
    exerciseId: 52,
    vocabId: 76
  },
  {
    exerciseId: 53,
    vocabId: 77
  },
  {
    exerciseId: 28,
    vocabId: 78
  },
  {
    exerciseId: 54,
    vocabId: 78
  },
  {
    exerciseId: 54,
    vocabId: 79
  },
  {
    exerciseId: 55,
    vocabId: 80
  },
  {
    exerciseId: 55,
    vocabId: 81
  },
  {
    exerciseId: 56,
    vocabId: 82
  },
  {
    exerciseId: 56,
    vocabId: 83
  },
  {
    exerciseId: 57,
    vocabId: 84
  },
  {
    exerciseId: 57,
    vocabId: 85
  },
  {
    exerciseId: 61,
    vocabId: 85
  },
  {
    exerciseId: 63,
    vocabId: 85
  },
  {
    exerciseId: 60,
    vocabId: 86
  },
  {
    exerciseId: 60,
    vocabId: 87
  },
  {
    exerciseId: 61,
    vocabId: 88
  },
  {
    exerciseId: 61,
    vocabId: 89
  },
  {
    exerciseId: 61,
    vocabId: 90
  },
  {
    exerciseId: 62,
    vocabId: 90
  },
  {
    exerciseId: 64,
    vocabId: 90
  },
  {
    exerciseId: 65,
    vocabId: 90
  },
  {
    exerciseId: 62,
    vocabId: 91
  },
  {
    exerciseId: 63,
    vocabId: 92
  },
  {
    exerciseId: 64,
    vocabId: 93
  },
  {
    exerciseId: 65,
    vocabId: 94
  },
]

const lessons = [
  {
    id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1',
    title: 'VERB + -고 있다',
    summary: 'SUBJECT is VERBing (present progressive)',
    body: '# This is a header!'
  }
]

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

const userLessons = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    lesson_id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1'
  }
];

module.exports = {
  concepts,
  exercises,
  vocabs,
  exerciseConcepts,
  exerciseVocabs,
  users,
  lessons,
  userLessons,
};