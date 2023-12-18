import { createLesson } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));
  await createLesson({ 
    title: data.title,
    summary: data.summary,
    body: data.body
  }, user.id);
  return NextResponse.json({ status: 'success'});
}