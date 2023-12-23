import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import EditExerciseForm from "@/app/ui/edit-exercise-form";
import { redirect } from "next/navigation";

export default async function NewExercise() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <EditExerciseForm />
    </main>
  )
}