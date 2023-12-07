'use client';

import { Concept, Exercise, Vocab } from "@/app/lib/definitions";
import { useState } from "react";
import AsyncSelect from 'react-select/async';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const promiseOptions = async (query: string) => {
  const url = '/api/grammar/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((concept: Concept) => ({ value: concept.id, label: concept.text })));
}

type TagExerciseFormProps = {
  exercise: Exercise;
  concepts: Concept[];
  vocabs: Vocab[];
}

export default function TagExerciseForm({ exercise, concepts, vocabs }: TagExerciseFormProps) {
  const defaultConcepts = concepts.map(c => ({ value: c.id, label: c.text }));

  function handleSubmit(e: any) {
    e.preventDefault();
    
    // const req = async () => {
    //   const response = await fetch('/api/exercise/new', {
    //     method: 'POST',
    //     body: JSON.stringify({ enText, krText })
    //   });
    //   return response.json();
    // };
    // req().then(console.log);
  }

  return (
    <div className='flex flex-col bg-none w-full justify-left gap-2'>
      <h1 className="text-xl">Edit exercise tags</h1>
      <h2 className="text-lg">Grammar concepts</h2>
      <AsyncSelect
        isMulti 
        instanceId="grammar-concepts-search" 
        defaultOptions 
        loadOptions={promiseOptions}
        defaultValue={defaultConcepts}
      />
      <h2 className="text-lg">Vocabulary</h2>
      <AsyncSelect isMulti instanceId="vocab-search" options={options} />
      <button className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-4 rounded-lg transition-colors">
        <span className="font-semibold tracking-wide text-white text-center antialiased">Submit</span>
      </button>
    </div>
  )
}