import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import AddOrRemoveCollectionsModal from "@/app/ui/add-or-remove-collections-modal";
import { ChevronRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function ViewLesson({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: results, error } = await supabase
    .from('lesson_with_owner_view')
    .select()
    .eq('lid', params.id);

  if (error) {
    console.error(error);
    return <></>;
  }

  const lesson = results[0];
  const user = session?.user;

  return (
    <main className="flex flex-col items-center w-screen min-h-screen p-2 md:p-6">
      <div className="flex flex-col items-center 2xl:w-3/5 gap-4 md:gap-8">
        <span className="self-start flex items-center gap-4">
          <Link href="/lessons" className="underline">
            Lessons
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span>{lesson.title}</span>
        </span>
        <div className="w-full flex flex-col md:flex-row justify-between items-center bg-stone-50 border-2 border-stone-800 rounded-xl px-6 py-4 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold ">
              {lesson.title}
            </h1>
            <p className="">{lesson.summary}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            { 
              user?.id == lesson.uid ? (
                <Link
                  href={`/lessons/${params.id}/edit`}
                  className='flex justify-center rounded-lg bg-stone-50 hover:bg-stone-200 py-2 pr-4 pl-3 transition-colors border-2 border-stone-800'
                >
                  <div className="flex items-center gap-1">
                    <PencilSquareIcon className="h-6 w-6" />
                    <span>Edit lesson</span>
                  </div>
                </Link>
              ) : ''
            }
            <AddOrRemoveCollectionsModal lid={params.id} />
          </div>
        </div>
        <div className="flex flex-col w-full bg-stone-50 px-8 py-10 lg:px-20 lg:py-24 rounded-lg border-2 border-stone-800">
          <Markdown 
            className="prose lg:prose-lg max-w-none"
            remarkPlugins={[remarkGfm]}
          >
            {lesson.body}
          </Markdown>
        </div>
      </div>
    </main>
  )
}