'use client';

import { useEffect, useRef, useState } from "react";
import { ForwardRefEditor } from "./MDXEditor/ForwardRefEditor";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css';
import { redirect, useRouter } from "next/navigation";

type EditLessonFormProps = {
  id?: string;
  initialTitle?: string | null;
  initialSummary?: string | null;
  initialBody?: string | null;
};

export default function EditLessonForm({ id, initialTitle, initialSummary, initialBody } : EditLessonFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(initialTitle || '');
  const [summary, setSummary] = useState(initialSummary || '');
  const [body, setBody] = useState(initialBody || '');

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
      setIsLoading(true);
      let req;
      // If this Lesson is new (there is no ID), use the `new` endpoint
      if (!id) {
        req = async () => {
          const response = await fetch('/api/lessons/new', {
            method: 'POST',
            body: JSON.stringify({ title, summary, body })
          });
          return response.json();
        };
      } else {
        req = async () => {
          const response = await fetch('/api/lessons/update', {
            method: 'POST',
            body: JSON.stringify({ id, title, summary, body })
          });
          return response.json();
        };
      }
      req().then((res) => { router.push(`/lessons/${res.id}/view`) });
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 w-full md:w-4/5 xl:w-3/5">
      <div className='flex w-full flex-col md:flex-row justify-between md:items-center bg-stone-50 mt-24 rounded-lg p-6 border-2 border-stone-800 gap-4'>
        <div className='flex flex-col w-4/5 justify-left'>
          <input
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`${titleError ? 'bg-red-100' : ''} mb-1 rounded-md bg-transparent px-1 text-3xl focus:outline-none font-bold transition-colors`}
            placeholder="Untitled" />
          <input
            name='summary'
            value={summary}
            onChange={e => setSummary(e.target.value)}
            className={`${summaryError ? 'bg-red-100' : ''} rounded-md bg-transparent px-1 text-lg focus:outline-none transition-colors`}
            placeholder="Enter lesson summary..." />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 shadow-sm p-2 px-6 rounded-lg transition-colors relative border-2 border-stone-800"
        >
          <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} w-full h-full rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit transition-opacity`}>
            <div className="mt-2 animate-spin inline-block w-6 h-6 border-[2px] border-white border-opacity-70 border-t-transparent rounded-full" role="status" aria-label="loading" />
          </div>
          <span className="font-bold tracking-wide text-white text-center antialiased">Save</span>
        </button>
      </div>
      <div className={`${bodyError ? 'bg-red-100' : ''} rounded-md w-full my-6 transition-colors bg-stone-50 p-6 border-stone-800 border-2`}>
        <ForwardRefEditor placeholder="Write something!" className="max-w-none prose" ref={ref} markdown={body} onChange={setBody} />
      </div>
    </div>
  )
}