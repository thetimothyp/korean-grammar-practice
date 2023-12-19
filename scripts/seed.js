const { db } = require('@vercel/postgres');
const {
  exercises,
  users,
  lessons,
  userLessons,
  userExercises,
  collections,
  userCollections,
  collectionLessons,
  lessonExercises,
} = require('../app/lib/placeholder-data.js');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS users CASCADE;`

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
        INSERT INTO users (id, email)
        VALUES (${user.id}, ${user.email})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedLessons(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS lessons CASCADE;`
    // Create the "lessons" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS lessons (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR NOT NULL UNIQUE,
        summary VARCHAR NOT NULL,
        body TEXT NOT NULL
      );
    `;

    console.log(`Created "lessons" table`);

    // Insert data into the "lessons" table
    const insertedLessons = await Promise.all(
      lessons.map(async (lesson) => {
        return client.sql`
        INSERT INTO lessons (id, title, summary, body)
        VALUES (${lesson.id}, ${lesson.title}, ${lesson.summary}, ${lesson.body});
      `;
      }),
    );

    console.log(`Seeded ${insertedLessons.length} lessons`);

    return {
      createTable,
      insertedLessons,
    };
  } catch (error) {
    console.error('Error seeding lessons:', error);
    throw error;
  }
}

async function seedUserLessons(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS user_lessons CASCADE;`

    // Create the "user_lessons" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS user_lessons (
        user_id UUID,
        lesson_id UUID,
        PRIMARY KEY (user_id, lesson_id),
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT fk_lesson FOREIGN KEY(lesson_id) REFERENCES lessons(id)
      );
    `;
    console.log(`Created "user_lessons" table`);

    // Insert data into the "user_lessons" table
    const insertedUserLessons = await Promise.all(
      userLessons.map(async (userLesson) => {
        return client.sql`
          INSERT INTO user_lessons (user_id, lesson_id)
          VALUES (${userLesson.user_id}, ${userLesson.lesson_id});
        `;
      }),
    );
    console.log(`Seeded ${insertedUserLessons.length} user_lessons`);

    return {
      createTable,
      insertedUserLessons,
    };
  } catch (error) {
    console.error('Error seeding user_lessons:', error);
    throw error;
  }
}

async function seedExercises(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS exercises CASCADE;`

    // Create the "exercises" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exercises (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nl_text VARCHAR NOT NULL UNIQUE,
        tl_text VARCHAR NOT NULL UNIQUE
      );
    `;

    console.log(`Created "exercises" table`);

    // Insert data into the "exercises" table
    const insertedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        return client.sql`
        INSERT INTO exercises (id, nl_text, tl_text)
        VALUES (${exercise.id}, ${exercise.nlText}, ${exercise.tlText});
      `;
      }),
    );

    console.log(`Seeded ${insertedExercises.length} exercises`);

    return {
      createTable,
      insertedExercises,
    };
  } catch (error) {
    console.error('Error seeding exercises:', error);
    throw error;
  }
}

async function seedUserExercises(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS user_exercises CASCADE;`

    // Create the "user_exercises" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS user_exercises (
        user_id UUID,
        exercise_id UUID,
        PRIMARY KEY (user_id, exercise_id),
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id)
      );
    `;

    console.log(`Created "user_exercises" table`);

    // Insert data into the "user_exercises" table
    const insertedUserExercises = await Promise.all(
      userExercises.map(async (userExercise) => {
        return client.sql`
          INSERT INTO user_exercises (user_id, exercise_id)
          VALUES (${userExercise.user_id}, ${userExercise.exercise_id});
        `;
      }),
    );
    console.log(`Seeded ${insertedUserExercises.length} user_exercises`);

    return {
      createTable,
      insertedUserExercises,
    };
  } catch (error) {
    console.error('Error seeding user_exercises:', error);
    throw error;
  }
}

async function seedLessonExercises(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS lesson_exercises CASCADE;`

    // Create the "lesson_exercises" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS lesson_exercises (
        lesson_id UUID,
        exercise_id UUID,
        PRIMARY KEY (lesson_id, exercise_id),
        CONSTRAINT fk_lesson FOREIGN KEY(lesson_id) REFERENCES lessons(id),
        CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id)
      );
    `;

    console.log(`Created "lesson_exercises" table`);

    // Insert data into the "lesson_exercises" table
    const insertedLessonExercises = await Promise.all(
      lessonExercises.map(async (lessonExercise) => {
        return client.sql`
          INSERT INTO lesson_exercises (lesson_id, exercise_id)
          VALUES (${lessonExercise.lesson_id}, ${lessonExercise.exercise_id});
        `;
      }),
    );
    console.log(`Seeded ${insertedLessonExercises.length} lesson_exercises`);

    return {
      createTable,
      insertedLessonExercises,
    };
  } catch (error) {
    console.error('Error seeding lesson_exercises:', error);
    throw error;
  }
}

async function seedCollections(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS collections CASCADE;`
    // Create the "collections" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS collections (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR NOT NULL
      );
    `;

    console.log(`Created "collections" table`);

    // Insert data into the "collections" table
    const insertedCollections = await Promise.all(
      collections.map(async (collection) => {
        return client.sql`
        INSERT INTO collections (id, name)
        VALUES (${collection.id}, ${collection.name});
      `;
      }),
    );

    console.log(`Seeded ${insertedCollections.length} collections`);

    return {
      createTable,
      insertedCollections,
    };
  } catch (error) {
    console.error('Error seeding collections:', error);
    throw error;
  }
}

async function seedUserCollections(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS user_collections CASCADE;`

    // Create the "user_collections" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS user_collections (
        user_id UUID,
        collection_id UUID,
        PRIMARY KEY (user_id, collection_id),
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT fk_collection FOREIGN KEY(collection_id) REFERENCES collections(id)
      );
    `;
    console.log(`Created "user_collections" table`);

    // Insert data into the "user_collections" table
    const insertedUserCollections = await Promise.all(
      userCollections.map(async (userCollection) => {
        return client.sql`
          INSERT INTO user_collections (user_id, collection_id)
          VALUES (${userCollection.user_id}, ${userCollection.collection_id});
        `;
      }),
    );
    console.log(`Seeded ${insertedUserCollections.length} user_collections`);

    return {
      createTable,
      insertedUserCollections,
    };
  } catch (error) {
    console.error('Error seeding user_collections:', error);
    throw error;
  }
}

async function seedCollectionLessons(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS collection_lessons CASCADE;`

    // Create the "collection_lessons" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS collection_lessons (
        collection_id UUID,
        lesson_id UUID,
        PRIMARY KEY (collection_id, lesson_id),
        CONSTRAINT fk_collection FOREIGN KEY(collection_id) REFERENCES collections(id),
        CONSTRAINT fk_lesson FOREIGN KEY(lesson_id) REFERENCES lessons(id)
      );
    `;
    console.log(`Created "collection_lessons" table`);

    // Insert data into the "collection_lessons" table
    const insertedCollectionLessons = await Promise.all(
      collectionLessons.map(async (collectionLesson) => {
        return client.sql`
          INSERT INTO collection_lessons (collection_id, lesson_id)
          VALUES (${collectionLesson.collection_id}, ${collectionLesson.lesson_id});
        `;
      }),
    );
    console.log(`Seeded ${insertedCollectionLessons.length} collection_lessons`);

    return {
      createTable,
      insertedCollectionLessons,
    };
  } catch (error) {
    console.error('Error seeding collection_lessons:', error);
    throw error;
  }
}

async function seedExerciseConcept(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS exercise_concepts CASCADE;`

    // Create the "exercise_concepts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exercise_concepts (
        exercise_id INT,
        concept_id INT,
        PRIMARY KEY (exercise_id, concept_id),
        CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id),
        CONSTRAINT fk_concept FOREIGN KEY(concept_id) REFERENCES concepts(id)
      );
    `;

    console.log(`Created "exercise_concepts" table`);

    // Insert data into the "exercise_concepts" table
    const insertedExerciseConcepts = await Promise.all(
      exerciseConcepts.map(
        (exerciseConcept) => client.sql`
        INSERT INTO exercise_concepts (exercise_id, concept_id)
        VALUES (${exerciseConcept.exerciseId}, ${exerciseConcept.conceptId});
      `,
      ),
    );

    console.log(`Seeded ${exerciseConcepts.length} exercise concepts`);

    return {
      createTable,
      exerciseConcepts: insertedExerciseConcepts,
    };
  } catch (error) {
    console.error('Error seeding exercise_concepts:', error);
    throw error;
  }
}

async function seedExerciseVocab(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS exercise_vocabs CASCADE;`

    // Create the "exercise_vocabs" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exercise_vocabs (
        exercise_id INT,
        vocab_id INT,
        PRIMARY KEY (exercise_id, vocab_id),
        CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id),
        CONSTRAINT fk_vocab FOREIGN KEY(vocab_id) REFERENCES vocabs(id)
      );
    `;

    console.log(`Created "exercise_vocabs" table`);

    // Insert data into the "exercise_vocabs" table
    const insertedExerciseVocabss = await Promise.all(
      exerciseVocabs.map(
        (exerciseVocab) => client.sql`
        INSERT INTO exercise_vocabs (exercise_id, vocab_id)
        VALUES (${exerciseVocab.exerciseId}, ${exerciseVocab.vocabId});
      `,
      ),
    );

    console.log(`Seeded ${exerciseVocabs.length} exercise vocabs`);

    return {
      createTable,
      exerciseVocabs: insertedExerciseVocabss,
    };
  } catch (error) {
    console.error('Error seeding exercise_vocabs:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedExerciseConcept(client);
  // await seedExerciseVocab(client);
  await seedUsers(client);
  await seedLessons(client);
  await seedUserLessons(client);
  await seedExercises(client);
  await seedUserExercises(client);
  await seedLessonExercises(client);
  await seedCollections(client);
  await seedUserCollections(client);
  await seedCollectionLessons(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
