import { tagExerciseWithVocab } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  await tagExerciseWithVocab(data.exerciseId, data.vocabIds);
  return NextResponse.json({ status: 'success'});
}