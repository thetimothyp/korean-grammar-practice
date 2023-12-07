'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ExerciseInputProps = {
  id: any,
  answer: string
}

export default function ExerciseInput({ id, answer }: ExerciseInputProps) {
  const [status, setStatus] = useState('pending');
  const [response, setResponse] = useState('');
  const router = useRouter();

  function nextId() {
    return parseInt(id as string) + 1;
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (status === 'correct') {
      return router.push(`/exercises/${nextId()}`);
    }
    if (status === 'incorrect') {
      setStatus('pending');
      setResponse('');
      return;
    }

    if (response == answer) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  }

  function buttonLabel() {
    switch(status) {
      case 'correct':
        return 'Continue';
      case 'incorrect':
        return 'Try again';
      case 'pending':
      default:
        return 'Check answer';
    }
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function randomCongrats() {
    const congrats = ['Nice job! 🎉', 'Correct! 🥳', 'Well done! 🎈', 'Spot on! 👍'];
    return congrats[getRandomInt(0, congrats.length)];
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex my-4 w-full h-1/8">
        <textarea 
          name="response" 
          value={response}
          onChange={e => setResponse(e.target.value)}
          onKeyDown={e => {
            if (e.key == 'Enter') {
              handleSubmit(e);
            }
          }}
          placeholder="한국어로 번역해 보세요" 
          autoFocus 
          className="text-lg resize-none p-4 w-full h-full outline-none rounded-lg"
        >
        </textarea>
      </div>

      {status === 'incorrect' ? (
        <div className="flex flex-col w-full">
          <p className="text-slate-900 opacity-50">Correct answer</p>
          <p className="text-xl">{answer}</p>
        </div>
      ) : ''}

      <div className="flex items-end justify-end items-center mt-2 w-full">
        {status === 'incorrect' ? (
          <span className="mx-4 text-slate-900 opacity-50 hover:opacity-80 transition-all"><Link href={`/exercises/${nextId()}`}>Override: I was correct</Link></span>
        ) : status === 'correct' ? <span className="mx-4 text-slate-900">{randomCongrats()}</span> : ''}
        <button className={`${status === 'incorrect' ? 'bg-red-400 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-gray-900 p-2 px-4 rounded-lg transition-colors right-0`}>
          <span className="text-white text-center antialiased">{buttonLabel()}</span>
        </button>
      </div>
    </form>
  )
}