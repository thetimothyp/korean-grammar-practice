'use client';

import { useState } from "react";

export default function NewVocabForm() {
  const [enText, setEnText] = useState('');
  const [krText, setKrText] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();
    
    const req = async () => {
      const response = await fetch('/api/vocab/new', {
        method: 'POST',
        body: JSON.stringify({ enText, krText })
      });
      return response.json();
    };
    req().then(() => { alert('Success!'); });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col bg-none w-full justify-left gap-4 my-2'>
        <h1 className="text-xl">Create a new vocabulary term</h1>
        <input name='enText' onChange={e => setEnText(e.target.value)} className="p-4 rounded-lg" placeholder="Enter English text"></input>
        <input name='krText' onChange={e => setKrText(e.target.value)} className="p-4 rounded-lg" placeholder="Enter Korean text"></input>
        <button className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-4 rounded-lg transition-colors">
          <span className="font-semibold tracking-wide text-white text-center antialiased">Submit</span>
        </button>
      </div>
    </form>
  )
}