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

const collections = [
  {
    id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
    name: "letspracticelanguageofficial’s Lessons",
  }
];

const userCollections = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    collection_id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
  }
];

const collectionLessons = [
  {
    collection_id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
    lesson_id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1',
  }
];

module.exports = {
  users,
  lessons,
  userLessons,
  exercises,
  userExercises,
  collections,
  userCollections,
  collectionLessons,
};