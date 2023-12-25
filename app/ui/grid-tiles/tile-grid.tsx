'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { useEffect, useRef, useState } from "react";
import CollectionTile from "./collection-tile";
import { debounce } from 'underscore';
import { motion } from 'framer-motion';
import LessonTile from './lesson-tile';

type FetchHandlerOptions = {
  tableName: string,
  orderBy: string,
};

type TileGridProps = {
  initialItems: any[] | null,
  pageSize: number,
  fetchHandlerOptions: FetchHandlerOptions,
}

export default function TileGrid({ initialItems, pageSize, fetchHandlerOptions }: TileGridProps) {
  // Generic version of CollectionTileGrid
  const supabase = createClientComponentClient<Database>();
  const [loadedItems, setLoadedItems] = useState(initialItems || []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const [isLast, setIsLast] = useState(false);

  function handleScroll() {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView(bottom <= innerHeight);
    }
  }

  useEffect(() => {
    const handleScrollDebounced = debounce(() => !isLast && handleScroll(), 50);
    window.addEventListener('scroll', handleScrollDebounced);
    return () => window.removeEventListener('scroll', handleScrollDebounced);
  }, [])

  async function fetchItems(offset: number, limit: number) {
    const from = offset * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from(fetchHandlerOptions.tableName)
        .select()
        .range(from, to)
        .order(fetchHandlerOptions.orderBy, { ascending: true });

    if (error) console.error('Error fetching additional item pages:', error);
    return data;
  }

  async function loadMore(offset: number) {
    // Every time we fetch, we want to increase
    // the offset to load fresh items
    setOffset((prev) => prev + 1);
    const newItems = await fetchItems(offset, pageSize) || [];
    if (newItems.length < pageSize) {
      setIsLast(true);
    }
    setLoadedItems(prev => [...prev, ...newItems]);
  }

  useEffect(() => {
    if (isInView) {
      loadMore(offset);
    }
  }, [isInView])

  return (
    <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-4/5 2xl:w-3/5 pb-[6px]" ref={containerRef}>
      {
        loadedItems?.map((item: any, index: number) => {
          const recalculatedDelay = index >= pageSize ? (index - pageSize * (offset - 1)) / 15 : index / 15
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.25, 0, 1],
                delay: recalculatedDelay,
              }}
            >
              { fetchHandlerOptions.tableName === 'collections' ? <CollectionTile key={index} collection={item} /> : <LessonTile key={index} lesson={item} /> }
            </motion.div>
          )
        })
      }
    </div>
  )
}