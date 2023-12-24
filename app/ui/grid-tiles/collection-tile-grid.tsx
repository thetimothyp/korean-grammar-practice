'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { useEffect, useRef, useState } from "react";
import CollectionTile from "./collection-tile";
import { debounce } from 'underscore';
import { motion } from 'framer-motion';

export default function CollectionTileGrid({ initialCollections, pageSize }: { initialCollections: any[] | null, pageSize: number }) {
  const supabase = createClientComponentClient<Database>();
  const [loadedCollections, setLoadedCollections] = useState(initialCollections || []);

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

  async function fetchCollections(offset: number, limit: number) {
    const from = offset * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('collections')
        .select()
        .range(from, to)
        .order('created_at', { ascending: true });

    if (error) console.error('Error fetching additional collection pages:', error);
    return data;
  }

  async function loadMore(offset: number) {
    // Every time we fetch, we want to increase
    // the offset to load fresh tickets
    setOffset((prev) => prev + 1);
    const newCollections = await fetchCollections(offset, pageSize) || [];
    if (newCollections.length < pageSize) {
      setIsLast(true);
    }
    setLoadedCollections(prev => [...prev, ...newCollections]);
  }

  useEffect(() => {
    if (isInView) {
      loadMore(offset);
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-4/5 2xl:w-3/5 pb-[6px]">
      {loadedCollections?.map((collection: any, index: number) =>
        {
          const recalculatedDelay = index >= pageSize ? (index - pageSize * (offset - 1)) / 15 : index / 15
          return (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.25, 0, 1],
                delay: recalculatedDelay,
              }}
            >
              <CollectionTile collection={collection} />
            </motion.div>
          )
        }
      )}
    </div>
  );
}