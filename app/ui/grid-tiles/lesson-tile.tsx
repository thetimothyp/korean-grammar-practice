import GridTileLink from "./grid-tile-link";

const MAX_TITLE_LENGTH = 50;
const MAX_SUMMARY_LENGTH = 120;

export default function LessonTile({ lesson } : { lesson: { id: string, title: string, summary: string, exercise_count: number, author: string } }) {
  if (lesson.title.length > MAX_TITLE_LENGTH) {
    lesson.title = lesson.title.substring(0, MAX_TITLE_LENGTH) + '...';
  }

  if (lesson.summary.length > MAX_SUMMARY_LENGTH) {
    lesson.summary = lesson.summary.substring(0, MAX_SUMMARY_LENGTH) + '...';
  }

  return (
    <GridTileLink href={`/lessons/${lesson.id}/view`} color='yellow'>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{lesson.title}</h3>
        <p className="text-zinc-500">{lesson.summary}</p>
      </div>
      <p className="text-lg font-bold">
        {lesson.author}
      </p>
    </GridTileLink>
  );
}