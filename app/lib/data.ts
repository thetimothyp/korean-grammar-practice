import { unstable_noStore as noStore } from 'next/cache';
import { db, sql } from '@vercel/postgres';
import {
  Concept,
  Exercise,
  Vocab,
  Lesson,
  Collection,
} from './definitions';

export async function fetchExercises() {
  try {
    // noStore();
    const data = await sql<Exercise>`SELECT * from exercises`;
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch exercises');
  }
}

export async function fetchExercise(id: string) {
  try {
    noStore();
    const data = await sql`
      SELECT exercises.id eid, exercises.tl_text, exercises.nl_text, lesson_exercises.lesson_id lid, lessons.title lesson_title, lessons.summary lesson_summary
      FROM exercises
      JOIN lesson_exercises ON lesson_exercises.exercise_id = exercises.id
      JOIN lessons ON lesson_exercises.lesson_id = lessons.id
      WHERE exercises.id = ${id}
      GROUP BY eid, lid, lesson_title, lesson_summary`
    if (data.rows.length < 1) throw new Error(`Failed to fetch exercise: ${id}`);
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch exercise!');
  }
}

export async function fetchExercisesForUser(uid: string) {
  try {
    noStore();
    const data = await sql`
      SELECT exercises.id, exercises.tl_text, COUNT(lessons) lesson_count
      FROM user_exercises
      JOIN users ON user_exercises.user_id = users.id
      JOIN exercises ON user_exercises.exercise_id = exercises.id
      JOIN lesson_exercises ON lesson_exercises.exercise_id = exercises.id
      JOIN lessons ON lesson_exercises.lesson_id = lessons.id
      WHERE users.id = ${uid}
      GROUP BY exercises.id`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch exercises for user with UID: ${uid}`);
  }
}

export async function updateExercise(exercise: Exercise) {
  try {
    noStore();
    const data = await sql`
      UPDATE exercises SET (nl_text, tl_text) =
      (${exercise.nl_text}, ${exercise.tl_text})
      WHERE id = ${exercise.id} RETURNING id`;
    console.log(`Updated exercise with ID: ${exercise.id}`);
    return data.rows[0];
  } catch (error) {
    console.error('Error creating updating exercise with ID: ' + exercise.id, error);
    throw error;
  }
}

export async function fetchConceptsForExercise(exercise: Exercise) {
  try {
    // noStore();
    const data = await sql<Concept>`
      SELECT *
      FROM exercise_concepts
      JOIN exercises ON exercise_concepts.exercise_id = exercises.id
      JOIN concepts ON exercise_concepts.concept_id = concepts.id
      WHERE exercises.id = ${exercise.id}`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch concepts for exercise with ID ${exercise.id}`);
  }
}

export async function fetchConcepts() {
  try {
    const data = await sql<Concept>`
      SELECT *
      FROM concepts`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch concepts`);
  }
}

export async function fetchExercisesWithConcepts(conceptIds: string, exceptIds: string = '') {
  // https://github.com/orgs/vercel/discussions/3682
  const valuesString = conceptIds.split(',').map((id, index) => `$${index + 1}`).join(',');
  const query = exceptIds.length > 0 ? 
    `
      SELECT exercises.id
      FROM exercise_concepts
      JOIN exercises ON exercise_concepts.exercise_id = exercises.id
      JOIN concepts ON exercise_concepts.concept_id = concepts.id
      WHERE concepts.id IN (${valuesString})
      AND exercises.id NOT IN (${exceptIds})
    ` : 
    `
      SELECT exercises.id
      FROM exercise_concepts
      JOIN exercises ON exercise_concepts.exercise_id = exercises.id
      JOIN concepts ON exercise_concepts.concept_id = concepts.id
      WHERE concepts.id IN (${valuesString})
    `

  const params: any[] = [];
  conceptIds.split(',').forEach(id => {
    params.push(id);
  });

  try {
    const client = await db.connect();
    const data = await client.query(query, params);
    client.release();
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch exercises with concept IDs: ${conceptIds}`);
  }
}

