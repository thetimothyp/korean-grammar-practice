'use client';

import Image from "next/image";
import Link from "next/link";
import logoSvg from "@/public/logo.svg";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from 'flowbite-react';
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/app/database.types'

export default function Navbar() {
  const supabase = createClientComponentClient<Database>();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (data.user) {
        setUser(data.user);
      }
    });
  }, []);

  const activeClass = useCallback((href: string) => {
    return pathname.startsWith(href) ? 'active underline' : '';
  }, [pathname]);

  function AccountMenu() {
    function signOut() {
      supabase.auth.signOut().then(router.refresh)
    }

    return (
      <Dropdown className="w-[200px] bg-stone-50" label="" renderTrigger={() => <UserCircleIcon className="h-10 w-10 text-stone-600 hover:cursor-pointer" />}>
        <Dropdown.Item className="px-6 py-4 hover:bg-stone-300/20 transition-colors text-md">
          <Link href='#'>Profile</Link>
        </Dropdown.Item>
        <Dropdown.Item className="px-6 py-4 hover:bg-stone-300/20 transition-colors text-md">
          <Link href='/account'>Account Settings</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="div" className="px-6 py-4 hover:bg-stone-300/20 transition-colors text-md">
          <button onClick={signOut}>
            Sign out
          </button>
        </Dropdown.Item>
      </Dropdown>
    );
  }

  return (
    <nav className="hidden md:block fixed z-50">
      <div className="w-screen flex justify-between py-4 px-8 items-center border-b bg-stone-50">
        <div className="flex items-center">
          <div>
            <Link href='/dashboard'>
              <Image
                priority
                src={logoSvg}
                alt="Let’s Practice Korean! logo"
                width={72}
              />
            </Link>
          </div>
          <div className="ml-8">
            <ul className="flex gap-8">
              <li className={`hover:underline decoration-2 underline-offset-8 ${activeClass('/dashboard')}`}>
                <Link href='/dashboard'>Home</Link>
              </li>
              <li className={`hover:underline decoration-2 underline-offset-8 ${activeClass('/collections')}`}>
                <Link href='/collections'>Collections</Link>
              </li>
              <li className={`hover:underline decoration-2 underline-offset-8 ${activeClass('/lessons')}`}>
                <Link href='/lessons'>Lessons</Link>
              </li>
              <li className={`hover:underline decoration-2 underline-offset-8 ${activeClass('/exercises')}`}>
                <Link href='/exercises'>Exercises</Link>
              </li>
            </ul>
          </div>
        </div>
        { user == null ? '' : <AccountMenu /> }
      </div>
    </nav>
  )
}