import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchCollectionsForUser, fetchExercisesForUser, fetchLessonsForUser } from "../lib/data";
import Link from "next/link";
import { PlusIcon, FolderIcon, LightBulbIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";

export default async function Dashboard() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const [exercises, lessons, collections] = await Promise.all([
    fetchExercisesForUser(user.id),
    fetchLessonsForUser(user.id),
    fetchCollectionsForUser(user.id)
  ]);

  function CollectionComponent({ collection } : { collection: { id: string, name: string, lesson_count: number }}) {
    return (
      <Link href={`/collections/${collection.id}/view`} className="row-span-3 shadow-sm justify-center flex flex-col items-start py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <h3 className="text-xl font-bold">{collection.name}</h3>
        <p className="text-sm text-zinc-400">{collection.lesson_count} lesson{collection.lesson_count != 1 ? 's' : ''}</p>
      </Link>
    )
  }

  function NewCollectionComponent() {
    return (
      <Link href='/collections/new' className="row-span-3 flex items-center justify-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <PlusIcon className="text-zinc-400 h-6 w-6" />
        <span className="text-zinc-400 ml-2">New collection</span>
      </Link>
    )
  }

  function LessonComponent({ lesson } : { lesson: { id: string, title: string, summary: string, exercise_count: number } }) {
    return (
      <Link href={`/lessons/${lesson.id}/view`} className="row-span-3 shadow-sm justify-center flex flex-col py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <h3 className="text-xl font-bold">{lesson.title}</h3>
        <p className="text-zinc-500">{lesson.summary}</p>
        <p className="text-sm mt-1 text-zinc-400">{lesson.exercise_count} exercise{lesson.exercise_count != 1 ? 's' : ''}</p>
      </Link>
    )
  }

  function NewLessonComponent() {
    return (
      <Link href='/lessons/new' className="row-span-3 flex items-center justify-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <PlusIcon className="text-zinc-400 h-6 w-6" />
        <span className="text-zinc-400 ml-2">New lesson</span>
      </Link>
    )
  }

  function ExerciseComponent({ exercise } : { exercise: { id: string, tl_text: string, lesson_count: number } }) {
    return (
      <Link href={`/exercises/${exercise.id}/view`} className="row-span-3 shadow-sm flex flex-col justify-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <h3 className="text-xl font-bold">{exercise.tl_text}</h3>
        <p className="text-sm text-zinc-400">{exercise.lesson_count} lesson{exercise.lesson_count != 1 ? 's' : ''}</p>
      </Link>
    )
  }

  function NewExerciseComponent() {
    return (
      <Link href='/exercises/new' className="row-span-3 flex items-center justify-center py-4 px-6 border border-zinc-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors">
        <PlusIcon className="text-zinc-400 h-6 w-6" />
        <span className="text-zinc-400 ml-2">New exercise</span>
      </Link>
    )
  }

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        <h1 className="text-2xl font-bold sm:col-span-2 lg:col-span-3 row-span-2 mt-4 flex items-center">
          <FolderIcon className="w-12 h-10 text-purple-500 inline p-2 mr-4 rounded-md bg-purple-200" />
          Collections
          <div className='border-t w-full ml-4' />
        </h1>
        {collections.map((collection: any) => <CollectionComponent key={collection.id} collection={collection} />)}
        <NewCollectionComponent />
        <Link className="sm:col-span-2 lg:col-span-3 flex justify-center p-2 bg-stone-300/20 hover:bg-purple-300/30 rounded-lg transition-colors" href='#'>
          <span className="text-lg font-bold">View all collections</span>
        </Link>

        <h1 className="text-2xl font-bold sm:col-span-2 lg:col-span-3 row-span-2 mt-6 flex items-center">
          <LightBulbIcon className="w-12 h-10 text-yellow-500 inline p-2 mr-4 rounded-md bg-yellow-200" />
          Lessons
          <div className='border-t w-full ml-4' />
        </h1>
        {lessons.map((lesson: any) => <LessonComponent key={lesson.id} lesson={lesson} />)}
        <NewLessonComponent />
        <Link className="sm:col-span-2 lg:col-span-3 flex justify-center p-2 bg-stone-300/20 hover:bg-yellow-300/30 rounded-lg transition-colors" href='#'>
          <span className="text-lg font-bold">View all lessons</span>
        </Link>

        <h1 className="text-2xl font-bold sm:col-span-2 lg:col-span-3 row-span-2 mt-6 flex items-center">
          <PuzzlePieceIcon className="w-12 h-10 text-green-500 inline p-2 mr-4 rounded-md bg-green-200" />
          Exercises
          <div className='border-t w-full ml-4' />
        </h1>
        {exercises.map((exercise: any) => <ExerciseComponent key={exercise.id} exercise={exercise} />)}
        <NewExerciseComponent />
        <Link className="sm:col-span-2 lg:col-span-3 flex justify-center p-2 bg-stone-300/20 hover:bg-green-300/30 rounded-lg transition-colors" href='#'>
          <span className="text-lg font-bold">View all exercises</span>
        </Link>
      </div>
    </main>
  )
}