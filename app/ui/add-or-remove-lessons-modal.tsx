'use client';

import { Modal } from 'flowbite-react';
import { useState } from "react";
import AsyncSelect from 'react-select/async';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

const lessonOptionsPromise = async (query: string) => {
  const url = '/api/lessons/search?' + new URLSearchParams({ query })
  const response = await fetch(url, { method: 'GET' });
  return response.json().then(data => data.map((l: any) => ({ value: l.id, label: l.title })));
}

const customTheme = {
  content: {
    inner: 'relative rounded-lg bg-stone-50 shadow flex flex-col max-h-[90vh] border-2 border-stone-800'
  },
  header: {
    base: 'flex items-start justify-between rounded-t p-5 pb-0'
  }
}

export default function AddOrRemoveLessonsModal({ selectedLessons, cid }: { selectedLessons: any[], cid: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultLessons = selectedLessons ? selectedLessons.map(l => ({ value: l.id, label: l.title })) : [];
  const [selectedLessonIds, setSelectedLessonIds] = useState(defaultLessons.map(l => l.value));
  const router = useRouter();

  function onCloseModal() {
    setOpenModal(false);
    setIsLoading(false);
  }

  function handleSubmit() {
    const req = async () => {
      const initialLessonIds = selectedLessons.map(l => l.id);
      const response = await fetch('/api/collections/update', {
        method: 'POST',
        body: JSON.stringify({ cid, initialLessonIds, selectedLessonIds })
      });
      return response.json();
    }
    setIsLoading(true);
    req().then(() => {
      onCloseModal();
      toast(t => (
        <span className="p-2">
          <strong>Collection saved!</strong>{' '}
          <a
            onClick={router.refresh}
            className="underline hover:cursor-pointer"
          >
            Refresh to see changes.
          </a>
        </span>
      ), { position: 'bottom-center', style: { border: '2px solid rgb(41, 37, 36)'}})
    });
  }

  function handleLessonSelect(selected: any) {
    setSelectedLessonIds(selected.map((item: { id: string, value: string }) => item.value));
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='rounded-lg bg-red-500 text-white hover:bg-red-600 p-2 px-6 transition-colors border-2 border-stone-800'
      >
        Add or remove lessons
      </button>
      <Modal dismissible show={openModal} onClose={onCloseModal} className='bg-stone-400 overflow-scroll' theme={customTheme}>
        <Modal.Header>Add or remove lessons</Modal.Header>
        <Modal.Body className="p-5 overflow-visible">
          <div className="flex flex-col">
            <AsyncSelect
              isMulti 
              name='lessons'
              instanceId="lesson-search" 
              defaultOptions 
              loadOptions={lessonOptionsPromise}
              defaultValue={defaultLessons}
              onChange={handleLessonSelect}
              classNames={{
                control: () => '!border-2 !border-stone-800',
                menu: () => 'border-2 border-stone-800',
              }}
            />
            <div className='flex gap-4 self-end'>
              <button onClick={onCloseModal}
                className='rounded-lg text-stone-500 hover:bg-stone-100 p-2 px-6 transition-colors relative mt-4'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className='rounded-lg text-white bg-green-500 hover:bg-green-600 p-2 px-6 transition-colors relative mt-4'
              >
                <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} w-full h-full rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit transition-opacity`}>
                  <div className="mt-2 animate-spin inline-block w-6 h-6 border-[2px] border-white border-opacity-70 border-t-transparent rounded-full" role="status" aria-label="loading" />
                </div>
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}