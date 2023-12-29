import { Database } from '@/app/database.types'
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const json = await request.json();
  console.log('received request: ' + JSON.stringify(json));

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
  }

  const { data: res, error } = await supabase.rpc(
    'insert_user_exerciseset_and_exercises',
    { p_exerciseset_title: json.title, p_exercises: json.exercises }
  );

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  console.log('Result:', res);
  return NextResponse.json({ id: res }, { status: 200 });
}