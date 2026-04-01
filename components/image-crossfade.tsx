"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface CrossfadeImage {
  src: string;
  alt: string;
}

interface ImageCrossfadeProps {
  images: CrossfadeImage[];
  className?: string;
}

export function ImageCrossfade({ images, className = "" }: ImageCrossfadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {images.map((image, index) => {
        const start = index / images.length;
        const peak = (index + 0.5) / images.length;
        const end = (index + 1) / images.length;

        return (
          <CrossfadeLayer
            key={image.src}
            image={image}
            scrollYProgress={scrollYProgress}
            start={start}
            peak={peak}
            end={end}
            isFirst={index === 0}
          />
        );
      })}
    </div>
  );
}

function CrossfadeLayer({
  image,
  scrollYProgress,
  start,
  peak,
  end,
  isFirst,
}: {
  image: CrossfadeImage;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  peak: number;
  end: number;
  isFirst: boolean;
}) {
  const opacity = useTransform(
    scrollYProgress,
    isFirst ? [start, peak, end] : [start, peak, end],
    isFirst ? [1, 1, 0] : [0, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.05]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 will-change-[transform,opacity]"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </motion.div>
  );
}
