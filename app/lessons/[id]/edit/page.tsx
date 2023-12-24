import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import EditLessonForm from "@/app/ui/edit-lesson-form";
import { redirect } from "next/navigation";

export default async function EditLesson({ params }: { params: { id: string }}) {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect('/login');
  }
  const user = session.user;

  const { data: results, error } = await supabase
    .from('lesson_with_owner_view')
    .select()
    .eq('lid', params.id);

  if (error) {
    console.error(error);
    return <></>;
  }

  const lesson = results[0];

  if (user.id != lesson.uid) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col w-screen items-center">
      <EditLessonForm id={lesson.lid!} initialTitle={lesson.title} initialBody={lesson.body} initialSummary={lesson.summary} />
    </main>
  )
}