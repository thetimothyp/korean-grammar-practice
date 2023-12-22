import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchExercisesForUser } from "../lib/data";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import ExerciseTile from "@/app/ui/grid-tiles/exercise-tile";
import NewTile from "@/app/ui/grid-tiles/new-tile";

export default async function Exercises() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const exercises = await fetchExercisesForUser(user.id);

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