import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import LessonTile from "../ui/grid-tiles/lesson-tile";
import NewTile from "../ui/grid-tiles/new-tile";

export default async function Lessons() {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect('/login');
  }

  const { data: lessons, error } = await supabase.rpc('fetch_lessons_for_user');
  if (error) {
    console.error('Error:', error);
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 w-screen items-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-4/5 2xl:w-3/5 pb-[6px]">
        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <LightBulbIcon className="w-16 lg:w-12 h-10 text-yellow-500 inline p-2 mr-4 rounded-md bg-yellow-200" />
          Lessons
          <div className='border-t w-full ml-4' />
        </h1>
        {lessons?.map((lesson: any) => <LessonTile key={lesson.id} lesson={lesson} />)}
        <NewTile href='/lessons/new' label='New lesson' />
      </div>
    </main>
  )
}