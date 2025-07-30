import { getGardenNote } from '../../../lib/markdown';
import { notFound } from 'next/navigation';

interface Params {
  params: { slug: string };
}

export default async function NotePage({ params }: Params) {
  try {
    const html = await getGardenNote(params.slug);
    return (
      <main className="p-4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
  } catch {
    notFound();
  }
}
