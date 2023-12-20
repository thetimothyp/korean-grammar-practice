import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { fetchCollectionsForUser } from "../lib/data";
import { FolderIcon } from "@heroicons/react/24/outline";
import CollectionTile from "@/app/ui/grid-tiles/collection-tile";
import NewTile from "@/app/ui/grid-tiles/new-tile";

export default async function Collections() {
  const user: any = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const collections = await fetchCollectionsForUser(user.id);

  return (
    <main className="flex min-h-screen flex-col p-6 w-screen items-center">
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl pb-[6px]">
        <h1 className="top-[6px] relative text-2xl font-bold sm:col-span-2 lg:col-span-3 row-span-2 mt-4 flex items-center">
          <FolderIcon className="w-12 h-10 text-purple-500 inline p-2 mr-4 rounded-md bg-purple-200" />
          Collections
          <div className='border-t w-full ml-4' />
        </h1>
        {collections.map((collection: any) => <CollectionTile key={collection.id} collection={collection} />)}
        <NewTile href='/collections/new' label='New collection' />
      </div>
    </main>
  )
}