export async function fetchVocabForExercise(exercise: Exercise) {
  try {
    // noStore();
    const data = await sql<Vocab>`
      SELECT *
      FROM exercise_vocabs
      JOIN exercises ON exercise_vocabs.exercise_id = exercises.id
      JOIN vocabs ON exercise_vocabs.vocab_id = vocabs.id
      WHERE exercises.id = ${exercise.id}`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch vocab for exercise with ID ${exercise.id}`);
  }
}

export async function createConcept(text: string, explanation: string) {
  try {
    await sql`
      INSERT INTO concepts (text, explanation)
      VALUES (${text}, ${explanation});`
    
    console.log(`Inserted new grammar concept: ${text}`)
  } catch (error) {
    console.error('Error creating new concept:', error);
    throw error;
  }
}

export async function createExercise(enText: string, krText: string) {
  try {
    await sql`
      INSERT INTO exercises (en_text, kr_text)
      VALUES (${enText}, ${krText});`
    
    console.log('Inserted 1 new exercise.')
  } catch (error) {
    console.error('Error creating new exercise:', error);
    throw error;
  }
}

export async function createVocab(enText: string, krText: string) {
  try {
    await sql`
      INSERT INTO vocabs (en_text, kr_text)
      VALUES (${enText}, ${krText});`
    
    console.log('Inserted 1 new vocab.')
  } catch (error) {
    console.error('Error creating new vocab:', error);
    throw error;
  }
}

export async function searchExercises(query: string) {
  try {
    const param = `%${query}%`;
    const data = await sql<Concept>`
      SELECT *
      FROM exercises
      WHERE en_text ILIKE ${param} OR kr_text ILIKE ${param}`
    return data.rows;
  } catch (error) {
    console.error('Error fetching grammar search results:', error);
    throw error;
  }
}

export async function searchConcepts(query: string) {
  try {
    const param = `%${query}%`;
    const data = await sql<Concept>`
      SELECT *
      FROM concepts
      WHERE text ILIKE ${param}`
    return data.rows;
  } catch (error) {
    console.error('Error fetching grammar search results:', error);
    throw error;
  }
}

export async function searchVocab(query: string) {
  try {
    const param = `%${query}%`;
    const data = await sql<Concept>`
      SELECT *
      FROM vocabs
      WHERE kr_text ILIKE ${param}`
    return data.rows;
  } catch (error) {
    console.error('Error fetching vocab search results:', error);
    throw error;
  }
}

export async function tagExerciseWithConcepts(exerciseId: number, conceptIds: number[]) {
  // https://github.com/orgs/vercel/discussions/3682
  const valuesString = conceptIds.map((c, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(',');
  const query = `
    INSERT INTO exercise_concepts (exercise_id, concept_id)
    VALUES ${valuesString}
    ON CONFLICT DO NOTHING`
  const params: any[] = [];
  conceptIds.forEach(c => {
    params.push(exerciseId);
    params.push(c);
  });

  try {
    const client = await db.connect();
    // Lazy way, drop all existing rows to delete tags that are removed in UI
    await client.sql`DELETE FROM exercise_concepts WHERE exercise_id = ${exerciseId}`;
    if (conceptIds.length > 0) {
      await client.query(query, params);
    }
    client.release();
    console.log(`Inserted ${conceptIds.length} new concepts for exercise ${exerciseId}`);
  } catch (error) {
    console.error('Error tagging exercise with concepts:', error);
    throw error;
  }
}

export async function tagExerciseWithVocab(exerciseId: number, vocabIds: number[]) {
  // https://github.com/orgs/vercel/discussions/3682
  const valuesString = vocabIds.map((c, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(',');
  const query = `
    INSERT INTO exercise_vocabs (exercise_id, vocab_id)
    VALUES ${valuesString}
    ON CONFLICT DO NOTHING`
  const params: any[] = [];
  vocabIds.forEach(c => {
    params.push(exerciseId);
    params.push(c);
  });

  try {
    const client = await db.connect();
    await client.sql`DELETE FROM exercise_vocabs WHERE exercise_id = ${exerciseId}`;
    if (vocabIds.length > 0) {
      await client.query(query, params);
    }
    client.release();
    console.log(`Inserted ${vocabIds.length} new vocab for exercise ${exerciseId}`);
  } catch (error) {
    console.error('Error tagging exercise with vocab:', error);
    throw error;
  }
}

export async function fetchUser(email: string) {
  try {
    noStore();
    const data = await sql<Exercise>`SELECT * FROM users WHERE email = ${email} LIMIT 1`
    if (data.rows.length === 0) throw new Error(`Failed to fetch user: ${email}`);
    return data.rows[0];
  } catch(error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch user: ' + email);
  }
}

export async function fetchLesson(id: string) {
  try {
    noStore();
    const data = await sql<Lesson>`
      SELECT *
      FROM lessons
      WHERE id = ${id}`;
    if (data.rows.length === 0) throw new Error(`No lesson found with ID: ${id}`);
    return data.rows[0];
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch lesson with ID: ${id}`);
  }
}

