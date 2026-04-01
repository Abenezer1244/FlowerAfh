"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GsapFadeUp from "@/components/gsap-fade-up";
import ContactForm from "@/components/contact-form";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(
        ".gsap-hero-contact",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );

      // 3D Map animation
      gsap.fromTo(
        "#map-container",
        {
          rotationX: 35,
          rotationY: -10,
          scale: 0.85,
          opacity: 0,
          y: 100,
        },
        {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#map-container",
            start: "top 95%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-brand-border pb-12">
            <div className="max-w-3xl">
              <span className="gsap-hero-contact text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
                [ GET IN TOUCH ]
              </span>
              <h1 className="gsap-hero-contact text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-none font-display font-normal">
                We&apos;re here <br className="hidden sm:block" />{" "}
                <span className="text-brand-accent">to help.</span>
              </h1>
            </div>
            <p className="gsap-hero-contact text-base md:text-lg text-brand-muted leading-relaxed max-w-sm pb-2">
              Reach out to discuss care options, schedule a tour, or ask any
              questions about our family home.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Contact Details */}
      <section className="relative py-12 lg:py-20 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <GsapFadeUp>
              <h2 className="text-3xl lg:text-4xl tracking-tight font-display font-normal mb-8 text-brand-dark">
                Send a message
              </h2>
              <ContactForm variant="contact" />
            </GsapFadeUp>

            {/* Info */}
            <GsapFadeUp className="flex flex-col justify-center gap-12 lg:pl-16 lg:border-l border-brand-border">
              <div>
                <span className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3 flex items-center gap-2">
                  <iconify-icon icon="solar:letter-linear" width="18" height="18" style={{ strokeWidth: "1.5px" }} />
                  Email Us
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-xl sm:text-2xl lg:text-3xl tracking-tight font-display font-normal hover:text-brand-accent transition-colors"
                >
                  {SITE.email}
                </a>
              </div>

              <div>
                <span className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3 flex items-center gap-2">
                  <iconify-icon icon="solar:phone-linear" width="18" height="18" style={{ strokeWidth: "1.5px" }} />
                  Call Us
                </span>
                <a
                  href={`tel:${SITE.phone1.replace(/[^+\d]/g, "")}`}
                  className="text-xl sm:text-2xl lg:text-3xl tracking-tight font-display font-normal hover:text-brand-accent transition-colors"
                >
                  {SITE.phone1}
                </a>
                <p className="text-sm text-brand-muted mt-2">{SITE.hours}</p>
              </div>

              <div>
                <span className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3 flex items-center gap-2">
                  <iconify-icon icon="solar:map-point-linear" width="18" height="18" style={{ strokeWidth: "1.5px" }} />
                  Visit Us
                </span>
                <p className="text-xl sm:text-2xl lg:text-3xl tracking-tight font-display font-normal leading-snug">
                  605 74th St SW
                  <br />
                  Everett, WA 98203
                </p>
              </div>
            </GsapFadeUp>
          </div>
        </div>
      </section>

      {/* 3D Animated Google Map Section */}
      <section className="relative py-12 lg:py-24 z-10 overflow-hidden" style={{ perspective: "1500px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            id="map-container"
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-brand-subtle shadow-[0_20px_50px_rgba(59,54,49,0.1)] origin-bottom transform-gpu overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-brand-dark/5 pointer-events-none z-10" />
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=605+74th+St+SW+Everett+WA+98203`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3) sepia(0.2)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
