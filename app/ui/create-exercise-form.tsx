'user client';

import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import AsyncSelect from 'react-select/async';
import { TrashIcon } from "@heroicons/react/24/solid";

const lessonOptionsPromise = async (query: string) => {
  const url = '/api/lessons/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((l: any) => ({ value: l.id, label: l.title })));
}

// A single exercise input to be used in the edit exercise form.
export default function CreateExerciseForm({ id, index, removeExercise }: { id: string, index: number, removeExercise: () => void }) {
  const [sideAText, setSideAText] = useState('');
  const [sideBText, setSideBText] = useState('');
  const [selectedLessons, setSelectedLessons] = useState([]);

  function label(fieldName: string) {
    return `${id}-${fieldName}`;
  }

  function handleLessonSelect(selectedOptions: any) {
    setSelectedLessons(selectedOptions);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 pb-8 px-6 bg-white rounded-md shadow-sm">
      <div className="flex justify-between md:col-span-2 border-b pb-2">
        <h1 className="text-lg font-bold">Exercise {index + 1}</h1>
        <button type="button" className="text-red-500 hover:text-red-700" onClick={removeExercise}>
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={label('sideAText')}>Side A</label>
        <TextareaAutosize
          className="w-full border-2 border-stone-800 rounded-md p-2 resize-none"
          name={label('sideAText')}
          placeholder="Enter side A text"
          value={sideAText}
          onChange={e => setSideAText(e.target.value)}
          rows={1}
          autoFocus
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={label('sideBText')}>Side B</label>
        <TextareaAutosize
          className="w-full border-2 border-stone-800 rounded-md p-2 resize-none"
          name={label('sideBText')}
          placeholder="Enter side B text"
          value={sideBText}
          onChange={e => setSideBText(e.target.value)}
          rows={1}
        />
      </div>
      <div className="flex flex-col gap-1 md:col-span-2">
        <label htmlFor={label('lessons')}>Lessons practiced</label>
        <AsyncSelect
          isMulti 
          name={label('lessons')}
          value={selectedLessons}
          instanceId={label('lessons')}
          defaultOptions
          loadOptions={lessonOptionsPromise}
          onChange={handleLessonSelect}
          classNames={{
            control: () => '!border-2 !border-stone-800 p-1',
            menu: () => 'border-2 border-stone-800',
          }}
        />
      </div>
    </div>
  )
}