import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('filter') === 'all') {
    const nextId = parseInt(searchParams.get('id') as string) + 1;
    return NextResponse.json({ nextId })
  }
  // TODO - proper error handling
  return NextResponse.json({ status: 'error'});
}