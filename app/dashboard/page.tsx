import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchLessonsForUser } from "../lib/data";
import { Lesson } from "../lib/definitions";
import Link from "next/link";

export default async function Dashboard() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const lessons = await fetchLessonsForUser(user.id);

  function LessonComponent({ lesson } : { lesson: Lesson }) {
    return (
      <Link href={`/lessons/${lesson.id}/view`} className="flex flex-col py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <h3 className="text-xl font-bold">{lesson.title}</h3>
        <p className="text-zinc-500">{lesson.summary}</p>
      </Link>
    )
  }

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
      <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-2/5 md:px-20">
        <h1 className="text-2xl">Lessons</h1>
        <ul className="flex flex-row items-center">
          {lessons.map(lesson => <LessonComponent key={lesson.id} lesson={lesson} />)}
        </ul>
      </div>
    </main>
  )
}