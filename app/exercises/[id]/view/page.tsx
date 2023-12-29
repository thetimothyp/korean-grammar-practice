import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
import ExerciseRunner from '@/app/ui/exercise-runner';

type Lesson = {
  id: string;
  title: string;
};

type RunnableExercise = {
  id: string;
  side_a: string;
  side_b: string;
  lessons: Lesson[];
};

type RunnableExerciseSet = {
  title: string;
  exercises: RunnableExercise[];
};

export default async function Home({ params }: { params: { id: string }}) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  try {
    const { data: exerciseSets, error } = await supabase
      .rpc('get_runnable_exercise_sets', { p_exerciseset_ids: [params.id] });
    console.log(JSON.stringify(exerciseSets, null, 2));

    if (error) {
      console.error('Error fetching exercise set:', error);
      return <></>
    }
  
    return (
      <main className="h-screen w-screen">
        {/* TODO ExerciseViewer instead of ExerciseRunner */}
        <ExerciseRunner exercises={exerciseSets[0].exercises} />
      </main>
    )
  } catch(error: any) {
    console.log(error.message);
    if (error.message === 'Failed to fetch exercise!') {
      redirect('/');
    }
  }
}
