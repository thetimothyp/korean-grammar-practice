'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Lesson } from "@/app/lib/definitions";
import AsyncSelect from 'react-select/async';

type EditExerciseFormProps = {
  id?: string;
  initialTlText: string;
  initialNlText: string;
  lessons: any[];
};

const lessonOptionsPromise = async (query: string) => {
  const url = '/api/lessons/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((l: Lesson) => ({ value: l.id, label: l.title })));
}

export default function EditExerciseForm({ id, initialTlText, initialNlText, lessons } : EditExerciseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [nlTextError, setNlTextError] = useState(false);
  const [tlTextError, setTlTextError] = useState(false);

  const [tlText, setTlText] = useState(initialTlText || '');
  const [nlText, setNlText] = useState(initialNlText || '');

  const defaultLessons = lessons.map(l => ({ value: l.id, label: l.title }));
  const [selectedLessonIds, setSelectedLessonIds] = useState(defaultLessons.map(l => l.value));

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

  function handleLessonSelect(selected: any) {
    setSelectedLessonIds(selected.map((item: any) => item.value));
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <form className='flex flex-col bg-none w-4/5 lg:w-3/5 xl:w-2/5 justify-left gap-2 my-2' onSubmit={handleSubmit}>
          <h1 className="text-xl">{!id ? 'Create a new exercise' : 'Edit exercise'}</h1>
          <label htmlFor="nlText" className="text-sm text-zinc-400">Native language text</label>
          <input
            name='nlText'
            value={nlText}
            onChange={e => setNlText(e.target.value)}
            className={`${nlTextError ? 'bg-red-100' : ''} p-4 rounded-md mb-4 text-lg border-zinc-400/60 hover:border-zinc-400/90 transition-colors border`}
            placeholder="Enter target language text" />
          <label htmlFor="tlText" className="text-sm text-zinc-400">Target language text</label>
          <input
            name='tlText'
            value={tlText}
            onChange={e => setTlText(e.target.value)}
            className={`${tlTextError ? 'bg-red-100' : ''} p-4 rounded-md mb-4 text-lg border-zinc-400/60 hover:border-zinc-400/90 transition-colors border`}
            placeholder="Enter native language text" />

          <label htmlFor="lessons" className="text-sm text-zinc-400">Which lesson concepts does this exercise practice?</label>
          <AsyncSelect
            isMulti 
            name='lessons'
            instanceId="lesson-search" 
            defaultOptions 
            loadOptions={lessonOptionsPromise}
            defaultValue={defaultLessons}
            onChange={handleLessonSelect}
          />
          <button className="bg-green-500 hover:bg-green-600 lg:w-1/5 self-end shadow-sm p-2 px-4 rounded-lg transition-colors relative mt-4">
            <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} w-full h-full rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit transition-opacity`}>
              <div className="mt-2 animate-spin inline-block w-6 h-6 border-[2px] border-white border-opacity-70 border-t-transparent rounded-full" role="status" aria-label="loading" />
            </div>
            <span className="font-bold tracking-wide text-white text-center antialiased">Save</span>
          </button>
      </form>
    </div>
  )
}