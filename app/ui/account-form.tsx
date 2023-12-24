'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/app/database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const [usernameValidationError, setUsernameValidationError] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const user = session?.user

  function validate() {
    if (didSubmit) {
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

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user!.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    fullname,
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setDidSubmit(true);
      if (!isValid()) return;

      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-6">
      <div className="w-full lg:w-3/5 flex flex-col gap-4 p-4 md:p-6">
        <h1 className='text-2xl self-start'>Account Settings</h1>
        <hr />
        <div className="flex flex-col w-full md:w-4/5 lg:w-3/5 gap-4">
          <div className="flex flex-col gap-1">
            <label className='text-sm text-stone-500' htmlFor="email">Email</label>
            <input className='border-2 border-stone-400 rounded-md px-4 py-2' id="email" type="text" value={session?.user.email} disabled />
          </div>
          <div className="flex flex-col gap-1">
            <label className='text-sm text-stone-500' htmlFor="fullName">Full Name</label>
            <input
              className='border-2 border-stone-800 rounded-md px-4 py-2'
              id="fullName"
              type="text"
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className='text-sm text-stone-500' htmlFor="username">Username</label>
            <input
              className='border-2 border-stone-800 rounded-md px-4 py-2'
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
            { usernameValidationError ? (
                <span className='text-sm text-red-500'>Username must be longer than 3 characters.</span>
              ) : ''
            }
          </div>

          <div className='mt-4'>
            <button
              className="text-white bg-green-500 hover:bg-green-600 shadow-sm py-2 px-8 rounded-lg transition-colors"
              onClick={() => updateProfile({ fullname, username, avatar_url })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Save'}
            </button>
          </div>
        </div>
        <hr />

        <div>
          <form action="/auth/signout" method="post">
            <button className="py-2 px-8 border-2 rounded-lg border-stone-800 bg-stone-50 hover:bg-stone-100 transition-colors" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
      </div>
  )
}