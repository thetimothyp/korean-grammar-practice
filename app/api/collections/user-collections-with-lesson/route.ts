import { Database } from '@/app/database.types'
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
  }

  // For some reason, supabase fn returns null for lid column on our original query so we have to get
  //  all collections and normalize the data here.
  let { data: results, error } = await supabase.rpc('fetch_user_collections_with_lesson', { lesson_id: searchParams.get('id')! })
  
  const normalized = results?.reduce((obj: any, item) => {
    if (!(item.cid in obj)) {
      obj[item.cid] = item;
    }

    if (item.lid) {
      obj[item.cid].lid = item.lid;
    }

    return obj;
  }, {});

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // TODO - proper error handling
  return NextResponse.json(Object.values(normalized));
}