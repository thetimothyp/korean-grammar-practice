import { redirect } from 'next/navigation'
import {
  fetchConceptsForExercise,
  fetchVocabForExercise,
  fetchExercise,
  fetchConcepts
} from '../../lib/data';
import Accordion from '../../ui/accordion';
import ExerciseInput from '@/app/ui/exercise-input';
import GrammarFilterDrawer from '@/app/ui/grammar-filter-drawer';

export default async function Home({ params }: { params: { id: string }}) {
  try {
    const exercise = await fetchExercise(params.id);
    // const concepts = await fetchConceptsForExercise(exercise);
    // const allConcepts = await fetchConcepts();
    // const vocabs = await fetchVocabForExercise(exercise);
    // const vocabTip = vocabs.map(vocab => `${vocab.en_text} = ${vocab.kr_text}`).join(', ');
  
    return (
      <main className="h-screen w-screen">
        {/* <GrammarFilterDrawer concepts={allConcepts} /> */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3">
          <div className="text-2xl w-full text-center">
            <span>{exercise.nl_text}</span>
          </div>
  
          {/* {vocabs.length > 0 ? (
            <div className="w-full text-center">
              <p className="text-slate-900 opacity-50 text-sm my-2">({vocabTip})</p>
            </div>
          ) : ''
          } */}
  
          <ExerciseInput answer={exercise.tl_text} id={params.id} />
  
          <div className="flex my-4 w-full">
            <Accordion>
                {/* {concepts.map((concept, index) => (
                  <div className='mb-4' key={index}>
                    <p className='text-base text-black font-bold'>{concept.text}</p>
                    <p className='text-slate-600'>{concept.explanation}</p>
                  </div>
                ))} */}
            </Accordion>
          </div>
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
