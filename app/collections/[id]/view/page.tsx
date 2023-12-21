import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, FolderIcon, LightBulbIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import CollectionTile from "@/app/ui/grid-tiles/collection-tile";
import LessonTile from "@/app/ui/grid-tiles/lesson-tile";
import ExerciseTile from "@/app/ui/grid-tiles/exercise-tile";
import NewTile from "@/app/ui/grid-tiles/new-tile";
import { fetchCollection, fetchLessonsForCollection } from "@/app/lib/data";

export default async function ViewCollection({ params }: { params: { id: string } }) {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }
  
  const [collection, lessons] = await Promise.all([
    fetchCollection(params.id),
    fetchLessonsForCollection(params.id)
  ]);

  const totalExercises = lessons.reduce((sum, lesson) => {
    sum += parseInt(lesson.exercise_count);
    return sum;
  }, 0);

  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col p-6 max-w-5xl items-center gap-4">
        <span className="self-start flex items-center gap-4">
          <Link href="/collections" className="underline">
            Collections
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span>{collection.name}</span>
        </span>
        <div className="w-full flex justify-between items-center bg-stone-50 border-2 border-stone-800 rounded-xl px-6 py-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold ">
              {collection.name}
            </h1>
            <p className="text-lg">{lessons.length} lesson{lessons.length != 1 ? 's' : ''}</p>
          </div>
          <Link
            href={`/collections/${params.id}/practice`}
            className='rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 p-2 px-6 transition-colors border-2 border-stone-800'
          >
            Practice this collection
          </Link>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl pb-[6px]">
          <h3 className="top-[6px] relative text-lg font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
            <LightBulbIcon className="w-12 h-10 text-yellow-500 inline p-2 mr-4 rounded-md bg-yellow-200" />
            Lessons
            <div className='border-t w-full ml-4' />
          </h3>
          {lessons.map((lesson: any) => <LessonTile key={lesson.id} lesson={lesson} />)}
        </div>
      </div>
    </main>
  )
}