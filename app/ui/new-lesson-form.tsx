'use client';

import { useRef, useState } from "react";
import { ForwardRefEditor } from "./MDXEditor/ForwardRefEditor";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css';

export default function NewLessonForm({ uid }: { uid: string }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const ref = useRef<MDXEditorMethods>(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    
    const req = async () => {
      const response = await fetch('/api/exercise/new', {
        method: 'POST',
        body: JSON.stringify({ title, summary })
      });
      return response.json();
    };
    req().then(() => { alert('Success!'); });
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 w-full md:w-4/5 xl:w-3/5">
      <div className='flex w-full justify-between items-center border-b border-dashed py-4'>
        <div className='flex flex-col w-4/5 justify-left'>
          <input name='title' value={title} onChange={e => setTitle(e.target.value)} className="bg-transparent px-1 text-3xl focus:outline-none font-bold" placeholder="Untitled"></input>
          <input name='summary' onChange={e => setSummary(e.target.value)} className="bg-transparent px-1 text-lg focus:outline-none" placeholder="Enter lesson summary..."></input>
        </div>
        <button className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-6 rounded-lg transition-colors">
          <span className="font-bold tracking-wide text-white text-center antialiased">Save</span>
        </button>
      </div>
      <div className='w-full py-6'>
        <ForwardRefEditor placeholder="Write something!" className="max-w-none prose" ref={ref} markdown='' />
      </div>
    </div>
  )
}