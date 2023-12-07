'use client';

import NewConceptForm from "../ui/admin/new-concept-form";

export default async function Admin() {
  return (
    <main className="flex min-h-screen flex-col p-6 w-screen justify-center items-center content-center">
      <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-2/5 md:px-20">
        <NewConceptForm />
      </div>
    </main>
  )
}