import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import TileGrid from '@/app/ui/grid-tiles/tile-grid';

export default async function ExploreLessons() {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: initialLessons, error } = await supabase
    .from('lessons')
    .select()
    .limit(24)
    .order('created_at', { ascending: true });
  if (error) console.error('Error loading lessons in page: ExploreLessons');

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 w-screen items-center">
      <TileGrid initialItems={initialLessons} pageSize={24} fetchHandlerOptions={{ tableName: 'lessons', orderBy: 'created_at' }} />
    </main>
  )
}
