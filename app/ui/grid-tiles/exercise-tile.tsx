import GridTileLink from "@/app/ui/grid-tiles/grid-tile-link";

export default function ExerciseTile({ exercise } : { exercise: { id: string, side_a: string, lesson_count: number } }) {
  return (
    <GridTileLink href={`/exercises/${exercise.id}/view`} color='green'>
      <h3 className="text-xl font-bold">{exercise.side_a}</h3>
      <p className="text-sm text-zinc-400">{exercise.lesson_count} lesson{exercise.lesson_count != 1 ? 's' : ''}</p>
    </GridTileLink>
  );
}