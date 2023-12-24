import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
import Link from 'next/link';

// https://stackoverflow.com/a/58692591
function flattenLessons(exercise: any[]): any {
  const arrayObj = exercise.reduce((obj, row) => {
    if (row.eid in obj) {
      obj[row.eid].lessons.push({
        id: row.lid,
        title: row.lesson_title,
        summary: row.lesson_summary
      });
    } else {
      obj[row.eid] = {
        id: row.eid,
        side_b: row.side_b,
        side_a: row.side_a,
        lessons: [{
          id: row.lid,
          title: row.lesson_title,
          summary: row.lesson_summary
        }]
      };
    }
    return obj;
  }, {});
  return Object.values(arrayObj)[0];
}

export default async function Home({ params }: { params: { id: string }}) {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    const { data: exercise, error } = await supabase
      .from('exercise_with_lessons')
      .select()
      .eq('eid', params.id);

    if (error) {
      console.error('Error fetching exercise:', error);
      return <></>
    }

    const flattenedExercise = flattenLessons(exercise);
  
    return (
      <main className="h-screen w-screen">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3">
          <div className="text-3xl w-full text-center">
            <span>{flattenedExercise.side_a}</span>
          </div>
          <div className="text-2xl text-zinc-500 w-full text-center mb-8 mt-2">
            <span>{flattenedExercise.side_b}</span>
          </div>
          <h2 className="text-lg mt-4 font-bold border-b m-4 py-2">
            This exercise practices {flattenedExercise.lessons.length} lesson{flattenedExercise.lessons.length != 1 ? 's' : ''}:
          </h2>
          {flattenedExercise.lessons.map((lesson: any, index: any) => (
            <Link href={`/lessons/${lesson.id}/view`} key={index}>
              <div className='hover:bg-stone-300/30 px-4 py-2 rounded-lg transition-colors'>
                <p className='text-base text-black font-bold'>{lesson.title}</p>
                <p className='text-slate-600'>{lesson.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    )
  } catch(error: any) {
    console.log(error.message);
    if (error.message === 'Failed to fetch exercise!') {
      redirect('/exercises/1');
    }
  }
}
