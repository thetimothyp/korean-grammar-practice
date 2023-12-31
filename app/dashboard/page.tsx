import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderIcon, LightBulbIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import CollectionTile from "@/app/ui/grid-tiles/collection-tile";
import LessonTile from "@/app/ui/grid-tiles/lesson-tile";
import ExerciseSetTile from "@/app/ui/grid-tiles/exercise-set-tile";
import NewTile from "@/app/ui/grid-tiles/new-tile";
import CreateCollectionModal from "../ui/create-collection-modal";

export default async function Dashboard() {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect('/login');
  }
  const user = session.user;

  const [{ data: collections }, { data: lessons }, { data: exerciseSets, error }] = await Promise.all([
    supabase.rpc('fetch_collections_for_user'),
    supabase.rpc('fetch_lessons_for_user'),
    supabase.rpc('fetch_exercisesets_for_user'),
  ]);

  console.log(exerciseSets);
  console.log(error);

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 w-screen items-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-4/5 2xl:w-3/5 pb-[6px]">
        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <FolderIcon className="w-12 h-10 text-purple-500 inline p-2 mr-4 rounded-md bg-purple-200" />
          Collections
        </h1>
        {collections?.map((collection: any) => <CollectionTile key={collection.id} collection={collection} />)}
        <CreateCollectionModal />
        <Link className="top-[6px] relative sm:col-span-2 lg:col-span-3 flex justify-center items-center bg-stone-300/20 hover:bg-purple-300/50 rounded-lg transition-colors" href='/collections'>
          <span className="text-lg font-bold">View all collections</span>
        </Link>

        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <LightBulbIcon className="w-12 h-10 text-yellow-500 inline p-2 mr-4 rounded-md bg-yellow-200" />
          Lessons
        </h1>
        {lessons?.map((lesson: any) => <LessonTile key={lesson.id} lesson={lesson} />)}
        <NewTile href='/lessons/new' label='New lesson' />
        <Link className="top-[6px] relative sm:col-span-2 lg:col-span-3 flex justify-center items-center bg-stone-300/20 hover:bg-yellow-300/50 rounded-lg transition-colors" href='/lessons'>
          <span className="text-lg font-bold">View all lessons</span>
        </Link>

        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <PuzzlePieceIcon className="w-12 h-10 text-green-500 inline p-2 mr-4 rounded-md bg-green-200" />
          Exercise sets
        </h1>
        {exerciseSets?.map((exerciseSet: any) => <ExerciseSetTile key={exerciseSet.id} exerciseSet={exerciseSet} />)}
        <NewTile href='/exercises/new' label='New exercise set' />
        <Link className="top-[6px] relative sm:col-span-2 lg:col-span-3 flex justify-center items-center bg-stone-300/20 hover:bg-green-300/50 rounded-lg transition-colors" href='/exercises'>
          <span className="text-lg font-bold">View all exercises</span>
        </Link>
      </div>
    </main>
  )
}