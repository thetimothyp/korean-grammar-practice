import { fetchExercises, fetchExercisesWithConcepts } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') as string;
  const done = searchParams.get('done') as string;
  
  let results = filter == '' ? await fetchExercises() : await fetchExercisesWithConcepts(filter, done);

  if (results.length > 0) {
    // Return random exercise from result set
    // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
    const randomIndex = Math.floor(Math.random() * results.length);
    return NextResponse.json({ nextId: results[randomIndex].id, reset: false });
  }

  results = filter == '' ? await fetchExercises() : await fetchExercisesWithConcepts(filter);
  const randomIndex = Math.floor(Math.random() * results.length);
  return NextResponse.json({ nextId: results[randomIndex].id, reset: true });
}