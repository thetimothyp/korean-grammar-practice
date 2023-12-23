import { updateCollectionLessons } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { difference } from 'underscore';

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  const { initialLessonIds, selectedLessonIds } = data;
  const added: string[] = difference(selectedLessonIds, initialLessonIds);
  const removed: string[] = difference(initialLessonIds, selectedLessonIds);
  await updateCollectionLessons(data.cid, added, removed);

  return NextResponse.json({ success: true });
}