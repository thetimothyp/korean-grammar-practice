import GridTileLink from "./grid-tile-link";

export default function LessonTile({ lesson } : { lesson: { id: string, title: string, summary: string, exercise_count: number } }) {
  return (
    <GridTileLink href={`/lessons/${lesson.id}/view`} color='yellow'>
      <h3 className="text-xl font-bold">{lesson.title}</h3>
      <p className="text-zinc-500">{lesson.summary}</p>
      <p className="text-sm mt-1 text-zinc-400">{lesson.exercise_count} exercise{lesson.exercise_count != 1 ? 's' : ''}</p>
    </GridTileLink>
  );
}