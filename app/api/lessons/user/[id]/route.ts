import { fetchLessonsForUser } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const results = await fetchLessonsForUser(searchParams.get('uid'));
  // TODO - proper error handling
  return NextResponse.json(results);
}