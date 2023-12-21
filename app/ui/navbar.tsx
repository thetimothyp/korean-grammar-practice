'use client';

import Image from "next/image";
import Link from "next/link";
import logoSvg from "@/public/logo.svg";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { Dropdown } from 'flowbite-react';
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const pathname = usePathname();

  const activeClass = useCallback((href: string) => {
    return pathname.startsWith(href) ? 'active underline' : '';
  }, [pathname]);


  function AccountMenu() {
    return (
      <Dropdown className="w-[200px] bg-stone-50" label="" renderTrigger={() => <UserCircleIcon className="h-10 w-10 text-stone-600 hover:cursor-pointer" />}>
        <Dropdown.Item className="px-6 py-4 hover:bg-stone-300/20 transition-colors">
          <Link href='#'>Profile</Link>
        </Dropdown.Item>
        <Dropdown.Item className="px-6 py-4 hover:bg-stone-300/20 transition-colors">
          <Link href='#'>Settings</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="px-6 py-4 hover:bg-stone-300/20 transition-colors">
          Log out
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
        <AccountMenu />
      </div>
    </nav>
  )
}