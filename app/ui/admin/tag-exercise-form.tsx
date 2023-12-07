'use client';

import { Concept, Exercise, Vocab } from "@/app/lib/definitions";
import { useState } from "react";
import AsyncSelect from 'react-select/async';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const grammarOptionsPromise = async (query: string) => {
  const url = '/api/grammar/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((c: Concept) => ({ value: c.id, label: c.text })));
}

const vocabOptionsPromise = async (query: string) => {
  const url = '/api/vocab/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((v: Vocab) => ({ value: v.id, label: v.kr_text })));
}

type TagExerciseFormProps = {
  exercise: Exercise;
  concepts: Concept[];
  vocabs: Vocab[];
}

export default function TagExerciseForm({ exercise, concepts, vocabs }: TagExerciseFormProps) {
  const defaultConcepts = concepts.map(c => ({ value: c.id, label: c.text }));
  const defaultVocab = vocabs.map(v => ({ value: v.id, label: v.kr_text }));

  const [selectedConceptIds, setSelectedConceptIds] = useState(defaultConcepts.map(c => c.value));
  const [selectedVocabIds, setSelectedVocabIds] = useState(defaultVocab.map(v => v.value));

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

    const submitVocabTags = async () => {
      const response = await fetch('/api/exercise/tag-with-vocab', {
        method: 'POST',
        body: JSON.stringify({ exerciseId: exercise.id, vocabIds: selectedVocabIds })
      });
      return response.json();
    };

    promises.push(submitConceptTags());
    promises.push(submitVocabTags());

    Promise.all(promises).then(console.log);
  }

  function handleConceptsSelect(selected: any) {
    setSelectedConceptIds(selected.map((item: any) => item.value));
  }

  function handleVocabSelect(selected: any) {
    setSelectedVocabIds(selected.map((item: any) => item.value));
  }

  return (
    <div className='flex flex-col bg-none w-full justify-left gap-2'>
      <h1 className="text-xl">Edit exercise tags</h1>
      <h2 className="text-lg">Grammar concepts</h2>
      <AsyncSelect
        isMulti 
        instanceId="grammar-concepts-search" 
        defaultOptions 
        loadOptions={grammarOptionsPromise}
        defaultValue={defaultConcepts}
        onChange={handleConceptsSelect}
      />
      <h2 className="text-lg">Vocabulary</h2>
      <AsyncSelect
        isMulti 
        instanceId="vocab-search" 
        defaultOptions 
        loadOptions={vocabOptionsPromise}
        defaultValue={defaultVocab}
        onChange={handleVocabSelect}
      />
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-4 rounded-lg transition-colors">
        <span className="font-semibold tracking-wide text-white text-center antialiased">Submit</span>
      </button>
    </div>
  )
}