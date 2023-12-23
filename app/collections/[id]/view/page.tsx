import { getCurrentUser } from "@/app/lib/session";
import Link from "next/link";
import { ChevronRightIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import LessonTile from "@/app/ui/grid-tiles/lesson-tile";
import { fetchCollection, fetchLessonsForCollection } from "@/app/lib/data";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export default async function ViewCollection({ params }: { params: { id: string } }) {
  const user: any = await getCurrentUser();
  
  const [collection, lessons] = await Promise.all([
    fetchCollection(params.id),
    fetchLessonsForCollection(params.id)
  ]);

  return (
    <main className="flex flex-col items-center w-screen min-h-screen p-6">
      <div className="flex flex-col items-center 2xl:w-3/5 gap-4">
        <span className="self-start flex items-center gap-4">
          <Link href="/collections" className="underline">
            Collections
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span>{collection.name}</span>
        </span>
        <div className="w-full flex flex-col md:flex-row justify-between items-center bg-stone-50 border-2 border-stone-800 rounded-xl px-6 py-4 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold ">
              {collection.name}
            </h1>
            <p className="text-lg">{lessons.length} lesson{lessons.length != 1 ? 's' : ''}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            { 
              user?.id == collection.user_id ? (
                <Link
                  href={`/collections/${params.id}/edit`}
                  className='flex justify-center rounded-lg bg-stone-50 hover:bg-stone-200 py-2 pr-4 pl-3 transition-colors border-2 border-stone-800'
                >
                  <div className="flex items-center gap-1">
                    <PencilSquareIcon className="h-6 w-6" />
                    <span>Edit collection</span>
                  </div>
                </Link>
              ) : ''
            }
            
            <Link
              href={`/collections/${params.id}/practice`}
              className='rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 p-2 px-6 transition-colors border-2 border-stone-800'
            >
              Practice this collection
            </Link>
          </div>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full pb-[6px]">
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