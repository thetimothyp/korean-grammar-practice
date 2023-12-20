'use client';

import { Lesson } from "@/app/lib/definitions";
import { useState } from "react";
import AsyncSelect from 'react-select/async';

const lessonOptionsPromise = async (query: string) => {
  const url = '/api/lessons/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((l: Lesson) => ({ value: l.id, label: l.title })));
}

type TagExerciseFormProps = {
  eid: string;
  lessons: any[];
}

export default function TagExerciseForm({ eid, lessons }: TagExerciseFormProps) {
  const defaultLessons = lessons.map(l => ({ value: l.id, label: l.title }));
  const [selectedLessonIds, setSelectedLessonIds] = useState(defaultLessons.map(l => l.value));

  function handleSubmit(e: any) {
    e.preventDefault();
    
    const promises: Promise<any>[] = [];
    
    // const submitConceptTags = async () => {
    //   const response = await fetch('/api/exercise/tag-with-concepts', {
    //     method: 'POST',
    //     body: JSON.stringify({ exerciseId: exercise.id, conceptIds: selectedConceptIds })
    //   });
    //   return response.json();
    // };

    // promises.push(submitConceptTags());

    Promise.all(promises).then(() => { alert('Success!'); });
  }

  function handleLessonSelect(selected: any) {
    setSelectedLessonIds(selected.map((item: any) => item.value));
  }

  return (
    <div className='flex flex-col bg-none w-4/5 lg:w-3/5 xl:w-2/5 justify-left gap-2 my-2'>
      <h2 className="text-lg">Which lesson concepts does this exercise practice?</h2>
      <AsyncSelect
        isMulti 
        instanceId="lesson-search" 
        defaultOptions 
        loadOptions={lessonOptionsPromise}
        defaultValue={defaultLessons}
        onChange={handleLessonSelect}
      />
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-4 rounded-lg transition-colors">
        <span className="font-bold tracking-wide text-white text-center antialiased">Save</span>
      </button>
    </div>
  )
}