'use client';

import { useEffect, useRef, useState } from "react";
import ExerciseInput from "./exercise-input";
import Accordion from "./accordion";
import Link from "next/link";

export default function ExerciseRunner({ exercises }: { exercises: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function goToNextExercise() {
    setCurrentIndex((currentIndex + 1) % exercises.length);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  return (
    <main className="h-screen w-screen">
      {/* <GrammarFilterDrawer concepts={allConcepts} /> */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3">
        <div className="text-2xl w-full text-center">
          <span>{exercises[currentIndex].side_a}</span>
        </div>

        <ExerciseInput ref={inputRef} answer={exercises[currentIndex].side_b} goToNextExercise={goToNextExercise} />

        <div className="flex my-4 w-full">
          <Accordion>
              {exercises[currentIndex].lessons.map((lesson: any, index: any) => (
                <Link href={`/lessons/${lesson.id}/view`} key={index}>
                  <div className='hover:bg-stone-300/30 px-4 py-2 rounded-lg transition-colors'>
                    <p className='text-base text-black font-bold'>{lesson.title}</p>
                    <p className='text-slate-600'>{lesson.summary}</p>
                  </div>
                </Link>
              ))}
          </Accordion>
        </div>
      </div>
    </main>
  )
}