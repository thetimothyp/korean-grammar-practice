import { NextRequest, NextResponse } from "next/server";
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: NextRequest) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const { searchParams } = new URL(request.url);
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const searchQuery = `%${searchParams.get('query')}%`;

  const { data: results, error } = await supabase
    .from('lessons')
    .select()
    .ilike('title', searchQuery);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(results);
}