'use client';

import { Lesson } from "@/app/lib/definitions";
import { Modal } from 'flowbite-react';
import { useState } from "react";
import { CSSObjectWithLabel, ClassNamesConfig } from "react-select";
import AsyncSelect from 'react-select/async';

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

export default function AddOrRemoveLessonsModal({ selectedLessons }: { selectedLessons: any[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultLessons = selectedLessons ? selectedLessons.map(l => ({ value: l.id, label: l.title })) : [];
  const [selectedLessonIds, setSelectedLessonIds] = useState(defaultLessons.map(l => l.value));

  function onCloseModal() {
    setOpenModal(false);
    setIsLoading(false);
  }

  function handleSubmit() {
    const req = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
    }
    setIsLoading(true);
    req().then(onCloseModal);
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