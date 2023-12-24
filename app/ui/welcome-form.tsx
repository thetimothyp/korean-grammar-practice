'use client'
import { useEffect, useState } from 'react'
import { Database } from '@/app/database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function WelcomeForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  const [usernameValidationError, setUsernameValidationError] = useState(false);
  const [usernameCollisionError, setUsernameCollisionError] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const router = useRouter();

  const user = session?.user;

  function validate() {
    if (didSubmit) {
      setUsernameCollisionError(false);
      if (username && username.length > 3) {
        setUsernameValidationError(false);
      } else {
        setUsernameValidationError(true);
      }
    }
  }

  useEffect(validate, [username, didSubmit]);

  function isValid() {
    return username && username.length > 3;
  }

  async function updateProfile({
    username,
  }: {
    username: string | null
  }) {
    try {
      setDidSubmit(true);
      if (!isValid()) return;

      setLoading(true)

      supabase.from('profiles').upsert({
        id: user?.id as string,
        username,
        updated_at: new Date().toISOString(),
      }).then(({ error }) => {
        if (error) throw error;
        router.push('/');
        setLoading(false);
      })
    } catch (error: any) {
      if (error.code == '23505') {
        setUsernameCollisionError(true);
      } else {
        console.error('Error setting username:', error);
      }
    }
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center mt-[-5rem]">
      <div className="w-full lg:w-3/5 items-center justify-center flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col w-full md:w-4/5 lg:w-3/5 gap-6">
          <h1 className='text-5xl font-bold'>Welcome!</h1>
          <div className="flex flex-col gap-2">
            <p className='text-2xl'>Before doing anything else, choose a <strong>username</strong></p>
            <input
              className='border-2 border-stone-800 rounded-md text-xl placeholder:text-stone-400 p-4'
              id="username"
              type="text"
              value={username || ''}
              placeholder='Enter a username'
              onChange={(e) => setUsername(e.target.value)}
            />
            { usernameValidationError ? (
                <span className='text-sm text-red-500'>Username must be longer than 3 characters.</span>
              ) : ''
            }
            { usernameCollisionError ? (
                <span className='text-sm text-red-500'>Username is already taken.</span>
              ) : ''
            }
          </div>

          <div className='self-end'>
            <button
              className="text-lg bg-stone-50 hover:bg-stone-200 border-2 border-stone-800 shadow-purple py-3 px-10 rounded-lg transition-colors relative"
              onClick={() => updateProfile({ username })}
              disabled={loading}
            >
              <div className={`${loading ? 'opacity-100' : 'opacity-0'} w-full h-full rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit`}>
                <div className="mt-[13px] animate-spin inline-block w-6 h-6 border-[2px] border-purple-500 border-t-transparent rounded-full" role="status" aria-label="loading" />
              </div>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}