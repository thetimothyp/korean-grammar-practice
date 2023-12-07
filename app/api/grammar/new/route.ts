import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('received request: ' + JSON.stringify(request));
  return NextResponse.json({ status: 'success'});
}