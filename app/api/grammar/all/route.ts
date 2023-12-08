import { fetchConcepts } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const results = await fetchConcepts();
  return NextResponse.json(results);
}