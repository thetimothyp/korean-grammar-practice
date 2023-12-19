import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchLessonsForUser } from "../lib/data";
import { Lesson } from "../lib/definitions";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function Dashboard() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const lessons = await fetchLessonsForUser(user.id);

  function LessonComponent({ lesson } : { lesson: Lesson }) {
    return (
      <Link href={`/lessons/${lesson.id}/view`} className="shadow-sm flex flex-col py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <h3 className="text-xl font-bold">{lesson.title}</h3>
        <p className="text-zinc-500">{lesson.summary}</p>
      </Link>
    )
  }

  function NewLessonComponent() {
    return (
      <Link href='/lessons/new' className="flex items-center justify-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <PlusIcon className="text-zinc-400 h-6 w-6" />
        <span className="text-zinc-400 ml-2">New lesson</span>
      </Link>
    )
  }

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
      <div className="flex flex-col justify-center gap-6 px-6 py-10">
        <h1 className="text-2xl font-bold">Your lessons</h1>
        <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
          {lessons.map(lesson => <LessonComponent key={lesson.id} lesson={lesson} />)}
          <NewLessonComponent key="new" />
        </div>
      </div>
    </main>
  )
}