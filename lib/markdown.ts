import { readFile } from 'fs/promises';
import { join } from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export async function getGardenNote(slug: string): Promise<string> {
  const file = join(process.cwd(), 'digital-garden', `${slug}.md`);
  const text = await readFile(file, 'utf8');
  const result = await remark().use(html).process(text);
  return result.toString();
}
