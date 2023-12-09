'use client';

import { Exercise } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import AsyncSelect from 'react-select/async';

const exerciseOptionsPromise = async (query: string) => {
  const url = '/api/exercise/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((e: Exercise) => ({ value: e.id, label: e.en_text })));
}

export default function ExerciseSearch() {
  const router = useRouter();

  function handleSelect(selected: any) {
    router.push(`/admin/exercises/${selected.value}`)
  }

  return (
    <AsyncSelect
        instanceId="exercise-search" 
        defaultOptions 
        placeholder='Go to exercise'
        loadOptions={exerciseOptionsPromise}
        onChange={handleSelect}
      />
  )
}