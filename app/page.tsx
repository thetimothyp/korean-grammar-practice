import {
  fetchExercises,
  fetchConceptsForExercise,
  fetchVocabForExercise
} from './lib/data';
import Accordion from './ui/accordion';

export default async function Home() {
  const exercises = await fetchExercises();
  const exercise = exercises[0];
  const concepts = await fetchConceptsForExercise(exercise);
  const vocabs = await fetchVocabForExercise(exercise);
  const vocabTip = vocabs.map(vocab => `${vocab.en_text} = ${vocab.kr_text}`).join(',');

  return (
    <main className="h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3">
        <div className="text-2xl w-full text-center">
          <span>{exercise.en_text}</span>
        </div>

        <div className="w-full text-center">
          <p className="text-slate-900 opacity-50 text-sm my-2">({vocabTip})</p>
        </div>

        <div className="flex my-4 w-full h-1/8">
          <textarea placeholder="한국어로 번역해 보세요" autoFocus className="text-lg resize-none p-4 w-full h-full outline-none rounded-lg"></textarea>
        </div>

        <div className="flex items-end justify-end w-full">
          <button className="bg-green-500 hover:bg-green-600 text-gray-900 p-2 px-4 rounded-lg transition-colors right-0">
            <span className="text-white text-center antialiased">Check Answer</span>
          </button>
        </div>

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
      </div>
    </main>
  )
}
