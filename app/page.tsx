import {
  fetchExercises,
  fetchConceptsForExercise
} from './lib/data';

export default async function Home() {
  const exercises = await fetchExercises();
  const exercise = exercises[0];
  const concepts = await fetchConceptsForExercise(exercise);
  console.log(concepts);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="text-2xl">
        <span>{exercise.en_text}</span>
      </div>

      <div className="flex m-4 w-1/3 h-1/8">
        <textarea placeholder="한국어로 번역해 보세요" autoFocus className="text-lg resize-none p-4 w-full h-full outline-none rounded-lg"></textarea>
      </div>

      <div className="flex items-end justify-end w-1/3">
        <button className="bg-green-500 hover:bg-green-600 text-gray-900 p-2 px-4 rounded-lg transition-colors right-0">
          <span className="text-white text-center antialiased">Check Answer</span>
        </button>
      </div>

      <div className="flex m-4 w-1/3">

      </div>
    </main>
  )
}
