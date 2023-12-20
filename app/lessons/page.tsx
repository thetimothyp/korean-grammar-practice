import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchLessonsForUser } from "../lib/data";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import LessonTile from "../ui/grid-tiles/lesson-tile";
import NewTile from "../ui/grid-tiles/new-tile";

export default async function Lessons() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const lessons = await fetchLessonsForUser(user.id);

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen items-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl pb-[6px]">
        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <LightBulbIcon className="w-12 h-10 text-yellow-500 inline p-2 mr-4 rounded-md bg-yellow-200" />
          Lessons
          <div className='border-t w-full ml-4' />
        </h1>
        {lessons.map((lesson: any) => <LessonTile key={lesson.id} lesson={lesson} />)}
        <NewTile href='/lessons/new' label='New lesson' />
      </div>
    </main>
  )
}