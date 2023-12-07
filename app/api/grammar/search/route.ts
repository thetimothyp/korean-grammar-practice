import { searchConcepts } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get('query') === 'all') {
    const nextId = parseInt(searchParams.get('id') as string) + 1;
    return NextResponse.json({ nextId })
  }
  const results = await searchConcepts(searchParams.get('query') as string);
  // TODO - proper error handling
  return NextResponse.json(results);
}