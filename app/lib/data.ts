import { unstable_noStore as noStore } from 'next/cache';
import { db, sql } from '@vercel/postgres';
import {
  Exercise,
  Lesson,
  Collection,
} from './definitions';

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