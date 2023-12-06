const { db } = require('@vercel/postgres');
const {
  concepts,
  exercises,
  vocabs,
  exerciseVocabs,
  exerciseConcepts
} = require('../app/lib/placeholder-data.js');

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

async function main() {
  const client = await db.connect();

  await seedConcepts(client);
  await seedExercises(client);
  await seedVocabs(client);
  await seedExerciseConcept(client);
  await seedExerciseVocab(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
