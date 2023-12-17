import NewExerciseForm from "@/app/ui/admin/new-exercise-form";
import NewConceptForm from "../../ui/admin/new-concept-form";
import NewVocabForm from "@/app/ui/admin/new-vocab-form";
import ExerciseSearch from "@/app/ui/admin/exercise-search";
import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function Admin() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
      <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-2/5 md:px-20">
        {/* <ExerciseSearch />
        <NewConceptForm />
        <NewExerciseForm />
        <NewVocabForm /> */}
      </div>
    </main>
  )
}