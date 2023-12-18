'use client';

import { useEffect, useRef, useState } from "react";
import { ForwardRefEditor } from "./MDXEditor/ForwardRefEditor";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css';

export default function NewLessonForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');

  const [didSubmit, setDidSubmit] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [summaryError, setSummaryError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const ref = useRef<MDXEditorMethods>(null);

  function validate() {
    if (didSubmit) {
      if (title.length == 0) {
        setTitleError(true);
      } else {
        setTitleError(false);
      }
      if (summary.length == 0) {
        setSummaryError(true);
      } else {
        setSummaryError(false);
      }
      if (body.length == 0) {
        setBodyError(true);
      } else {
        setBodyError(false);
      }
    }
  }

  useEffect(validate, [title, summary, body, didSubmit]);

  function isValid() {
    return title.length > 0 && summary.length > 0 && body.length > 0;
  }

  function handleSubmit() {
    setDidSubmit(true);
    if (isValid()) {
      const req = async () => {
        const response = await fetch('/api/lessons/new', {
          method: 'POST',
          body: JSON.stringify({ title, summary, body })
        });
        return response.json();
      };
      req().then(() => { alert('Success!'); });
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 w-full md:w-4/5 xl:w-3/5">
      <div className='flex w-full justify-between items-center border-b border-dashed py-4'>
        <div className='flex flex-col w-4/5 justify-left'>
          <input
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`${titleError ? 'bg-red-100' : ''} mb-1 rounded-md bg-transparent px-1 text-3xl focus:outline-none font-bold transition-colors`}
            placeholder="Untitled" />
          <input
            name='summary'
            onChange={e => setSummary(e.target.value)}
            className={`${summaryError ? 'bg-red-100' : ''} rounded-md bg-transparent px-1 text-lg focus:outline-none transition-colors`}
            placeholder="Enter lesson summary..." />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-6 rounded-lg transition-colors"
        >
          <span className="font-bold tracking-wide text-white text-center antialiased">Save</span>
        </button>
      </div>
      <div className={`${bodyError ? 'bg-red-100' : ''} rounded-md w-full my-6 transition-colors`}>
        <ForwardRefEditor placeholder="Write something!" className="max-w-none prose" ref={ref} markdown='' onChange={setBody} />
      </div>
    </div>
  )
}