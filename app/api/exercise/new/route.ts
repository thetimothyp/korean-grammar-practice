import { createExercise } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  await createExercise(data.enText, data.krText);
  return NextResponse.json({ status: 'success'});
}