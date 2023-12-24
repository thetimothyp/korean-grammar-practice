import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const { data: { user } } = await supabase.auth.getUser();
  const { data: profiles, error } = await supabase.from('profiles').select().eq('id', user?.id);
  if (error) console.error('Error fetching profile for user:', user?.id);
  if (profiles == null) {
    return NextResponse.redirect(new URL('/account', req.url));
  }
  if (profiles[0].username != null) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.redirect(new URL('/welcome', req.url));
}