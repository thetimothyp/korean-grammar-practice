import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchLessonsForUser } from "../lib/data";
import Link from "next/link";

export default async function Dashboard() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const lessons = await fetchLessonsForUser(user.id);
  console.log(user);
  console.log(lessons);

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
      <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-2/5 md:px-20">
        <h1 className="text-2xl">Lessons</h1>
        <ul className="flex flex-row items-center">
          {lessons.map(lesson => <div id={lesson.id.toString()}>{lesson.title}</div>)}
        </ul>
      </div>
    </main>
  )
}