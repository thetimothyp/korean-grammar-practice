import { updateExercise } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  const res = await updateExercise({
    id: data.id,
    nl_text: data.nlText,
    tl_text: data.tlText,
  });
  return NextResponse.json(res);
}