'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ExerciseInputProps = {
  id: any,
  answer: string
}

export default function ExerciseInput({ id, answer }: ExerciseInputProps) {
  const [status, setStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  async function goToNextExercise() {
    setIsLoading(true);
    const getNextId = async () => {
      const url = '/api/exercise/next?' + new URLSearchParams({
        id,
        filter: searchParams.get('filter') || 'all'
      });
      const response = await fetch(url, { method: 'GET' });
      return response.json();
    }

    getNextId().then(res => router.push(`/exercises/${res.nextId}?${searchParams.toString()}`));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (status === 'correct') {
      return goToNextExercise();
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

  function answerWithSimpleDiff() {
    // Quizlet just bolds any characters that you missed in your answer, so we’ll do the same.
    const responseCharacterSet = new Set(response.replaceAll(/\s/g,''));

    let buffer: any = [];
    Array.from(answer).forEach(c => {
      if (!responseCharacterSet.has(c)) {
        buffer.push(<span className="font-semibold">{c}</span>);
      } else {
        buffer.push(<span>{c}</span>);
      }
    });
    return buffer;
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
          placeholder={status === 'incorrect' ? '' : "한국어로 번역해 보세요"}
          autoFocus 
          disabled={status === 'incorrect'}
          className={`shadow-sm text-lg resize-none p-4 ${status === 'incorrect' ? 'text-red-400 bg-white/70' : ''} w-full h-full outline-none rounded-lg`}
        >
        </textarea>
      </div>

      {status === 'incorrect' ? (
        <div className="flex flex-col w-full">
          <p className="text-slate-900 opacity-50">Correct answer</p>
          <p className="text-xl">{answerWithSimpleDiff()}</p>
        </div>
      ) : ''}

      <div className="flex items-end justify-end items-center mt-2 w-full">
        {status === 'incorrect' ? (
          <span className="mx-4 text-slate-900 opacity-50 hover:opacity-80 hover:cursor-pointer transition-all"><a onClick={goToNextExercise}>Override: I’m close enough!</a></span>
        ) : status === 'correct' ? <span className="mx-4 text-slate-900">{randomCongrats()}</span> : ''}
        <button className={`${status === 'incorrect' ? 'bg-red-400 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} relative shadow-sm text-gray-900 p-2 px-4 rounded-lg transition-colors right-0`}>
            <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} w-full h-full rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit transition-opacity`}>
              <div className="mt-2 animate-spin inline-block w-6 h-6 border-[2px] border-white border-opacity-70 border-t-transparent rounded-full" role="status" aria-label="loading">
              </div>
            </div>
            <span className="font-semibold tracking-wide text-white text-center antialiased">{buttonLabel()}</span>
        </button>
      </div>
    </form>
  )
}