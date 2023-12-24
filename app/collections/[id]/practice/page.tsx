import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
// import GrammarFilterDrawer from '@/app/ui/grammar-filter-drawer';
import ExerciseRunner from '@/app/ui/exercise-runner';

// https://stackoverflow.com/a/58692591
function flattenExerciseLessons(exercises: any[]) {
  const arrayObj = exercises.reduce((obj, exercise) => {
    if (exercise.eid in obj) {
      obj[exercise.eid].lessons.push({
        id: exercise.lid,
        title: exercise.lesson_title,
        summary: exercise.lesson_summary
      });
    } else {
      obj[exercise.eid] = {
        id: exercise.eid,
        side_b: exercise.side_b,
        side_a: exercise.side_a,
        lessons: [{
          id: exercise.lid,
          title: exercise.lesson_title,
          summary: exercise.lesson_summary
        }]
      };
    }
    return obj;
  }, {});
  return Object.values(arrayObj);
}

export default async function Home({ params }: { params: { id: string }}) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  
  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: exercises, error } = await supabase.rpc('fetch_exercises_for_collection', { collection_id: params.id });
    // const exercises = await fetchExercisesForCollection(params.id);

    if (error) {
      console.error(error);
      return <></>;
    }

    const flattenedExercises = flattenExerciseLessons(exercises);
  
    return (
      <main className="h-screen w-screen">
        <ExerciseRunner exercises={flattenedExercises} />
        {/* <GrammarFilterDrawer concepts={allConcepts} /> */}
      </main>
    )
  } catch(error: any) {
    console.log(error.message);
    if (error.message === 'Failed to fetch exercise!') {
      redirect('/dashboard');
    }
  }
}