export async function fetchLessonsForUser(uid: any) {
  try {
    noStore();
    // https://stackoverflow.com/questions/57803167/sql-how-to-count-the-number-of-relations-between-two-tables-and-include-zeroes
    const data = await sql`
      SELECT lessons.id, lessons.title, lessons.summary, COUNT(exercises) exercise_count
      FROM user_lessons
      JOIN users ON user_lessons.user_id = users.id
      JOIN lessons ON user_lessons.lesson_id = lessons.id
      LEFT JOIN lesson_exercises ON lesson_exercises.lesson_id = lessons.id
      LEFT JOIN exercises ON lesson_exercises.exercise_id = exercises.id
      WHERE users.id = ${uid}
      GROUP BY lessons.id`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch lessons for user with UID: ${uid}`);
  }
}

export async function createLesson(lesson: any, uid: string) {
  try {
    const query = `
    with rows as (
      INSERT INTO lessons (title, summary, body)
      VALUES ($1, $2, $3)
      RETURNING id
    )
    INSERT INTO user_lessons (user_id, lesson_id)
    SELECT $4, id FROM rows
    RETURNING lesson_id AS id;`;
    const params = [lesson.title, lesson.summary, lesson.body, uid];
    const client = await db.connect();
    const data = await client.query(query, params);
    client.release();
    console.log(`Inserted 1 new lesson for user: ${uid}`);
    return data.rows[0];
  } catch (error) {
    console.error('Error creating new lesson:', error);
    throw error;
  }
}

export async function updateLesson(lesson: Lesson) {
  try {
    noStore();
    const data = await sql`
      UPDATE lessons SET (title, summary, body) =
      (${lesson.title}, ${lesson.summary}, ${lesson.body})
      WHERE id = ${lesson.id} RETURNING id`;
    console.log(`Updated lesson with ID: ${lesson.id}`);
    return data.rows[0];
  } catch (error) {
    console.error('Error creating updating lesson with ID: ' + lesson.id, error);
    throw error;
  }
}

export async function searchLessons(query: string) {
  try {
    const param = `%${query}%`;
    const data = await sql<Lesson>`
      SELECT *
      FROM lessons
      WHERE title ILIKE ${param}`
    return data.rows;
  } catch (error) {
    console.error('Error fetching lesson search results:', error);
    throw error;
  }
}

export async function fetchCollectionsForUser(uid: string) {
  try {
    noStore();
    const data = await sql`
      SELECT collections.id, collections.name, COUNT(lessons) lesson_count
      FROM user_collections
      JOIN users ON user_collections.user_id = users.id
      JOIN collections ON user_collections.collection_id = collections.id
      JOIN collection_lessons ON collection_lessons.collection_id = collections.id
      JOIN lessons ON collection_lessons.lesson_id = lessons.id
      WHERE users.id = ${uid}
      GROUP BY collections.id`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch collections for user with UID: ${uid}`);
  }
}

export async function fetchExercisesForCollection(cid: string) {
  try {
    noStore();
    const data = await sql`
      SELECT exercises.id eid, exercises.nl_text, exercises.tl_text, lessons.id lid, lessons.title lesson_title, lessons.summary lesson_summary
      FROM collection_lessons
      JOIN collections ON collection_lessons.collection_id = collections.id
      JOIN lessons ON collection_lessons.lesson_id = lessons.id
      JOIN lesson_exercises ON lesson_exercises.lesson_id = lessons.id
      JOIN exercises ON lesson_exercises.exercise_id = exercises.id
      WHERE collections.id = ${cid}
      GROUP BY eid, lid`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch exercises for collection with ID: ${cid}`);
  }
}