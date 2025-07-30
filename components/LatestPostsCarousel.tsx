"use client";
import type { CarouselNote } from "./VerticalCarousel";

interface LatestPostsCarouselProps {
  notes: CarouselNote[];
}

export default function LatestPostsCarousel({ notes }: LatestPostsCarouselProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Latest Posts</h2>
      <div className="grid max-h-[80vh] grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2">
        {notes.map((n) => (
          <div
            key={n.id}
            className="rounded border bg-white p-4 dark:bg-gray-900"
          >
            <p className="whitespace-pre-wrap break-words">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
