'use client';

import Image from "next/image";
import Link from "next/link";
import logoSvg from "@/public/logo.svg";
import { useCallback } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const activeClass = useCallback((href: string) => {
    return pathname.startsWith(href) ? 'active underline' : '';
  }, [pathname]);

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
                <Link href='/'>Home</Link>
              </li>
              <li className={`hover:underline decoration-2 underline-offset-8 ${activeClass('/collections')}`}>
                <Link href='/'>Collections</Link>
              </li>
              <li className={`hover:underline decoration-2 underline-offset-8 ${activeClass('/lessons')}`}>
                <Link href='/lessons'>Lessons</Link>
              </li>
              <li className={`hover:underline decoration-2 underline-offset-8 ${activeClass('/exercises')}`}>
                <Link href='/'>Exercises</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}