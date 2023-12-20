import GridTileLink from "@/app/ui/grid-tiles/grid-tile-link";

export default function CollectionTile({ collection } : { collection: { id: string, name: string, lesson_count: number }}) {
  return (
    <GridTileLink href={`/collections/${collection.id}/view`} color='purple'>
      <h3 className="text-xl font-bold">{collection.name}</h3>
      <p className="text-sm text-zinc-400">{collection.lesson_count} lesson{collection.lesson_count != 1 ? 's' : ''}</p>
    </GridTileLink>
  );
}