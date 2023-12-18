import { fetchLesson } from "@/app/lib/data";
import { Lesson } from "@/app/lib/definitions";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function ViewLesson({ params }: { params: { id: string } }) {
  const lesson: Lesson = await fetchLesson(params.id);

  return (
    <main className="flex min-h-screen flex-col w-screen items-center">
        <div className="flex flex-col border-b border-dashed py-4 text-center">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <h3 className="text-xl text-slate-900/70">{lesson.summary}</h3>
        </div>
      <div className="flex flex-col w-1/2">
        <Markdown 
          className="prose max-w-none py-8"
          remarkPlugins={[remarkGfm]}
        >
          {lesson.body}
        </Markdown>
      </div>
    </main>
  )
}