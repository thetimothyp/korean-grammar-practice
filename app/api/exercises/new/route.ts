import { createExercise, tagExerciseWithLessons } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));

  const res = await createExercise({
    nl_text: data.nlText,
    tl_text: data.tlText,
  }, user.id);
  
  await tagExerciseWithLessons(res.id, data.lessonIds);

  return NextResponse.json(res);
}