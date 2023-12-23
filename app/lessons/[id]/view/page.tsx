import { fetchLesson } from "@/app/lib/data";
import { Lesson } from "@/app/lib/definitions";
import AddOrRemoveCollectionsModal from "@/app/ui/add-or-remove-collections-modal";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function ViewLesson({ params }: { params: { id: string } }) {
  const lesson: Lesson = await fetchLesson(params.id);

  return (
    <main className="flex flex-col items-center w-screen min-h-screen p-6">
      <div className="flex flex-col items-center 2xl:w-3/5 gap-8">
        <span className="self-start flex items-center gap-4">
          <Link href="/lessons" className="underline">
            Lessons
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span>{lesson.title}</span>
        </span>
        <div className="w-full flex justify-between items-center bg-stone-50 border-2 border-stone-800 rounded-xl px-6 py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold ">
              {lesson.title}
            </h1>
            <p className="">{lesson.summary}</p>
          </div>
          <AddOrRemoveCollectionsModal lid={params.id} />
        </div>
        <div className="flex flex-col w-full bg-stone-50 px-20 py-24 rounded-lg border-2 border-stone-800">
          <Markdown 
            className="prose lg:prose-lg max-w-none"
            remarkPlugins={[remarkGfm]}
          >
            {lesson.body}
          </Markdown>
        </div>
      </div>
    </main>
  )
}