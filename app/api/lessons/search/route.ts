import { searchLessons } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const results = await searchLessons(searchParams.get('query') as string);
  // TODO - proper error handling
  return NextResponse.json(results);
}