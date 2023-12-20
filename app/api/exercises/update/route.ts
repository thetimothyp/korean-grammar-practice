import { tagExerciseWithLessons, updateExercise } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  const promises: Promise<any>[] = [];

  const updateExercisesTable = async () => {
    const res = await updateExercise({
      id: data.id,
      nl_text: data.nlText,
      tl_text: data.tlText,
    });
    return res;
  }

  const updateLessonExercisesTable = async () => {
    await tagExerciseWithLessons(data.id, data.lessonIds);
  }

  promises.push(updateExercisesTable());
  promises.push(updateLessonExercisesTable());

  const res = await Promise.all(promises);
  // Return the id of the updated exercise
  return NextResponse.json(res[0]);
}