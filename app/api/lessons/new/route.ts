import { Database } from '@/app/database.types'
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
  }

  const reqBody = await request.json();
  console.log('received request: ' + JSON.stringify(reqBody));

  const { title, summary, body } = reqBody;
  let { data, error } = await supabase.rpc('create_lesson', { title, summary, body })
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ id: data }, { status: 200 });
}