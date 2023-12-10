import { fetchExercises, fetchExercisesWithConcepts } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') as string;
  const done = searchParams.get('done') as string;
  
  let results = filter == '' ? await fetchExercises() : await fetchExercisesWithConcepts(filter, done);

  if (results.length > 0) {
    // return random exercise from result set
    return NextResponse.json({ nextId: results[0].id, reset: false });
  }

  results = filter == '' ? await fetchExercises() : await fetchExercisesWithConcepts(filter);
  return NextResponse.json({ nextId: results[0].id, reset: true });
}