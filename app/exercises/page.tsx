import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import ExerciseTile from "@/app/ui/grid-tiles/exercise-tile";
import NewTile from "@/app/ui/grid-tiles/new-tile";

export default async function Exercises() {
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

  const { data: exercises, error } = await supabase.rpc('fetch_exercises_for_user');
  if (error) {
    console.error(error);
    return <></>
  }

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen items-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:w-3/5 pb-[6px]">
        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <PuzzlePieceIcon className="w-12 h-10 text-green-500 inline p-2 mr-4 rounded-md bg-green-200" />
          Exercises
          <div className='border-t w-full ml-4' />
        </h1>
        {exercises.map((exercise: any) => <ExerciseTile key={exercise.id} exercise={exercise} />)}
        <NewTile href='/exercises/new' label='New exercise' />
      </div>
    </main>
  )
}