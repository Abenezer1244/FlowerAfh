"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(
        ".gsap-hero-gallery",
        { y: 50, opacity: 0, rotateX: -20, transformPerspective: 800 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );

      // Scattered fly-in for gallery items
      itemsRef.current.forEach((item) => {
        if (!item) return;
        const randomX = (Math.random() - 0.5) * 300;
        const randomY = 150 + Math.random() * 250;
        const randomRot = (Math.random() - 0.5) * 30;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: randomX,
            y: randomY,
            rotation: randomRot,
            scale: 0.6,
            filter: "blur(15px)",
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Mouse parallax on gallery wrapper
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(wrapper, { x: xPos, y: yPos, duration: 1.5, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="gsap-hero-gallery text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
              [ OUR HOME ]
            </span>
            <h1 className="gsap-hero-gallery text-5xl lg:text-7xl tracking-tight leading-[1.05] font-display font-normal mb-8">
              Life in <span className="text-brand-accent">vivid detail.</span>
            </h1>
            <p className="gsap-hero-gallery text-base md:text-lg text-brand-muted leading-relaxed max-w-2xl mb-8">
              Explore our gallery to experience the vibrant daily life,
              beautifully serene environments, and heartfelt moments of
              connection that define our community.
            </p>
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="relative pb-32 z-10">
        <div ref={wrapperRef} className="w-full">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.src}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="break-inside-avoid mb-4 relative rounded-sm overflow-hidden group border border-brand-border/30 bg-brand-subtle"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
