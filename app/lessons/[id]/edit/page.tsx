import { fetchLesson } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import EditLessonForm from "@/app/ui/edit-lesson-form";
import { redirect } from "next/navigation";

export default async function EditLesson({ params }: { params: { id: string }}) {
  const user: any = await getCurrentUser();
  const lesson = await fetchLesson(params.id);

  if (!user?.id == lesson.user_id) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col w-screen items-center">
      <EditLessonForm id={lesson.id} initialTitle={lesson.title} initialBody={lesson.body} initialSummary={lesson.summary} />
    </main>
  )
}