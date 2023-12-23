import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { fetchCollectionsForUser, fetchExercisesForUser, fetchLessonsForUser } from "../lib/data";
import Link from "next/link";
import { FolderIcon, LightBulbIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import CollectionTile from "@/app/ui/grid-tiles/collection-tile";
import LessonTile from "@/app/ui/grid-tiles/lesson-tile";
import ExerciseTile from "@/app/ui/grid-tiles/exercise-tile";
import NewTile from "@/app/ui/grid-tiles/new-tile";
import CreateCollectionModal from "../ui/create-collection-modal";

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect('/login');
  }
  const user = session.user;

  const [exercises, lessons, collections] = await Promise.all([
    fetchExercisesForUser(user.id),
    fetchLessonsForUser(user.id),
    fetchCollectionsForUser(user.id, 5)
  ]);

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen items-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:w-3/5 pb-[6px]">
        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <FolderIcon className="w-12 h-10 text-purple-500 inline p-2 mr-4 rounded-md bg-purple-200" />
          Collections
          <div className='border-t w-full ml-4' />
        </h1>
        {collections.map((collection: any) => <CollectionTile key={collection.id} collection={collection} />)}
        <CreateCollectionModal />
        <Link className="top-[6px] relative sm:col-span-2 lg:col-span-3 flex justify-center items-center bg-stone-300/20 hover:bg-purple-300/50 rounded-lg transition-colors" href='/collections'>
          <span className="text-lg font-bold">View all collections</span>
        </Link>

        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <LightBulbIcon className="w-12 h-10 text-yellow-500 inline p-2 mr-4 rounded-md bg-yellow-200" />
          Lessons
          <div className='border-t w-full ml-4' />
        </h1>
        {lessons.map((lesson: any) => <LessonTile key={lesson.id} lesson={lesson} />)}
        <NewTile href='/lessons/new' label='New lesson' />
        <Link className="top-[6px] relative sm:col-span-2 lg:col-span-3 flex justify-center items-center bg-stone-300/20 hover:bg-yellow-300/50 rounded-lg transition-colors" href='/lessons'>
          <span className="text-lg font-bold">View all lessons</span>
        </Link>

        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <PuzzlePieceIcon className="w-12 h-10 text-green-500 inline p-2 mr-4 rounded-md bg-green-200" />
          Exercises
          <div className='border-t w-full ml-4' />
        </h1>
        {exercises.map((exercise: any) => <ExerciseTile key={exercise.id} exercise={exercise} />)}
        <NewTile href='/exercises/new' label='New exercise' />
        <Link className="top-[6px] relative sm:col-span-2 lg:col-span-3 flex justify-center items-center bg-stone-300/20 hover:bg-green-300/50 rounded-lg transition-colors" href='/exercises'>
          <span className="text-lg font-bold">View all exercises</span>
        </Link>
      </div>
    </main>
  )
}