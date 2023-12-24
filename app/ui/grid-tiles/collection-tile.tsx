import GridTileLink from "@/app/ui/grid-tiles/grid-tile-link";

export default function CollectionTile({ collection } : { collection: { id: string, name: string, lesson_count: number, author: string }}) {
  return (
    <GridTileLink href={`/collections/${collection.id}/view`} color='purple'>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{collection.name}</h3>
        <p className="text-sm text-zinc-400">{collection.lesson_count} lesson{collection.lesson_count != 1 ? 's' : ''}</p>
      </div>
      <p className="text-lg font-bold">
        {collection.author}
      </p>
    </GridTileLink>
  );
}