'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EditExerciseFormProps = {
  id?: string;
  initialTlText: string;
  initialNlText: string;
};

export default function EditExerciseForm({ id, initialTlText, initialNlText } : EditExerciseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [nlTextError, setNlTextError] = useState(false);
  const [tlTextError, setTlTextError] = useState(false);

  const [tlText, setTlText] = useState(initialTlText || '');
  const [nlText, setNlText] = useState(initialNlText || '');

  function validate() {
    if (didSubmit) {
      if (nlText.length == 0) {
        setNlTextError(true);
      } else {
        setNlTextError(false);
      }
      if (tlText.length == 0) {
        setTlTextError(true);
      } else {
        setTlTextError(false);
      }
    }
  }

  useEffect(validate, [nlText, tlText, didSubmit]);

  function isValid() {
    return nlText.length > 0 && tlText.length > 0;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setDidSubmit(true);
    
    if (isValid())
    {
      setIsLoading(true);
      const req = async () => {
        const response = await fetch('/api/exercises/update', {
          method: 'POST',
          body: JSON.stringify({ id, nlText, tlText })
        });
        return response.json();
      };
      req().then((res) => { router.push(`/exercises/${res.id}/view`) });
    }
  }

  return (
    <form className='flex flex-col bg-none w-4/5 lg:w-3/5 xl:w-2/5 justify-left gap-2 my-2' onSubmit={handleSubmit}>
        <h1 className="text-xl">{!id ? 'Create a new exercise' : 'Edit exercise'}</h1>
        <label htmlFor="nlText" className="text-sm text-zinc-400">Native language text</label>
        <input
          name='nlText'
          value={nlText}
          onChange={e => setNlText(e.target.value)}
          className={`${nlTextError ? 'bg-red-100' : ''} p-4 rounded-lg mb-4 text-lg`}
          placeholder="Enter target language text" />
        <label htmlFor="tlText" className="text-sm text-zinc-400">Target language text</label>
        <input
          name='tlText'
          value={tlText}
          onChange={e => setTlText(e.target.value)}
          className={`${tlTextError ? 'bg-red-100' : ''} p-4 rounded-lg mb-4 text-lg`}
          placeholder="Enter native language text" />
        <button className="bg-green-500 hover:bg-green-600 lg:w-1/5 self-end shadow-sm p-2 px-4 rounded-lg transition-colors relative">
          <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} w-full h-full rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit transition-opacity`}>
            <div className="mt-2 animate-spin inline-block w-6 h-6 border-[2px] border-white border-opacity-70 border-t-transparent rounded-full" role="status" aria-label="loading" />
          </div>
          <span className="font-bold tracking-wide text-white text-center antialiased">Save</span>
        </button>
    </form>
  )
}