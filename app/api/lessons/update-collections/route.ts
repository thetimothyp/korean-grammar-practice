import { Database } from '@/app/database.types'
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";
import { difference } from 'underscore';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('received request: ' + JSON.stringify(body));
  const { initialCollectionIds, selectedCollectionIds } = body;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
  }

  const added: string[] = difference(selectedCollectionIds, initialCollectionIds);
  const removed: string[] = difference(initialCollectionIds, selectedCollectionIds);

  if (removed.length > 0) {
    await supabase
      .from('collection_lessons')
      .delete()
      .eq('lid', body.lid)
      .in('cid', removed);
  }

  if (added.length > 0) {
    await supabase
      .from('collection_lessons')
      .insert(added.map(cid => ({ cid, lid: body.lid })))
  }

  return NextResponse.json({ success: true });
}