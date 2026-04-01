import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { ScrollSection } from "@/components/scroll-section";
import { SITE } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div>
      {/* Split layout */}
      <section className="min-h-screen lg:flex">
        {/* Left: Photo */}
        <div className="relative h-[40vh] lg:h-auto lg:w-[55%]">
          <Image
            src="/images/living/living-01.jpg"
            alt="Warm living room at Flower AFH"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right: Form */}
        <div className="flex items-center px-6 py-16 lg:w-[45%] lg:px-12 lg:py-24">
          <div className="mx-auto w-full max-w-md">
            <ScrollSection>
              <h1 className="font-serif text-3xl font-bold text-text-heading sm:text-4xl">
                Let&apos;s start the conversation.
              </h1>
              <p className="mt-3 text-text-body">
                Reach out today — we&apos;re here to answer every question and
                help your family find peace of mind.
              </p>
            </ScrollSection>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <ScrollSection>
              <h3 className="font-serif text-lg font-semibold text-text-heading">
                Address
              </h3>
              <p className="mt-2 text-sm text-text-body">{SITE.address}</p>
            </ScrollSection>
            <ScrollSection delay={0.1}>
              <h3 className="font-serif text-lg font-semibold text-text-heading">
                Phone
              </h3>
              <p className="mt-2 text-sm text-text-body">
                <a href={`tel:${SITE.phone1.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent-green">
                  {SITE.phone1}
                </a>
              </p>
              <p className="mt-1 text-sm text-text-body">
                <a href={`tel:${SITE.phone2.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-accent-green">
                  {SITE.phone2}
                </a>
              </p>
            </ScrollSection>
            <ScrollSection delay={0.2}>
              <h3 className="font-serif text-lg font-semibold text-text-heading">
                Email
              </h3>
              <p className="mt-2 text-sm text-text-body">
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent-green">
                  {SITE.email}
                </a>
              </p>
              <p className="mt-2 text-sm text-text-body">{SITE.hours}</p>
            </ScrollSection>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${SITE.mapQuery}&zoom=15`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Flower Adult Family Home location"
          className="grayscale-[30%] contrast-[1.1]"
        />
      </section>

      {/* Closing line */}
      <section className="bg-bg-card py-16 text-center">
        <ScrollSection>
          <p className="font-serif text-xl italic text-text-heading sm:text-2xl">
            Every call, every visit, every question — handled with care.
          </p>
        </ScrollSection>
      </section>
    </div>
  );
}
