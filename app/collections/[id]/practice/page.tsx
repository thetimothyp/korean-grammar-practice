import { redirect } from 'next/navigation'
import {
  fetchExercisesForCollection
} from '@/app/lib/data';
import Accordion from '@/app/ui/accordion';
import ExerciseInput from '@/app/ui/exercise-input';
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
        nl_text: exercise.nl_text,
        tl_text: exercise.tl_text,
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
  try {

    const exercises = await fetchExercisesForCollection(params.id);
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
      redirect('/exercises/1');
    }
  }
}
