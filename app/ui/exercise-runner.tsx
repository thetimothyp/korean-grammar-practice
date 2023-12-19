'use client';

import { useState } from "react";
import ExerciseInput from "./exercise-input";
import Accordion from "./accordion";

export default function ExerciseRunner({ exercises }: { exercises: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToNextExercise() {
    setCurrentIndex((currentIndex + 1) % exercises.length);
  }

  return (
    <main className="h-screen w-screen">
      {/* <GrammarFilterDrawer concepts={allConcepts} /> */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3">
        <div className="text-2xl w-full text-center">
          <span>{exercises[currentIndex].nl_text}</span>
        </div>

        <ExerciseInput answer={exercises[currentIndex].tl_text} goToNextExercise={goToNextExercise} />

        <div className="flex my-4 w-full">
          <Accordion>
              {exercises[currentIndex].lessons.map((lesson: any, index: any) => (
                <div className='mb-4' key={index}>
                  <p className='text-base text-black font-bold'>{lesson.title}</p>
                  <p className='text-slate-600'>{lesson.summary}</p>
                </div>
              ))}
          </Accordion>
        </div>
      </div>
    </main>
  )
}