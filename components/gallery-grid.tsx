"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  GALLERY_IMAGES,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from "@/lib/constants";
import { Lightbox } from "./lightbox";

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className="sticky top-[72px] z-30 bg-bg-primary/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 overflow-x-auto px-6 py-4">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "text-accent-green"
                  : "text-text-body hover:text-text-heading"
              }`}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <motion.div
                  layoutId="gallery-tab"
                  className="absolute inset-0 rounded-full border border-accent-green/30 bg-accent-green/5"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((image, i) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group mb-4 cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="p-4 text-sm font-medium text-white">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        images={filtered}
        currentIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev === 0 ? filtered.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev === filtered.length - 1 ? 0 : prev + 1
          )
        }
      />
    </>
  );
}
