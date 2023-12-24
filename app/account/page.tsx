import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/app/database.types'
import AccountForm from '@/app/ui/account-form'

export default async function Account() {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AccountForm session={session} />
}