'use client';

import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Concept } from '../lib/definitions';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import './grammar-filter-drawer.css';

export default function GrammarFilterDrawer({ concepts }: { concepts: Concept[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const filter = searchParams.get('filter');
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState)
  }
  
  const defaultGrammarFilter: any = {};

  if (filter == null || filter == '') {
    concepts.forEach(c => {
      defaultGrammarFilter[c.id] = true;
    });
  } else {
    concepts.forEach(c => {
      defaultGrammarFilter[c.id] = false;
    });
  }

  if (filter != null && filter != 'all') {
    filter.split(',').forEach(id => {
      defaultGrammarFilter[id] = true;
    });
  }

  const [filteredOptions, setFilteredOptions] = useState(concepts);
  const [grammarFilter, setGrammarFilter] = useState(defaultGrammarFilter);

  function filterOptions(e: any) {
    const value = e.target.value;
    const filtered = concepts.filter(c => c.text.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
  }

  useEffect(() => {
    const editableSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    const enabledGrammars = Object.entries(grammarFilter).filter(([id, enabled]) => enabled).map(([id, enabled]) => id);
    editableSearchParams.set('filter', enabledGrammars.join(','));

    // cast to string
    const search = editableSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  }, [grammarFilter]);

  return (
    <div className='absolute right-0 top-0 py-12 px-16'>
      <button className='text-slate-900 opacity-70 hover:opacity-90 transition-opacity' onClick={toggleDrawer}>
        <span>Filter exercises by grammar concept <AdjustmentsHorizontalIcon className='inline ml-1 h-6 w-6' /></span>
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        enableOverlay={false}
        size={450}
        style={{
          backgroundColor: 'rgb(255, 250, 245)'
        }}
        className='flex flex-col py-12 px-12 !shadow-md gap-4'
      >
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-slate-600'>Filter exercises</h1>
          <button onClick={toggleDrawer}>
            <XMarkIcon className='h-6 w-6' />
          </button>
        </div>
        <div className='flex flex-col'>
          <input className='my-4 p-2 shadow-sm rounded-md' placeholder='Find concepts...' onChange={filterOptions} />
          <ul className='flex flex-col gap-2'>
            {filteredOptions.map(c => 
              <li 
                onClick={() => {
                  const updated = { ...grammarFilter };
                  updated[c.id] = !updated[c.id];
                  setGrammarFilter(updated);
                }} 
                className='flex items-center justify-between hover:cursor-pointer hover:bg-yellow-700/5 rounded-lg transition-all p-2' 
                key={c.id}
              >
                <p className='w-4/5'>{c.text}</p>
                <div className="checkbox-wrapper-2 mt-1">
                  <input
                    type="checkbox" 
                    checked={grammarFilter[c.id]}
                    className="sc-gJwTLC ikxBAC" 
                  />
                </div>
              </li>
            )}
          </ul>
        </div>
      </Drawer>
    </div>
  );
}