import { getCurrentUser } from "@/app/lib/session";
import EditExerciseForm from "@/app/ui/edit-exercise-form";
import { redirect } from "next/navigation";

export default async function NewExercise() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <EditExerciseForm />
    </main>
  )
}