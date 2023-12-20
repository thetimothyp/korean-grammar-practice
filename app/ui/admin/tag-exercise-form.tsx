'use client';

import { Concept, Exercise } from "@/app/lib/definitions";
import { useState } from "react";
import AsyncSelect from 'react-select/async';

const grammarOptionsPromise = async (query: string) => {
  const url = '/api/grammar/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((c: Concept) => ({ value: c.id, label: c.text })));
}

type TagExerciseFormProps = {
  exercise: Exercise;
  concepts: Concept[];
}

export default function TagExerciseForm({ exercise, concepts }: TagExerciseFormProps) {
  const defaultConcepts = concepts.map(c => ({ value: c.id, label: c.text }));

  const [selectedConceptIds, setSelectedConceptIds] = useState(defaultConcepts.map(c => c.value));

  function handleSubmit(e: any) {
    e.preventDefault();
    
    const promises: Promise<any>[] = [];
    
    const submitConceptTags = async () => {
      const response = await fetch('/api/exercise/tag-with-concepts', {
        method: 'POST',
        body: JSON.stringify({ exerciseId: exercise.id, conceptIds: selectedConceptIds })
      });
      return response.json();
    };

    promises.push(submitConceptTags());

    Promise.all(promises).then(() => { alert('Success!'); });
  }

  function handleConceptsSelect(selected: any) {
    setSelectedConceptIds(selected.map((item: any) => item.value));
  }

  return (
    <div className='flex flex-col bg-none w-full justify-left gap-2'>
      <h1 className="text-lg text-slate-900 opacity-50">Edit exercise tags</h1>
      <h2 className="text-lg">Grammar concepts</h2>
      <AsyncSelect
        isMulti 
        instanceId="grammar-concepts-search" 
        defaultOptions 
        loadOptions={grammarOptionsPromise}
        defaultValue={defaultConcepts}
        onChange={handleConceptsSelect}
      />
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-4 rounded-lg transition-colors">
        <span className="font-bold tracking-wide text-white text-center antialiased">Submit</span>
      </button>
    </div>
  )
}