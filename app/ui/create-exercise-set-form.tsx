'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CreateExerciseForm from "./create-exercise-form";
import serialize from 'form-serialize';
import { v4 as uuidv4 } from 'uuid';

export default function CreateExerciseSetForm() {
  const router = useRouter();
  // TODO display loading state
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [exerciseIds, setExerciseIds] = useState<string[]>([]);

  useEffect(() => {
    setExerciseIds([uuidv4()]);
    console.log('done hydrating')
  }, []);

  useEffect(() => {
    submitRef.current?.scrollIntoView(false);
  }, [exerciseIds.length])

  function toExerciseObjArray(formData: any) {
    type Exercise = {
      id: string,
      side_a: string | null,
      side_b: string | null,
      lesson_ids: string[],
    };

    const exercises = exerciseIds.map(id => {
      const exercise: Exercise = { id, side_a: null, side_b: null, lesson_ids: [] };
      if (formData[`${id}-sideAText`] != undefined) exercise['side_a'] = formData[`${id}-sideAText`];
      if (formData[`${id}-sideBText`] != undefined) exercise['side_b'] = formData[`${id}-sideBText`];
      if (formData[`${id}-lessons`] != undefined)
        exercise['lesson_ids'] = Array.isArray(formData[`${id}-lessons`]) ? formData[`${id}-lessons`] : [formData[`${id}-lessons`]];
      return exercise;
    });

    return {
      title: formData['title'],
      exercises,
    };
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setDidSubmit(true);
    setIsLoading(true);

    if (formRef.current) {
      const formData = serialize(formRef.current, { hash: true });

      const req = async () => {
        const response = await fetch('/api/exercises/new', {
          method: 'POST',
          body: JSON.stringify(toExerciseObjArray(formData))
        });
        return response.json();
      };

      req().then(console.log);
      // TODO redirect to the new exercise set
      // req().then((res) => { router.push(`/exercises/${res.id}/view`) });
    }

  }

  function removeExercise(uuid: string) {
    setExerciseIds(prev => prev.filter(id => id != uuid));
  }

  return (
    <div className="flex w-full h-full">
      <form 
        className="w-full flex justify-center py-8"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className='w-full px-4 lg:px-0 lg:w-3/5 flex flex-col gap-4'>
          <div className="flex flex-col gap-3 bg-white p-6 rounded-md">
            <h1 className="text-3xl font-bold">Create a new exercise set</h1>
            <input name="title" type="text" placeholder="Enter a title, like “Korean Grammar - Chapter 2”" className="w-full border-2 border-stone-800 rounded-md bg-white p-2" />
          </div>
          { exerciseIds.map((id, i) => <CreateExerciseForm key={id} id={id} index={i} removeExercise={() => removeExercise(id)} />) }
          <button 
            type='button' 
            onClick={() => setExerciseIds(prev => [...prev, uuidv4()])}
            className='w-full bg-white rounded-md p-8 text-stone-700 hover:text-green-500 transition-colors shadow-sm'
          >
            <span className="font-bold underline underline-offset-8 decoration-2">
              + Add exercise
            </span>
          </button>
          <hr className="my-2" />
          <button
            ref={submitRef}
            type='submit'
            className='w-full font-bold bg-green-500 rounded-md p-4 text-white hover:bg-green-700 transition-colors shadow-sm'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}