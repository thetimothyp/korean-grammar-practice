import Link from "next/link";

export default function GridTileLink({ href, color, children } : { href: string, color: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`row-span-3 top-[6px] min-h-[12rem] relative hover:top-0 hover:shadow-${color} hover:cursor-pointer bg-stone-50 justify-center flex flex-col items-start py-4 px-6 border-2 border-stone-600 rounded-2xl transition-all`}>
      {children}
    </Link>
  )
}