import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, LightBulbIcon, EyeIcon } from "@heroicons/react/24/outline";
import LessonTile from "@/app/ui/grid-tiles/lesson-tile";
import AddOrRemoveLessonsModal from "@/app/ui/add-or-remove-lessons-modal";

export default async function EditCollection({ params }: { params: { id: string } }) {
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

  const { data: results, error } = await supabase
    .from('collection_with_owner_view')
    .select()
    .eq('cid', params.id);

  if (error) {
    console.error('Error fetching collection:', error);
    return <></>
  }
  const collection = results[0];
  
  if (user.id != collection.uid) {
    redirect('/login');
  }

  const { data: lessons, error: fetchLessonsError } = await supabase.rpc('fetch_lessons_for_collection', { cid: params.id });
  if (fetchLessonsError) {
    console.error('Error fetching lessons:', fetchLessonsError);
    return <></>
  }


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
            <Link
              href={`/collections/${params.id}/view`}
              className='flex justify-center rounded-lg bg-stone-50 hover:bg-stone-200 py-2 px-4 transition-colors border-2 border-stone-800'
            >
              View collection
            </Link>
            <AddOrRemoveLessonsModal selectedLessons={lessons} cid={params.id} />
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