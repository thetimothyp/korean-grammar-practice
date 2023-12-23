'use client';

import { useState } from "react";
import { toast } from 'react-hot-toast';
import { Modal } from 'flowbite-react';
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

const Select = dynamic(
  () => import('react-select').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  },
);

const customTheme = {
  content: {
    inner: 'relative rounded-lg bg-stone-50 shadow flex flex-col max-h-[90vh] border-2 border-stone-800'
  },
  header: {
    base: 'flex items-start justify-between rounded-t p-5 pb-0'
  }
}

const transformToOptions = ({ label, value }: { label: string, value: string, hasLesson: boolean }) => ({ label, value });

export default function AddToCollectionDropdown({ lid }: { lid: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [defaultValues, setDefaultValues] = useState<any[]>([]);

  const [selectedCollectionIds, setSelectedCollectionIds] = useState<any[]>([]);
  const [initialCollectionIds, setInitialCollectionIds] = useState<any[]>([]);

  function onCloseModal() {
    setOpenModal(false);
    setIsLoading(false);
  }

  function handleClick() {
    const getCollections = async () => {
      const url = '/api/collections/user-collections-with-lesson?' + new URLSearchParams({ lid })
      const response = await fetch(url, { method: 'GET' });
      
      return response.json()
        .then(data => data.map(
          ({ c_name, cid, lid }: { cid: string, c_name: string, lid: string | null }) => 
            ({ value: cid, label: c_name, hasLesson: !!lid })
        ));
    }
    setIsLoadingOptions(true);
    getCollections().then(data => {
      setOptions(data.map(transformToOptions));
      setDefaultValues(data.filter((c: any) => c.hasLesson).map(transformToOptions));
      setInitialCollectionIds(data.filter((c: any) => c.hasLesson).map(transformToOptions).map((option: any) => option.value))
      setSelectedCollectionIds(data.filter((c: any) => c.hasLesson).map(transformToOptions).map((option: any) => option.value));
      setIsLoadingOptions(false);
      setOpenModal(true);
    });
  }

  function handleSelect(selected: any) {
    setSelectedCollectionIds(selected.map((item: any) => item.value));
  }

  function handleSubmit() {
    const req = async () => {
      const response = await fetch('/api/lessons/update-collections', {
        method: 'POST',
        body: JSON.stringify({ initialCollectionIds, selectedCollectionIds, lid })
      });
      return response.json();
    }
    setIsLoading(true);
    req().then(() => {
      onCloseModal();
      toast.success('Collections updated!', { 
        position: 'bottom-center', 
        iconTheme: { primary: 'rgb(22, 163, 74)', secondary: 'white' },
        style: { border: '2px solid rgb(41, 37, 36)'}})
    });
  }

  return (
    <>
    <button
      onClick={handleClick}
      className='rounded-lg bg-purple-500 text-white hover:bg-purple-600 py-2 px-4 pl-3 transition-colors border-2 border-stone-800 relative'
    >
      <div className={`${isLoadingOptions ? 'opacity-100' : 'opacity-0'} w-full h-full rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit transition-opacity`}>
        <div className="mt-2 animate-spin inline-block w-6 h-6 border-[2px] border-white border-opacity-70 border-t-transparent rounded-full" role="status" aria-label="loading" />
      </div>
      <span className="flex gap-2">
      <FolderPlusIcon className="w-6 h-6" /><span>Add to collection</span>
      </span>
    </button>
    <Modal dismissible show={openModal} onClose={onCloseModal} className='bg-stone-400 overflow-scroll' theme={customTheme}>
      <Modal.Header>Collections containing this lesson</Modal.Header>
      <Modal.Body className="p-5 overflow-visible">
        <div className="flex flex-col">
          <Select
            isMulti
            name='collections-with-lesson'
            instanceId="collections-with-lesson" 
            options={options}
            onChange={handleSelect}
            defaultValue={defaultValues}
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
  );
}