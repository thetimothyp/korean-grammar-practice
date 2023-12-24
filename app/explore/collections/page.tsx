import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import CollectionTileGrid from '@/app/ui/grid-tiles/collection-tile-grid';

// Page size must be divisible by 2 AND 3 for various screen sizes
const PAGE_SIZE = 24;

export default async function ExploreCollections() {
  // https://github.com/vercel/next.js/issues/56630#issuecomment-1755473286
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: initialCollections, error } = await supabase
    .from('collections')
    .select()
    .limit(PAGE_SIZE)
    .order('created_at', { ascending: true });
  if (error) console.error('Error loading collections in page: ExploreCollections');

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 w-screen items-center">
      <CollectionTileGrid initialCollections={initialCollections} pageSize={PAGE_SIZE} />
    </main>
  )
}