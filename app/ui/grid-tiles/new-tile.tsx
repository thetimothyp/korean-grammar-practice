import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewTile({ href, label }: { href: string, label: string }) {
  return (
    <Link href={href} className="row-span-3 top-[6px] min-h-[12rem] relative flex items-center justify-center py-4 px-6 border border-stone-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
      <PlusIcon className="text-zinc-400 h-6 w-6" />
      <span className="text-zinc-400 ml-2">{label}</span>
    </Link>
  )
}