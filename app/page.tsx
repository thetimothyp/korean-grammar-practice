import { redirect } from 'next/navigation';

export default async function Home() {
  redirect('/exercises/1');
}
