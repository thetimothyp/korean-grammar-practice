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
  },
  {
    id: 'faf5a820-f476-477a-9544-75f35de79470',
    title: 'Lesson #2',
    summary: 'Lesson 2 summary',
    body: 'Awesome!'
  },
  {
    id: '9e59b929-2ffb-4272-8d5a-f2091e8fd0fd',
    title: 'Lesson #1 for Collection #2',
    summary: 'Lesson 1, Collection 2 summary',
    body: 'Awesome!!!!'
  }
];

const userLessons = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    lesson_id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1'
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    lesson_id: 'faf5a820-f476-477a-9544-75f35de79470'
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    lesson_id: '9e59b929-2ffb-4272-8d5a-f2091e8fd0fd'
  },
];

const exercises = [
  {
    id: '33523680-88de-455e-b704-2353df1d1ab8',
    tlText: '지연 씨는 전에 이 모임 참석한 적 있어요?',
    nlText: 'Ji-yeon, have you attended this meetup before?',
  },
  {
    id: '990f06c8-1b76-4489-bef1-64cf17a2af1c',
    tlText: '저는 그 영화를 보고 싶었어요.',
    nlText: 'I wanted to watch that movie.',
  },
];

const userExercises = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    exercise_id: '33523680-88de-455e-b704-2353df1d1ab8',
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    exercise_id: '990f06c8-1b76-4489-bef1-64cf17a2af1c',
  },
];

const lessonExercises = [
  {
    lesson_id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1',
    exercise_id: '33523680-88de-455e-b704-2353df1d1ab8',
  },
  {
    lesson_id: '9e59b929-2ffb-4272-8d5a-f2091e8fd0fd',
    exercise_id: '33523680-88de-455e-b704-2353df1d1ab8',
  },
  {
    lesson_id: 'faf5a820-f476-477a-9544-75f35de79470',
    exercise_id: '990f06c8-1b76-4489-bef1-64cf17a2af1c',
  },
  {
    lesson_id: '9e59b929-2ffb-4272-8d5a-f2091e8fd0fd',
    exercise_id: '990f06c8-1b76-4489-bef1-64cf17a2af1c',
  },
];

const collections = [
  {
    id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
    name: "letspracticelanguageofficial’s Lessons",
  },
  {
    id: '9c233e96-7818-4b92-a529-9096d44ab97a',
    name: "Another collection",
  },
];

const userCollections = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    collection_id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    collection_id: '9c233e96-7818-4b92-a529-9096d44ab97a',
  },
];

const collectionLessons = [
  {
    collection_id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
    lesson_id: 'd99ad5d2-1643-44e9-b8fb-eb87991d10a1',
  },
  {
    collection_id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
    lesson_id: 'faf5a820-f476-477a-9544-75f35de79470',
  },
  {
    collection_id: 'fe00f9a8-2ed7-44f2-9bab-0cbf02ada78f',
    lesson_id: '9e59b929-2ffb-4272-8d5a-f2091e8fd0fd',
  },
  {
    collection_id: '9c233e96-7818-4b92-a529-9096d44ab97a',
    lesson_id: '9e59b929-2ffb-4272-8d5a-f2091e8fd0fd',
  },
];

module.exports = {
  users,
  lessons,
  userLessons,
  exercises,
  userExercises,
  lessonExercises,
  collections,
  userCollections,
  collectionLessons,
};