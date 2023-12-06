import { sql } from '@vercel/postgres';
import {
  Concept,
  Exercise,
} from './definitions';

export async function fetchExercises() {
  try {
    const data = await sql<Exercise>`SELECT * from exercises`;
    return data.rows;
  } catch(error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch exercises');
  }
}