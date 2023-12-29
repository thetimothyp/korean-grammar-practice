import GridTileLink from "@/app/ui/grid-tiles/grid-tile-link";

export default function ExerciseSetTile({ exerciseSet } : { exerciseSet: { id: string, title: string, exercise_count: number, author: string } }) {
  return (
    <GridTileLink href={`/exercises/${exerciseSet.id}/view`} color='green'>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{exerciseSet.title}</h3>
        <p className="text-zinc-500">{exerciseSet.exercise_count} exercise{exerciseSet.exercise_count != 1 ? 's' : ''}</p>
      </div>
      <p className="text-lg font-bold">
        {exerciseSet.author}
      </p>
    </GridTileLink>
  );
}