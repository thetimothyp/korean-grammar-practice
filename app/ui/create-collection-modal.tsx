'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function CreateCollectionModal() {
  const [openModal, setOpenModal] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const inputRef = useRef(null);

  function onCloseModal() {
    setOpenModal(false);
    setCollectionName('');
    setIsLoading(false);
  }

  function handleSubmit() {
    setIsLoading(true);
    const req = async () => {
      const response = await fetch('/api/collections/new', {
        method: 'POST',
        body: JSON.stringify({ name: collectionName })
      });
      return response.json();
    }
    req().then((res) => { 
      setIsLoading(false);
      router.push(`/collections/${res.id}/view`);
      onCloseModal();
    });
  }

  const customTheme = {
    content: {
      inner: 'relative rounded-lg bg-stone-50 shadow flex flex-col max-h-[90vh] border-2 border-stone-800'
    },
    header: {
      base: 'flex items-start justify-between rounded-t p-5 pb-0'
    }
  }

  return (
    <>
      <button 
        onClick={() => setOpenModal(true)}
        className="row-span-3 top-[6px] min-h-[12rem] relative flex items-center justify-center py-4 px-6 border border-stone-300 rounded-2xl hover:cursor-pointer hover:bg-stone-300/20 transition-colors"
      >
        <PlusIcon className="text-zinc-400 h-6 w-6" />
        <span className="text-zinc-400 ml-2">New collection</span>
      </button>
      <Modal dismissible   show={openModal} onClose={onCloseModal} className='bg-stone-400' theme={customTheme} initialFocus={inputRef}>
        <Modal.Header className=''>Create a new collection</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <label className='text-sm text-zinc-400' htmlFor="collection-name">Collection name</label>
            <input
              name="collection-name"
              value={collectionName}
              onChange={e => setCollectionName(e.target.value)}
              placeholder='Enter collection name...'
              className='border rounded-md p-2 mt-1 focus:outline-none'
              ref={inputRef}
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
                Create
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}