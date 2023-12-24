import { Database } from '@/app/database.types'
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";
import { difference } from 'underscore';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('received request: ' + JSON.stringify(body));
  const { initialLessonIds, selectedLessonIds } = body;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json(null, { status: 401, statusText: 'Unauthorized' });
  }

  const added: string[] = difference(selectedLessonIds, initialLessonIds);
  const removed: string[] = difference(initialLessonIds, selectedLessonIds);

  if (removed.length > 0) {
    await supabase
      .from('collection_lessons')
      .delete()
      .eq('cid', body.cid)
      .in('lid', removed);
  }

  if (added.length > 0) {
    await supabase
      .from('collection_lessons')
      .insert(added.map(lid => ({ cid: body.cid, lid })))
  }

  return NextResponse.json({ success: true });
}