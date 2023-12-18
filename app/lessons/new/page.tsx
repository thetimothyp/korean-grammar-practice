import { getCurrentUser } from "@/app/lib/session";
import EditLessonForm from "@/app/ui/edit-lesson-form";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col w-screen bg-white items-center">
      <EditLessonForm  />
    </main>
  )
}