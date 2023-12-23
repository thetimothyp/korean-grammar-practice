'use client';

import dynamic from 'next/dynamic';
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import 'react-modern-drawer/dist/index.css'
import logoSvg from "@/public/logo.svg";

const Drawer = dynamic(
  () => import('react-modern-drawer').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function MobileNavbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState)
  }

  const activeClass = useCallback((href: string) => {
    return pathname.startsWith(href) ? 'active underline' : '';
  }, [pathname]);

  return (
    <div className='absolute left-0 top-0 py-8 px-8 md:hidden'>
      <button className='text-slate-900 opacity-70 hover:opacity-90 transition-opacity' onClick={toggleDrawer}>
        <Bars3BottomLeftIcon className='inline ml-1 h-8 w-8' />
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        enableOverlay={false}
        size={300}
        style={{
          backgroundColor: 'rgb(246, 245, 244)',
          borderRight: '2px solid rgb(41, 37, 36)',
          maxWidth: '100vw',
          overflow: 'scroll'
        }}
        className='flex flex-col py-8 px-12 !shadow-sm gap-4'
      >
        <button className="self-end" onClick={toggleDrawer}>
          <XMarkIcon className='h-8 w-8' />
        </button>
        <div className="justify-self-end">
          <ul className="flex flex-col gap-8 text-xl">
            <li className={`decoration-2 underline-offset-8 ${activeClass('/dashboard')}`}>
              <Link href='/dashboard' onClick={toggleDrawer}>Home</Link>
            </li>
            <li className={`decoration-2 underline-offset-8 ${activeClass('/collections')}`}>
              <Link href='/collections' onClick={toggleDrawer}>Collections</Link>
            </li>
            <li className={`decoration-2 underline-offset-8 ${activeClass('/lessons')}`}>
              <Link href='/lessons' onClick={toggleDrawer}>Lessons</Link>
            </li>
            <li className={`decoration-2 underline-offset-8 ${activeClass('/exercises')}`}>
              <Link href='/exercises' onClick={toggleDrawer}>Exercises</Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </div>
  )
}