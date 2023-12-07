'use client';

import { useState } from "react";

export default function NewConceptForm() {
  const [text, setText] = useState('');
  const [explanation, setExplanation] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();

    const req = async () => {
      const response = await fetch('/api/grammar/new', {
        method: 'POST',
        body: JSON.stringify({ text, explanation })
      });
      return response.json();
    };
    req().then(console.log);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col bg-none w-full justify-left gap-4 my-8'>
        <h1 className="text-xl">Create a new grammar concept</h1>
        <input name='text' onChange={e => setText(e.target.value)} className="p-4 rounded-lg" placeholder="Enter grammar concept text"></input>
        <input name='explanation' onChange={e => setExplanation(e.target.value)} className="p-4 rounded-lg" placeholder="Enter grammar concept explanation"></input>
        <button className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-4 rounded-lg transition-colors">
          <span className="font-semibold tracking-wide text-white text-center antialiased">Submit</span>
        </button>
      </div>
    </form>
  )
}