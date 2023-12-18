import { getCurrentUser } from "@/app/lib/session";
import NewLessonForm from "@/app/ui/new-lesson-form";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col w-screen bg-white items-center">
      <NewLessonForm uid={user.id} />
    </main>
  )
}