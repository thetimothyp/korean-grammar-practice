import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import {
  Concept,
  Exercise,
  Vocab,
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

export async function fetchExercise(id: number) {
  try {
    noStore();
    const data = await sql<Exercise>`SELECT * FROM exercises WHERE id = ${id}`
    if (data.rows.length === 0) throw new Error(`Failed to fetch exercise: ${id}`);
    return data.rows[0];
  } catch(error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch exercise!');
  }
}

export async function fetchConceptsForExercise(exercise: Exercise) {
  try {
    // noStore();
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

export async function fetchVocabForExercise(exercise: Exercise) {
  try {
    // noStore();
    const data = await sql<Vocab>`
      SELECT vocabs.en_text, vocabs.kr_text
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