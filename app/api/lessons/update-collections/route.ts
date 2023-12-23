import { updateLessonCollections } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { difference } from 'underscore';

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  const { initialCollectionIds, selectedCollectionIds } = data;

  const added: string[] = difference(selectedCollectionIds, initialCollectionIds);
  const removed: string[] = difference(initialCollectionIds, selectedCollectionIds);
  await updateLessonCollections(data.lid, added, removed);

  return NextResponse.json({ success: true });
}