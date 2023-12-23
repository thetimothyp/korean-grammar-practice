import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/app/database.types';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { fetchCollectionsForUser } from "@/app/lib/data";
import { FolderIcon } from "@heroicons/react/24/outline";
import CollectionTile from "@/app/ui/grid-tiles/collection-tile";
import CreateCollectionModal from "@/app/ui/create-collection-modal";

export default async function Collections() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user;
  const collections = await fetchCollectionsForUser(user.id);

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen items-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:w-3/5 pb-[6px]">
        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 mt-4 flex items-center">
          <FolderIcon className="w-12 h-10 text-purple-500 inline p-2 mr-4 rounded-md bg-purple-200" />
          Collections
          <div className='border-t w-full ml-4' />
        </h1>
        {collections.map((collection: any) => <CollectionTile key={collection.id} collection={collection} />)}
        <CreateCollectionModal />
      </div>
    </main>
  )
}