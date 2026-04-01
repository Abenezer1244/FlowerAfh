"use client";

import GsapFadeUp from "@/components/gsap-fade-up";
import ImageAnim from "@/components/image-anim";
import ContactForm from "@/components/contact-form";
import { SITE, ABOUT_TEAM, ABOUT_MILESTONES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            <GsapFadeUp className="lg:col-span-7 z-10">
              <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
                [ ABOUT US ]
              </span>
              <h1 className="text-5xl lg:text-7xl tracking-tight leading-[1.05] font-display font-normal mb-8">
                Redefining care <br />
                <span className="text-brand-accent">with heart and home.</span>
              </h1>
              <p className="text-base md:text-lg text-brand-muted leading-relaxed max-w-xl">
                Flower Adult Family Home was founded on a simple premise: care
                should feel like family. We&apos;ve built an environment where
                dignity, profound comfort, and professional support seamlessly
                intertwine to create a true sanctuary for your loved ones.
              </p>
            </GsapFadeUp>

            <GsapFadeUp className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
              <ImageAnim
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
                alt="Warm caregiver interaction"
                className="w-full max-w-md aspect-[4/5] shadow-2xl"
              />
            </GsapFadeUp>
          </div>
        </div>
      </section>

      {/* Purpose and Vision Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            <GsapFadeUp className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-[#544e47] px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-brand-bg rounded-full" /> Our Purpose
              </span>
              <h2 className="text-3xl md:text-4xl tracking-tight leading-tight font-display font-normal mb-6">
                To provide unwavering support and enrich daily living.
              </h2>
              <p className="text-sm md:text-base text-brand-muted-dark leading-relaxed">
                Our mission is to deliver deeply personalized, compassionate
                care that honors the unique history and individuality of each
                resident. We exist to alleviate the physical and emotional
                burdens of aging and recovery, replacing them with a nurturing
                atmosphere where residents feel genuinely valued,
                unconditionally safe, and at peace. Every action we take is
                guided by empathy and professional excellence.
              </p>
            </GsapFadeUp>

            <GsapFadeUp className="flex flex-col items-start lg:mt-24">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-[#544e47] px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" /> Our Vision
              </span>
              <h2 className="text-3xl md:text-4xl tracking-tight leading-tight font-display font-normal mb-6">
                Setting a new standard for adult family care.
              </h2>
              <p className="text-sm md:text-base text-brand-muted-dark leading-relaxed">
                We envision a community where institutional, impersonal care is
                entirely replaced by warm, residential sanctuaries. A future
                where families never have to compromise between top-tier medical
                assistance and a comfortable, homelike environment. We are
                continuously striving to be the benchmark for adult family homes,
                recognized for our innovative care models and profound dedication
                to human dignity.
              </p>
            </GsapFadeUp>
          </div>
        </div>
        {/* @ts-expect-error — Iconify web component */}
        <iconify-icon icon="solar:stars-linear" width="400" height="400" class="absolute -right-32 -bottom-32 text-brand-bg opacity-[0.02] pointer-events-none" style={{ strokeWidth: "1px" }} />
      </section>

      {/* Our Journey Section */}
      <section className="relative bg-brand-bg text-brand-dark py-32 z-10 border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="text-center mb-24">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
              [ THE HISTORY ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal">
              Our Journey
            </h2>
          </GsapFadeUp>

          <div className="relative border-l border-brand-border ml-4 md:ml-0 md:pl-0 space-y-20">
            {ABOUT_MILESTONES.map((m, i) => (
              <GsapFadeUp key={m.year} className="relative pl-10 md:pl-16">
                <div
                  className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full ring-4 ring-brand-bg ${
                    i === 0
                      ? "bg-brand-accent"
                      : "bg-brand-border transition-colors duration-500 hover:bg-brand-accent"
                  }`}
                />
                <p className="text-xs font-medium tracking-widest text-brand-accent uppercase mb-3">
                  {m.year} &bull; {m.label}
                </p>
                <h3 className="text-2xl md:text-3xl tracking-tight font-display font-normal mb-4">
                  {m.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {m.description}
                </p>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Our People Section */}
      <section className="relative bg-brand-subtle/40 text-brand-dark py-32 z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
                [ THE CARE TEAM ]
              </span>
              <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-display font-normal">
                Meet the hearts behind the home.
              </h2>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed max-w-sm mb-2">
              Our facility is only as exceptional as the people who run it. We
              employ highly trained, empathetic professionals dedicated to
              uplifting our residents every single day.
            </p>
          </GsapFadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {ABOUT_TEAM.map((person) => (
              <GsapFadeUp key={person.name} className="group flex flex-col gap-6">
                <div className="w-full aspect-[4/5] bg-brand-border rounded-sm overflow-hidden relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 object-top"
                  />
                </div>
                <div>
                  <h3 className="text-2xl tracking-tight font-display font-normal">
                    {person.name}
                  </h3>
                  <p className="text-xs font-medium tracking-widest text-brand-accent uppercase mt-2">
                    {person.role}
                  </p>
                  <p className="text-sm text-brand-muted mt-4 leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10 border-t border-brand-border-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <GsapFadeUp className="flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase block mb-6">
                  [ NEXT STEPS ]
                </span>
                <h2 className="text-4xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal mb-8 max-w-md">
                  Take action today.
                </h2>
                <p className="text-sm text-brand-muted-dark leading-relaxed max-w-sm mb-12">
                  Choosing the right home is a significant decision. Let&apos;s
                  start a conversation about your loved one&apos;s unique needs
                  and how our dedicated family can seamlessly support yours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-12 border-t border-brand-border-dark pt-10 mt-8 lg:mt-auto">
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">
                    General Inquiries
                  </span>
                  <a href={`mailto:${SITE.email}`} className="text-sm font-normal hover:text-brand-accent transition-colors">
                    {SITE.email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">
                    Direct Line
                  </span>
                  <a href={`tel:${SITE.phone2}`} className="text-sm font-normal hover:text-brand-accent transition-colors">
                    {SITE.phone2}
                  </a>
                </div>
              </div>
            </GsapFadeUp>

            <GsapFadeUp>
              <ContactForm variant="cta" />
            </GsapFadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
