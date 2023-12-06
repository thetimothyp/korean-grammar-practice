const { db } = require('@vercel/postgres');
const {
  concepts,
  exercises,
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
        text VARCHAR NOT NULL,
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

async function seedExercises(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS exercises CASCADE;`

    // Create the "exercises" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS exercises (
    id SERIAL PRIMARY KEY,
    en_text VARCHAR NOT NULL,
    kr_text VARCHAR NOT NULL
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

async function main() {
  const client = await db.connect();

  await seedConcepts(client);
  await seedExercises(client);
  await seedExerciseConcept(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
