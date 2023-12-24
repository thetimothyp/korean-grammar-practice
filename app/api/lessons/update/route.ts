import { Database } from '@/app/database.types'
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const data = await request.json();
  console.log('received request: ' + JSON.stringify(data));

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
  }

  const { data: res, error } = await supabase
    .from('lessons')
    .update({ title: data.title, summary: data.summary, body: data.body })
    .eq('id', data.id)
    .select();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ id: res[0].id });
}