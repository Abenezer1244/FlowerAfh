"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Beat 1: Hero (0–15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.05]);

  // Beat 2: Care Reveal crossfade images (15–40%)
  const img2aOpacity = useTransform(scrollYProgress, [0.14, 0.18, 0.24, 0.28], [0, 1, 1, 0]);
  const img2bOpacity = useTransform(scrollYProgress, [0.24, 0.28, 0.34, 0.38], [0, 1, 1, 0]);
  const img2cOpacity = useTransform(scrollYProgress, [0.34, 0.38, 0.40, 0.40], [0, 1, 1, 1]);
  const beat2TextOpacity = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);
  const beat2TextX = useTransform(scrollYProgress, [0.16, 0.22], [-40, 0]);

  // Beat 3: Care & Community (40–65%)
  const beat3Opacity = useTransform(scrollYProgress, [0.38, 0.42, 0.62, 0.65], [0, 1, 1, 0]);
  const beat3TextX = useTransform(scrollYProgress, [0.42, 0.48], [40, 0]);

  // Beat 4: Home Quality (65–85%)
  const beat4Opacity = useTransform(scrollYProgress, [0.63, 0.67, 0.82, 0.85], [0, 1, 1, 0]);

  // Beat 5: CTA (85–100%)
  const beat5Opacity = useTransform(scrollYProgress, [0.83, 0.88], [0, 1]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ===== BEAT 1: Hero ===== */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image
              src="/images/hero/hero-living.jpg"
              alt="Warm living room at Flower Adult Family Home"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-4xl font-serif text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-7xl"
            >
              Where Every Day Feels Like Home
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl"
            >
              Compassionate care. Warm spaces. Dignity in every detail.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-2 text-sm text-white/70 sm:text-base"
            >
              A licensed Adult Family Home serving Everett, Washington — where
              your loved one is family.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Learn About Our Care
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-60"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ===== BEAT 2: Care Reveal ===== */}
        <motion.div
          style={{ opacity: img2aOpacity }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src="/images/dining/dining-01.jpg"
            alt="Elegant dining room"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          style={{ opacity: img2bOpacity }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src="/images/bedrooms/bedroom-01.jpg"
            alt="Comfortable bedroom"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          style={{ opacity: img2cOpacity }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src="/images/bathrooms/bathroom-01.jpg"
            alt="Clean accessible bathroom"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Beat 2 copy */}
        <motion.div
          style={{ opacity: beat2TextOpacity, x: beat2TextX }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pb-16 pt-32"
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Thoughtfully designed for comfort and safety.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Every room crafted with accessibility, warmth, and dignity — from
              wide-doorframe bedrooms to spa-inspired bathrooms.
            </p>
            <p className="mt-2 text-sm text-white/60">
              Our home is their home. Every detail matters.
            </p>
          </div>
        </motion.div>

        {/* ===== BEAT 3: Care & Community ===== */}
        <motion.div
          style={{ opacity: beat3Opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/community/games-01.jpg"
            alt="Seniors enjoying activities together"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
          <motion.div
            style={{ x: beat3TextX }}
            className="absolute inset-0 flex items-center justify-end px-6"
          >
            <div className="max-w-lg text-right">
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Care that goes beyond the clinical.
              </h2>
              <ul className="mt-6 space-y-3 text-lg text-white/80">
                <li>Personalized care plans tailored to each resident.</li>
                <li>
                  24/7 caregiver presence — never alone, always supported.
                </li>
                <li>
                  Activities, meals, and moments designed to bring joy.
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* ===== BEAT 4: Home Quality ===== */}
        <motion.div
          style={{ opacity: beat4Opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/bathrooms/bathroom-02.jpg"
            alt="Pristine bathroom with modern fixtures"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              A home built for living well.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              Licensed, inspected, and lovingly maintained — our spaces meet the
              highest Washington State AFH standards while feeling like a true
              home.
            </p>
          </div>
        </motion.div>

        {/* ===== BEAT 5: CTA ===== */}
        <motion.div
          style={{ opacity: beat5Opacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/community/caregiver-01.jpg"
            alt="Caregiver sharing a warm moment"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Your family deserves the very best.
            </h2>
            <p className="mt-4 text-xl text-white/80">
              Let&apos;s talk about care that feels like family.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Contact Us Today
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Serving families across Everett and surrounding Washington
              communities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
