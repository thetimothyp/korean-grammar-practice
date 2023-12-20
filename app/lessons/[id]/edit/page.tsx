import { fetchLesson } from "@/app/lib/data";
import { Lesson } from "@/app/lib/definitions";
import { getCurrentUser } from "@/app/lib/session";
import EditLessonForm from "@/app/ui/edit-lesson-form";
import { redirect } from "next/navigation";

export default async function EditLesson({ params }: { params: { id: string }}) {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const lesson: Lesson = await fetchLesson(params.id);

  return (
    <main className="flex min-h-screen flex-col w-screen items-center">
      <EditLessonForm id={lesson.id} initialTitle={lesson.title} initialBody={lesson.body} initialSummary={lesson.summary} />
    </main>
  )
}