'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

type EditExerciseFormProps = {
  id?: string;
  initialTlText: string;
  initialNlText: string;
};

export default function EditExerciseForm({ id, initialTlText, initialNlText } : EditExerciseFormProps) {
  const [tlText, setTlText] = useState(initialTlText || '');
  const [nlText, setNlText] = useState(initialNlText || '');
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    
    const req = async () => {
      const response = await fetch('/api/exercises/update', {
        method: 'POST',
        body: JSON.stringify({ id, nlText, tlText })
      });
      return response.json();
    };
    req().then((res) => { router.push(`/exercises/${res.id}/view`) });
  }

  return (
    <form className='flex flex-col bg-none w-4/5 lg:w-3/5 xl:w-2/5 justify-left gap-2 my-2' onSubmit={handleSubmit}>
        <h1 className="text-xl">{!id ? 'Create a new exercise' : 'Edit exercise'}</h1>
        <label htmlFor="nlText" className="text-sm text-zinc-400">Native language text</label>
        <input
          name='nlText'
          value={nlText}
          onChange={e => setNlText(e.target.value)}
          className="p-4 rounded-lg mb-4 text-lg"
          placeholder="Enter target language text" />
        <label htmlFor="tlText" className="text-sm text-zinc-400">Target language text</label>
        <input
          name='tlText'
          value={tlText}
          onChange={e => setTlText(e.target.value)}
          className="p-4 rounded-lg mb-2 text-lg"
          placeholder="Enter native language text" />
        <button className="bg-green-500 hover:bg-green-600 lg:w-1/5 self-end shadow-sm p-2 px-4 rounded-lg transition-colors">
          <span className="font-bold tracking-wide text-white text-center antialiased">Save</span>
        </button>
    </form>
  )
}