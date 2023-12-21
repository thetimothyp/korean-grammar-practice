import { createCollection } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));

  const res = await createCollection({
    name: data.name,
  }, user.id);

  return NextResponse.json(res);
}