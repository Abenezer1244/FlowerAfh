import Link from "next/link";
import { ParallaxImage } from "@/components/parallax-image";
import { ScrollSection } from "@/components/scroll-section";
import { ServiceCard } from "@/components/service-card";
import { SERVICES } from "@/lib/constants";

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh]">
        <ParallaxImage
          src="/images/bedrooms/bedroom-01.jpg"
          alt="Comfortable bedroom at Flower AFH"
          className="h-full"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6 text-center">
          <h1 className="max-w-3xl font-serif text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Comprehensive care, delivered with heart.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Every service tailored to your loved one&apos;s unique needs.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <ScrollSection key={service.title} delay={i * 0.05}>
              <ServiceCard {...service} />
            </ScrollSection>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-bg-card py-24 text-center">
        <ScrollSection>
          <p className="mx-auto max-w-2xl font-serif text-2xl font-semibold text-text-heading sm:text-3xl">
            Every service designed around your loved one&apos;s unique needs.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
          >
            Talk to Our Care Team
          </Link>
        </ScrollSection>
      </section>
    </div>
  );
}
