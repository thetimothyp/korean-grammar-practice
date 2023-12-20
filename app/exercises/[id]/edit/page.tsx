import { fetchExercise } from "@/app/lib/data";
import EditExerciseForm from "@/app/ui/edit-exercise-form";

// https://stackoverflow.com/a/58692591
function flattenLessons(exercise: any[]): any {
  const arrayObj = exercise.reduce((obj, row) => {
    if (row.eid in obj) {
      obj[row.eid].lessons.push({
        id: row.lid,
        title: row.lesson_title,
        summary: row.lesson_summary
      });
    } else {
      obj[row.eid] = {
        id: row.eid,
        nl_text: row.nl_text,
        tl_text: row.tl_text,
        lessons: [{
          id: row.lid,
          title: row.lesson_title,
          summary: row.lesson_summary
        }]
      };
    }
    return obj;
  }, {});
  return Object.values(arrayObj)[0];
}

export default async function EditExercise({ params }: { params: { id: string } }) {
  const exercise = await fetchExercise(params.id);
  const flattenedExercise = flattenLessons(exercise);
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <EditExerciseForm
        id={flattenedExercise.id}
        initialNlText={flattenedExercise.nl_text}
        initialTlText={flattenedExercise.tl_text}
        lessons={flattenedExercise.lessons} />
    </main>
  )
}