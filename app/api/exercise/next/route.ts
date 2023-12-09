import { fetchExercises, fetchExercisesWithConcepts } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  const id = searchParams.get('id') as string;
  
  const results = filter == 'all' ? await fetchExercises() : await fetchExercisesWithConcepts(filter as string);

  // Calculate next exercise ID
  // TODO - do this in the SQL query
  let nextExerciseIndex = 0;

  while (results[nextExerciseIndex] && results[nextExerciseIndex].id <= parseInt(id) && nextExerciseIndex < results.length) {
    nextExerciseIndex += 1;
  }

  if (nextExerciseIndex >= results.length) {
    return NextResponse.json({ nextId: results[0].id});
  }
  return NextResponse.json({ nextId: results[nextExerciseIndex].id});
}