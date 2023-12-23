import { fetchLesson } from "@/app/lib/data";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import EditLessonForm from "@/app/ui/edit-lesson-form";
import { redirect } from "next/navigation";

export default async function EditLesson({ params }: { params: { id: string }}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect('/login');
  }
  const user = session.user;

  const lesson = await fetchLesson(params.id);

  if (user.id == lesson.user_id) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col w-screen items-center">
      <EditLessonForm id={lesson.id} initialTitle={lesson.title} initialBody={lesson.body} initialSummary={lesson.summary} />
    </main>
  )
}