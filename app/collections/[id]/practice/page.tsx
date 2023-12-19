import { redirect } from 'next/navigation'
import {
  fetchExercisesForCollection
} from '@/app/lib/data';
import Accordion from '@/app/ui/accordion';
import ExerciseInput from '@/app/ui/exercise-input';
import GrammarFilterDrawer from '@/app/ui/grammar-filter-drawer';

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
    // const concepts = await fetchConceptsForExercise(exercise);
    // const allConcepts = await fetchConcepts();
  
    return (
      <main className="h-screen w-screen">
        {/* <GrammarFilterDrawer concepts={allConcepts} /> */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3">
          <div className="text-2xl w-full text-center">
            <span>{exercise.nl_text}</span>
          </div>
  
          <ExerciseInput answer={exercise.tl_text} id={params.id} />
  
          <div className="flex my-4 w-full">
            <Accordion>
                {concepts.map((concept, index) => (
                  <div className='mb-4' key={index}>
                    <p className='text-base text-black font-bold'>{concept.text}</p>
                    <p className='text-slate-600'>{concept.explanation}</p>
                  </div>
                ))}
            </Accordion>
          </div>
        </div> */}
      </main>
    )
  } catch(error: any) {
    console.log(error.message);
    if (error.message === 'Failed to fetch exercise!') {
      redirect('/exercises/1');
    }
  }
}
