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

export async function fetchConceptsForExercise(exercise: Exercise) {
  try {
    const data = await sql<Concept>`
      SELECT concepts.text, concepts.explanation
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