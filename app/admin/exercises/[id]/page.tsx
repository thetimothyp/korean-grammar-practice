import { fetchConceptsForExercise, fetchExercise, fetchVocabForExercise } from "@/app/lib/data";
import ExerciseSearch from "@/app/ui/admin/exercise-search";
import TagExerciseForm from "@/app/ui/admin/tag-exercise-form";

export default async function TagExercise({ params }: { params: { id: number }}) {
  try {
    const exercise = await fetchExercise(params.id);
    const concepts = await fetchConceptsForExercise(exercise);
    const vocabs = await fetchVocabForExercise(exercise);
  
    return (
      <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
        <div className="flex flex-col justify-center gap-2 px-6 py-10 md:w-2/5 md:px-20">
          <ExerciseSearch />
          <h1 className="mt-8 text-lg text-slate-900 opacity-50">Exercise #{exercise.id}</h1>
          <p className="text-xl">{exercise.en_text}</p>
          <p className="text-md mb-8">{exercise.kr_text}</p>
          <TagExerciseForm exercise={exercise} concepts={concepts} vocabs={vocabs} />
        </div>
      </main>
    )
  } catch(error: any) {
    console.log(error.message);
  }
}