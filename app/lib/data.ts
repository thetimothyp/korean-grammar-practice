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