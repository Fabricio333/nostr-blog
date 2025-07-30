'use client'

import { useState } from 'react';

export interface CarouselNote {
  id: string;
  content: string;
}

interface VerticalCarouselProps {
  notes: CarouselNote[];
}

export default function VerticalCarousel({ notes }: VerticalCarouselProps) {
  const [start, setStart] = useState(0);
  const visible = notes.slice(start, start + 3);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4">
        {visible.map((n) => (
          <div key={n.id} className="rounded border p-4 bg-white dark:bg-gray-900">
            {n.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        <button
          className="rounded border px-2 py-1 text-sm disabled:opacity-50"
          disabled={start === 0}
          onClick={() => setStart(Math.max(start - 1, 0))}
        >
          Up
        </button>
        <button
          className="rounded border px-2 py-1 text-sm disabled:opacity-50"
          disabled={start + 3 >= notes.length}
          onClick={() => setStart(Math.min(start + 1, notes.length - 3))}
        >
          Down
        </button>
      </div>
    </div>
  );
}
