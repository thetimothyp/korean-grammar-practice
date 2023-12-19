import { updateLesson } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  const res = await updateLesson({
    title: data.title,
    summary: data.summary,
    body: data.body,
    id: data.id,
  });
  return NextResponse.json(res);
}