const { db } = require('@vercel/postgres');
const {
  concepts,
  exercises,
  vocabs,
  exerciseVocabs,
  exerciseConcepts,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedConcepts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS concepts CASCADE;`
    // Create the "concepts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS concepts (
        id SERIAL PRIMARY KEY,
        text VARCHAR NOT NULL UNIQUE,
        explanation VARCHAR NOT NULL
      );
    `;

    console.log(`Created "concepts" table`);

    // Insert data into the "concepts" table
    const insertedConcepts = await Promise.all(
      concepts.map(async (concept) => {
        return client.sql`
        INSERT INTO concepts (text, explanation)
        VALUES (${concept.text}, ${concept.explanation})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedConcepts.length} concepts`);

    return {
      createTable,
      concepts: insertedConcepts,
    };
  } catch (error) {
    console.error('Error seeding concepts:', error);
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

    // Insert data into the "concepts" table
    // const insertedConcepts = await Promise.all(
    //   concepts.map(async (concept) => {
    //     return client.sql`
    //     INSERT INTO concepts (text, explanation)
    //     VALUES (${concept.text}, ${concept.explanation})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   }),
    // );

    // console.log(`Seeded ${insertedConcepts.length} concepts`);

    return {
      createTable,
      // concepts: insertedConcepts,
    };
  } catch (error) {
    console.error('Error seeding lessons:', error);
    throw error;
  }
}

async function seedVocabs(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS vocabs CASCADE;`
    // Create the "vocab" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS vocabs (
        id SERIAL PRIMARY KEY,
        en_text VARCHAR NOT NULL,
        kr_text VARCHAR NOT NULL UNIQUE
      );
    `;

    console.log(`Created "vocabs" table`);

    // Insert data into the "vocab" table
    const insertedVocabs = await Promise.all(
      vocabs.map(async (vocab) => {
        return client.sql`
        INSERT INTO vocabs (en_text, kr_text)
        VALUES (${vocab.enText}, ${vocab.krText})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedVocabs.length} vocabs`);

    return {
      createTable,
      vocabs: insertedVocabs,
    };
  } catch (error) {
    console.error('Error seeding vocabs:', error);
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
    id SERIAL PRIMARY KEY,
    en_text VARCHAR NOT NULL UNIQUE,
    kr_text VARCHAR NOT NULL UNIQUE
  );
`;

    console.log(`Created "exercises" table`);

    // Insert data into the "exercises" table
    const insertedExercises = await Promise.all(
      exercises.map(
        (exercise) => client.sql`
        INSERT INTO exercises (en_text, kr_text)
        VALUES (${exercise.enText}, ${exercise.krText})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedExercises.length} exercises`);

    return {
      createTable,
      exercises: insertedExercises,
    };
  } catch (error) {
    console.error('Error seeding exercises:', error);
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
        CONSTRAINT fk_exercise FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT fk_vocab FOREIGN KEY(lesson_id) REFERENCES lessons(id)
      );
    `;

    console.log(`Created "user_lessons" table`);

    // Insert data into the "exercise_vocabs" table
    // const insertedExerciseVocabss = await Promise.all(
    //   exerciseVocabs.map(
    //     (exerciseVocab) => client.sql`
    //     INSERT INTO exercise_vocabs (exercise_id, vocab_id)
    //     VALUES (${exerciseVocab.exerciseId}, ${exerciseVocab.vocabId});
    //   `,
    //   ),
    // );

    // console.log(`Seeded ${exerciseVocabs.length} exercise vocabs`);

    return {
      createTable,
      // exerciseVocabs: insertedExerciseVocabss,
    };
  } catch (error) {
    console.error('Error seeding user_lessons:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedConcepts(client);
  // await seedExercises(client);
  // await seedVocabs(client);
  // await seedExerciseConcept(client);
  // await seedExerciseVocab(client);
  await seedUsers(client);
  await seedLessons(client);
  await seedUserLessons(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
