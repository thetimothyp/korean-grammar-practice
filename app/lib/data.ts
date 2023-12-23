import { unstable_noStore as noStore } from 'next/cache';
import { db, sql } from '@vercel/postgres';
import {
  Exercise,
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

export async function tagExerciseWithLessons(exerciseId: string, lessonIds: string[]) {
  // https://github.com/orgs/vercel/discussions/3682
  const valuesString = lessonIds.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(',');
  const query = `
    INSERT INTO lesson_exercises (lesson_id, exercise_id)
    VALUES ${valuesString}
    ON CONFLICT DO NOTHING`
  const params: any[] = [];
  lessonIds.forEach(l => {
    params.push(l);
    params.push(exerciseId);
  });

  try {
    const client = await db.connect();
    // Lazy way, drop all existing rows to delete tags that are removed in UI
    await client.sql`DELETE FROM lesson_exercises WHERE exercise_id = ${exerciseId}`;
    console.log('Deleted lesson_exercises for exercise: ' + exerciseId);
    if (lessonIds.length > 0) {
      await client.query(query, params);
    }
    client.release();
    console.log(`Updated exercise ${exerciseId} with ${lessonIds.length} lessons!`);
  } catch (error) {
    console.error('Error tagging exercise with lessons:', error);
    throw error;
  }
}

export async function createExercise(exercise: any, uid: string) {
  try {
    const query = `
    with rows as (
      INSERT INTO exercises (tl_text, nl_text)
      VALUES ($1, $2)
      RETURNING id
    )
    INSERT INTO user_exercises (user_id, exercise_id)
    SELECT $3, id FROM rows
    RETURNING exercise_id AS id;`;
    const params = [exercise.tl_text, exercise.nl_text, uid];
    const client = await db.connect();
    const data = await client.query(query, params);
    client.release();
    console.log(`Inserted 1 new exercise for user: ${uid}`);
    return data.rows[0];
  } catch (error) {
    console.error('Error creating new exercise:', error);
    throw error;
  }
}

export async function searchExercises(query: string) {
  try {
    const param = `%${query}%`;
    const data = await sql`
      SELECT *
      FROM exercises
      WHERE nl_text ILIKE ${param} OR tl_text ILIKE ${param}`
    return data.rows;
  } catch (error) {
    console.error('Error fetching grammar search results:', error);
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
    const data = await sql`
      SELECT *
      FROM lessons
      JOIN user_lessons ON user_lessons.lesson_id = lessons.id
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

/*
  To be used when updating collections associated with a given lesson;
  see `updateCollectionLessons` for updating lessons associated
  with a given collection.
*/
export async function updateLessonCollections(lid: string, cidsToInsert: string[], cidsToDelete: string[]) {
  const deleteParamsStr = cidsToDelete.map((_, index) => `$${index + 2}`).join(',')
  const deleteQuery = `
    DELETE FROM collection_lessons
    WHERE lesson_id = $1
    AND collection_id IN (${deleteParamsStr})`
  const deleteValues: string[] = [lid];
  cidsToDelete.forEach(cid => {
    deleteValues.push(cid);
  });

  const insertParamsStr = cidsToInsert.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(',');
  const insertQuery = `
    INSERT INTO collection_lessons (collection_id, lesson_id)
    VALUES ${insertParamsStr}
    ON CONFLICT DO NOTHING`
  const insertValues: string[] = [];
  cidsToInsert.forEach(cid => {
    insertValues.push(cid);
    insertValues.push(lid);
  });

  try {
    const client = await db.connect();
    if (cidsToDelete.length > 0) await client.query(deleteQuery, deleteValues);
    if (cidsToInsert.length > 0) await client.query(insertQuery, insertValues);
    client.release();
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to update lesson with ID: ${lid}`);
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

/*
  To be used when updating lessons associated with a given collection;
  see `updateLessonCollections` for updating collections associated
  with a given lesson.
*/
export async function updateCollectionLessons(cid: string, lidsToInsert: string[], lidsToDelete: string[]) {
  const deleteParamsStr = lidsToDelete.map((_, index) => `$${index + 2}`).join(',')
  const deleteQuery = `
    DELETE FROM collection_lessons
    WHERE collection_id = $1
    AND lesson_id IN (${deleteParamsStr})`
  const deleteValues: string[] = [cid];
  lidsToDelete.forEach(lid => {
    deleteValues.push(lid);
  });

  const insertParamsStr = lidsToInsert.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(',');
  const insertQuery = `
    INSERT INTO collection_lessons (collection_id, lesson_id)
    VALUES ${insertParamsStr}
    ON CONFLICT DO NOTHING`
  const insertValues: string[] = [];
  lidsToInsert.forEach(lid => {
    insertValues.push(cid);
    insertValues.push(lid);
  });

  try {
    const client = await db.connect();
    if (lidsToDelete.length > 0) await client.query(deleteQuery, deleteValues);
    if (lidsToInsert.length > 0) await client.query(insertQuery, insertValues);
    client.release();
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to update collection with ID: ${cid}`);
  }
}

export async function fetchCollection(id: string) {
  try {
    noStore();
    const data = await sql`
      SELECT *
      FROM collections
      JOIN user_collections ON user_collections.collection_id = ${id}
      WHERE id = ${id}`;
    if (data.rows.length === 0) throw new Error(`No collection found with ID: ${id}`);
    return data.rows[0];
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch collection with ID: ${id}`);
  }
}

/*
  Fetches all the user's collections that contain a given lesson
*/
export async function fetchUserCollectionsWithLesson(uid: string, lid: string) {
  try {
    noStore();
    const data = await sql`
      with has_collection as (
        SELECT user_collections.collection_id, collections.name c_name, collection_lessons.lesson_id
        FROM user_collections
        JOIN collections ON user_collections.collection_id = collections.id
        LEFT JOIN collection_lessons ON user_collections.collection_id = collection_lessons.collection_id
        WHERE user_collections.user_id = ${uid}
        AND collection_lessons.lesson_id = ${lid}
      )
      SELECT user_collections.collection_id cid, collections.name c_name, null lid
      FROM user_collections
      JOIN collections ON user_collections.collection_id = collections.id
      WHERE user_collections.user_id = ${uid}
      AND user_collections.collection_id NOT IN (SELECT collection_id FROM has_collection)
      UNION SELECT * FROM has_collection
    `
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch user collections for user ${uid} containing lesson ${lid}`);
  }
}

export async function fetchLessonsForCollection(cid: string) {
  try {
    noStore();
    const data = await sql`
      SELECT lessons.id, lessons.title, lessons.summary, COUNT(lesson_exercises) exercise_count 
      FROM collection_lessons
      JOIN collections ON collection_lessons.collection_id = collections.id
      JOIN lessons ON collection_lessons.lesson_id = lessons.id
      JOIN lesson_exercises ON lesson_exercises.lesson_id = lessons.id
      WHERE collections.id = ${cid}
      GROUP BY lessons.id`
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch exercises for collection with ID: ${cid}`);
  }
}