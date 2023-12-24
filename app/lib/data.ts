import { unstable_noStore as noStore } from 'next/cache';
import { db, sql } from '@vercel/postgres';
import {
  Exercise,
  Lesson,
  Collection,
} from './definitions';

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