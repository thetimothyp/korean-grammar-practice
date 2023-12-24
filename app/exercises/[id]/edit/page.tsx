import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import EditExerciseForm from "@/app/ui/edit-exercise-form";
import { redirect } from 'next/navigation';

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
        uid: row.uid,
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

export default async function EditExercise({ params }: { params: { id: string } }) {
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
  if (user?.id != flattenedExercise.uid) {
    redirect('/login');
  }
  
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <EditExerciseForm
        id={flattenedExercise.id}
        initialSideBText={flattenedExercise.side_b}
        initialSideAText={flattenedExercise.side_a}
        lessons={flattenedExercise.lessons} />
    </main>
  )
}