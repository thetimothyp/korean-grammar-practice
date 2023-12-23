import { NextRequest, NextResponse } from "next/server";
import { Database } from '@/app/database.types'
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
  }

  const user = session.user;
  const body = await request.json();
  console.log('received request: ' + JSON.stringify(body));

  let { data, error } = await supabase
  .rpc('create_collection', {
    name: body.name, 
    user_id: user.id
  })
  if (error) console.error(error)
  else console.log('data:', data)

  return NextResponse.json({ id: data }, { status: 200 });
}