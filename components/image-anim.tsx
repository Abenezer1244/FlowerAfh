"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageAnimProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageAnim({ src, alt, className = "" }: ImageAnimProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cols = 4;

    const ctx = gsap.context(() => {
      for (let i = 0; i < cols; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "absolute inset-0 overflow-hidden rounded-sm";

        const left = (i / cols) * 100;
        const right = 100 - ((i + 1) / cols) * 100;
        wrapper.style.clipPath = `inset(0 ${right}% 0 ${left}%)`;
        wrapper.style.webkitClipPath = `inset(0 ${right}% 0 ${left}%)`;

        const innerImg = document.createElement("img");
        innerImg.src = src;
        innerImg.alt = alt;
        innerImg.className = "absolute w-full object-cover";
        innerImg.style.height = "140%";
        innerImg.style.top = "-20%";
        innerImg.style.left = "0";

        wrapper.appendChild(innerImg);
        container.appendChild(wrapper);

        gsap.fromTo(
          innerImg,
          { yPercent: i % 2 === 0 ? -15 : -5 },
          {
            yPercent: i % 2 === 0 ? 15 : 5,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          innerImg,
          { filter: "blur(12px) brightness(0.9)" },
          {
            filter: "blur(0px) brightness(1)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 95%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
      const dynamicEls = container.querySelectorAll("div.absolute");
      dynamicEls.forEach((el) => el.remove());
    };
  }, [src, alt]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-sm bg-brand-subtle ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover opacity-0" />
    </div>
  );
}
