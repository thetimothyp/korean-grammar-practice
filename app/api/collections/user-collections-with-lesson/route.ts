import { fetchUserCollectionsWithLesson, searchLessons } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user = await getCurrentUser();

  const results = await fetchUserCollectionsWithLesson(user.id, searchParams.get('lid') as string);

  // TODO - proper error handling
  return NextResponse.json(results);
}