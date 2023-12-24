import Link from "next/link";

export default function GridTileLink({ href, color, children } : { href: string, color: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      // Tailwind won't include custom class names in the build
      // unless the class name is in the code in its entirety:
      // https://stackoverflow.com/a/68020542 

      // hover:shadow-green hover:shadow-yellow hover:shadow-purple
      className={`row-span-3 top-[6px] min-h-[12rem] relative hover:top-0 hover:shadow-${color} hover:cursor-pointer bg-stone-50 justify-between flex flex-col items-start py-6 px-6 border-2 border-stone-600 rounded-2xl transition-all`}>
      {children}
    </Link>
  )
}