'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Lesson } from "@/app/lib/definitions";
import AsyncSelect from 'react-select/async';

type EditExerciseFormProps = {
  id?: string;
  initialSideAText?: string;
  initialSideBText?: string;
  lessons?: any[];
};

const lessonOptionsPromise = async (query: string) => {
  const url = '/api/lessons/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((l: Lesson) => ({ value: l.id, label: l.title })));
}

export default function EditExerciseForm({ id, initialSideAText, initialSideBText, lessons } : EditExerciseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [sideATextError, setSideATextError] = useState(false);
  const [sideBTextError, setSideBTextError] = useState(false);
  const [lessonTagsError, setLessonTagsError] = useState(false);

  const [sideAText, setSideAText] = useState(initialSideAText || '');
  const [sideBText, setSideBText] = useState(initialSideBText || '');

  const defaultLessons = lessons ? lessons.map(l => ({ value: l.id, label: l.title })) : [];
  const [selectedLessonIds, setSelectedLessonIds] = useState(defaultLessons.map(l => l.value));

  function validate() {
    if (didSubmit) {
      if (sideBText.length == 0) {
        setSideBTextError(true);
      } else {
        setSideBTextError(false);
      }
      if (sideAText.length == 0) {
        setSideATextError(true);
      } else {
        setSideATextError(false);
      }
      if (selectedLessonIds.length == 0) {
        setLessonTagsError(true);
      } else {
        setLessonTagsError(false);
      }
    }
  }

  useEffect(validate, [sideBText, sideAText, selectedLessonIds, didSubmit]);

  function isValid() {
    return sideBText.length > 0 && sideAText.length > 0 && selectedLessonIds.length > 0;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setDidSubmit(true);
    
    if (isValid())
    {
      setIsLoading(true);
      let req;

      if (!id) {
        req = async () => {
          const response = await fetch('/api/exercises/new', {
            method: 'POST',
            body: JSON.stringify({ sideBText, sideAText, lessonIds: selectedLessonIds })
          });
          return response.json();
        };
      } else {
        req = async () => {
          const response = await fetch('/api/exercises/update', {
            method: 'POST',
            body: JSON.stringify({ id, sideBText, sideAText, lessonIds: selectedLessonIds })
          });
          return response.json();
        };
      }

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
          <label htmlFor="sideBText" className="text-sm text-zinc-400">Native language text</label>
          <input
            name='sideBText'
            value={sideBText}
            onChange={e => setSideBText(e.target.value)}
            className={`${sideBTextError ? 'bg-red-100' : ''} p-4 rounded-md mb-4 text-lg border-zinc-400/60 hover:border-zinc-400/90 transition-colors border`}
            placeholder="Enter target language text" />
          <label htmlFor="sideAText" className="text-sm text-zinc-400">Target language text</label>
          <input
            name='sideAText'
            value={sideAText}
            onChange={e => setSideAText(e.target.value)}
            className={`${sideATextError ? 'bg-red-100' : ''} p-4 rounded-md mb-4 text-lg border-zinc-400/60 hover:border-zinc-400/90 transition-colors border`}
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
            classNames={lessonTagsError ? { control: () => '!bg-red-100', container: () => '!bg-red-100' } : {}}
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