'use client';

import { forwardRef, useState } from "react";

type ExerciseInputProps = {
  answer: string,
  goToNextExercise: () => void
}

export default forwardRef<HTMLTextAreaElement, ExerciseInputProps>(({ answer, goToNextExercise }: ExerciseInputProps, ref) => {
  const [status, setStatus] = useState('pending');
  const [response, setResponse] = useState('');

  function reset() {
    setStatus('pending');
    setResponse('');
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (status === 'correct') {
      reset();
      return goToNextExercise();
    }
    if (status === 'incorrect') {
      // Try again
      reset();
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
    Array.from(answer).forEach((c, index) => {
      if (!responseCharacterSet.has(c)) {
        buffer.push(<span key={index} className="font-bold">{c}</span>);
      } else {
        buffer.push(<span key={index}>{c}</span>);
      }
    });
    return buffer;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex my-4 w-full h-1/8">
        <textarea 
          ref={ref}
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
          className={`shadow-sm text-lg resize-none p-4 ${status === 'incorrect' ? 'text-red-400 bg-white/90' : ''} w-full h-full outline-none rounded-lg border-2 border-stone-800 disabled:border-stone-300`}
        >
        </textarea>
      </div>

      {status === 'incorrect' ? (
        <div className="flex flex-col w-full">
          <p className="text-slate-900 opacity-50">Correct answer</p>
          <p className="text-xl">{answerWithSimpleDiff()}</p>
        </div>
      ) : ''}

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 items-end justify-end items-center mt-2 w-full">
        {status === 'incorrect' ? (
          <span className="mx-4 text-slate-900 opacity-50 hover:opacity-80 hover:cursor-pointer transition-all"><a onClick={() => {reset(); goToNextExercise();}}>Override: I’m close enough!</a></span>
        ) : status === 'correct' ? <span className="mx-4 text-slate-900">{randomCongrats()}</span> : ''}
        <button className={`${status === 'incorrect' ? 'bg-red-400 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} relative shadow-sm text-gray-900 p-2 px-4 rounded-lg transition-colors right-0`}>
            <span className="font-bold tracking-wide text-white text-center antialiased">{buttonLabel()}</span>
        </button>
      </div>
    </form>
  )
});