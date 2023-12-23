import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import EditLessonForm from "@/app/ui/edit-lesson-form";
import { redirect } from "next/navigation";

export default async function NewLesson() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect('/login');
  }
  const user = session.user;

  return (
    <main className="flex min-h-screen flex-col w-screen items-center">
      <EditLessonForm  />
    </main>
  )
}