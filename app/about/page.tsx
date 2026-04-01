import Image from "next/image";
import Link from "next/link";
import { ScrollSection } from "@/components/scroll-section";
import { ParallaxImage } from "@/components/parallax-image";
import { ValueCard } from "@/components/value-card";
import { TeamCard } from "@/components/team-card";
import { VALUES, TEAM, TRUST_BADGES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh]">
        <ParallaxImage
          src="/images/hero/exterior-01.jpg"
          alt="Flower Adult Family Home exterior"
          className="h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="max-w-3xl text-center font-serif text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Built on compassion. Driven by purpose.
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollSection direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/community/caregiver-02.jpg"
                alt="Tesfaye and Abeba"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollSection>

          <ScrollSection direction="right">
            <h2 className="font-serif text-3xl font-bold text-text-heading sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-text-body">
              <p>
                Tesfaye and Abeba came to America from Ethiopia carrying little
                more than their faith and a dream. The years that followed were
                far from easy — long hours, language barriers, the quiet weight
                of starting over in an unfamiliar place.
              </p>
              <p>
                But through every hardship, two things sustained them: a deep
                trust in God&apos;s plan, and a cultural value they carried from
                home — that caring for elders is sacred. In Ethiopian tradition,
                you don&apos;t send your parents away. You bring them closer. You
                honor them.
              </p>
              <p>
                That calling led them to open Flower Adult Family Home. Not a
                facility — a home. A place where every resident is treated with
                the same dignity, warmth, and love they would give their own
                parents. Where meals are cooked with care, where names are known,
                and where no one is ever just a number.
              </p>
              <p className="font-serif text-xl font-semibold text-text-heading">
                &ldquo;We didn&apos;t build a facility. We opened our
                home.&rdquo;
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollSection>
            <h2 className="text-center font-serif text-3xl font-bold text-text-heading sm:text-4xl">
              Our Team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-text-body">
              A dedicated team of caregivers who treat every resident like
              family.
            </p>
          </ScrollSection>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <ScrollSection key={member.name} delay={i * 0.1}>
                <TeamCard {...member} />
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollSection>
            <h2 className="text-center font-serif text-3xl font-bold text-text-heading sm:text-4xl">
              Our Values
            </h2>
          </ScrollSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <ScrollSection key={value.title} delay={i * 0.1}>
                <ValueCard {...value} />
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <ScrollSection key={badge.label}>
                <div className="text-center">
                  {badge.value && (
                    <p className="font-serif text-3xl font-bold text-accent-green">
                      {badge.value}
                    </p>
                  )}
                  <p className="mt-1 text-sm font-medium text-text-body">
                    {badge.label}
                  </p>
                  <div className="mx-auto mt-2 h-0.5 w-8 bg-accent-gold/50" />
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <ScrollSection>
          <h2 className="font-serif text-3xl font-bold text-text-heading sm:text-4xl">
            Come see the difference in person.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent-green to-accent-green-light px-8 py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)]"
          >
            Schedule a Tour
          </Link>
        </ScrollSection>
      </section>
    </div>
  );
}
