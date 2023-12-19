import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchExercisesForUser, fetchLessonsForUser } from "../lib/data";
import { Exercise, Lesson } from "../lib/definitions";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function Dashboard() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const exercises = await fetchExercisesForUser(user.id);
  const lessons = await fetchLessonsForUser(user.id);

  function ExerciseComponent({ exercise } : { exercise: Exercise }) {
    return (
      <Link href={`/exercises/${exercise.id}`} className="row-span-5 shadow-sm flex flex-col justify-center items-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors text-center">
        <h3 className="text-xl font-bold">{exercise.tl_text}</h3>
      </Link>
    )
  }

  function NewExerciseComponent() {
    return (
      <Link href='/exercises/new' className="row-span-5 flex items-center justify-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <PlusIcon className="text-zinc-400 h-6 w-6" />
        <span className="text-zinc-400 ml-2">New exercise</span>
      </Link>
    )
  }

  function LessonComponent({ lesson } : { lesson: Lesson }) {
    return (
      <Link href={`/lessons/${lesson.id}/view`} className="row-span-5 shadow-sm justify-center flex flex-col py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <h3 className="text-xl font-bold">{lesson.title}</h3>
        <p className="text-zinc-500">{lesson.summary}</p>
      </Link>
    )
  }

  function NewLessonComponent() {
    return (
      <Link href='/lessons/new' className="row-span-5 flex items-center justify-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <PlusIcon className="text-zinc-400 h-6 w-6" />
        <span className="text-zinc-400 ml-2">New lesson</span>
      </Link>
    )
  }

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        <h1 className="text-2xl font-bold sm:col-span-2 lg:col-span-3 row-span-2 mt-4">Your exercises</h1>
        {exercises.map(exercise => <ExerciseComponent key={exercise.id} exercise={exercise} />)}
        <NewExerciseComponent key="new" />

        <h1 className="text-2xl font-bold sm:col-span-2 lg:col-span-3 row-span-2 mt-4">Your lessons</h1>
        {lessons.map(lesson => <LessonComponent key={lesson.id} lesson={lesson} />)}
        <NewLessonComponent key="new" />
      </div>
    </main>
  )
}