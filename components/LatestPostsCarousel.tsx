"use client";
import { useRef } from "react";
import type { CarouselNote } from "./VerticalCarousel";

interface LatestPostsCarouselProps {
  notes: CarouselNote[];
}

export default function LatestPostsCarousel({ notes }: LatestPostsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = containerRef.current;
    if (el) {
      const width = el.clientWidth;
      el.scrollBy({ left: width * dir, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Latest Posts</h2>
        <div className="space-x-2">
          <button
            onClick={() => scroll(-1)}
            className="rounded border px-2 py-1 text-sm"
          >
            Prev
          </button>
          <button
            onClick={() => scroll(1)}
            className="rounded border px-2 py-1 text-sm"
          >
            Next
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory space-x-4 overflow-x-auto pb-2"
      >
        {notes.map((n) => (
          <div
            key={n.id}
            className="w-64 flex-shrink-0 snap-start rounded border bg-white p-4 dark:bg-gray-900"
          >
            {n.content}
          </div>
        ))}
      </div>
    </div>
  );
}
