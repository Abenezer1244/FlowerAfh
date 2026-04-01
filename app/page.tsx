"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GsapFadeUp from "@/components/gsap-fade-up";
import ImageAnim from "@/components/image-anim";
import ContactForm from "@/components/contact-form";
import { SITE, STATS, EXPERTISE, TESTIMONIALS, FAQ_ITEMS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-fade-up-home",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden z-10">
        <h1
          className="gsap-fade-up-home absolute top-0 w-full text-center tracking-tighter text-brand-dark select-none z-0 mt-8 opacity-10 font-display font-normal"
          style={{ fontSize: "16vw", lineHeight: "0.8" }}
        >
          FLOWER
        </h1>

        <div className="relative z-10 mx-auto w-11/12 max-w-7xl mt-24 lg:mt-32 shadow-2xl h-[60vh]">
          <ImageAnim
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
            alt="Warm Modern Living Space"
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
          <GsapFadeUp>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight max-w-4xl font-display font-normal">
              Providing compassionate care in a place you can{" "}
              <span className="text-brand-accent font-display font-normal">truly call home.</span>
            </h2>
          </GsapFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-24 items-start">
            <GsapFadeUp className="md:col-span-3">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-brand-border px-3 py-1 rounded-sm">
                <span className="w-1.5 h-1.5 bg-brand-dark rounded-full" /> Our Mission
              </span>
            </GsapFadeUp>
            <GsapFadeUp className="md:col-span-6 flex flex-col gap-6">
              <p className="text-base text-brand-muted leading-relaxed max-w-md">
                Flower Adult Family Home LLC offers a dignified, residential alternative to institutional care. With profound dedication and personalized attention, we support our residents through daily living while ensuring absolute comfort, safety, and peace of mind.
              </p>
              <div>
                <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-medium border-b border-brand-dark pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-all">
                  SPEAK WITH OUR CARE TEAM <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
                </Link>
              </div>
            </GsapFadeUp>
            <GsapFadeUp className="md:col-span-3 text-right">
              <p className="text-7xl tracking-tight font-display font-normal text-brand-accent">24/7</p>
              <p className="text-sm font-medium tracking-wider text-brand-muted uppercase mt-2">Dedicated Care</p>
            </GsapFadeUp>
          </div>

          <GsapFadeUp className="flex flex-wrap items-center justify-between gap-8 mt-32 text-xs font-medium tracking-wider text-brand-accent uppercase">
            <p>BEYOND STANDARD ASSISTANCE.</p>
            <div className="flex gap-4">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=320&q=80" alt="Comfortable Detail" className="w-32 h-20 object-cover bg-brand-subtle rounded-sm" />
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=320&q=80" alt="Home Environment" className="w-32 h-20 object-cover bg-brand-subtle rounded-sm" />
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" alt="Peaceful Space" className="w-32 h-20 object-cover bg-brand-subtle rounded-sm" />
            </div>
            <p>WE FOSTER WELLBEING.</p>
          </GsapFadeUp>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative bg-brand-dark text-brand-bg pt-24 pb-32 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-6">
            <h2 className="text-4xl md:text-5xl tracking-tight uppercase max-w-2xl leading-tight font-display font-normal">
              A sanctuary of comfort and professional care
            </h2>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border border-brand-muted px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-brand-bg rounded-full" /> Why Choose Us
            </span>
          </GsapFadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="flex flex-col gap-12">
              <GsapFadeUp>
                <h3 className="text-3xl tracking-tight text-brand-muted-dark max-w-md leading-snug font-display font-normal">
                  Transforming daily challenges{" "}
                  <span className="text-brand-bg font-display font-normal">into moments of ease</span>{" "}
                  with flawless execution.
                </h3>
              </GsapFadeUp>
              <GsapFadeUp className="flex items-center gap-8 mt-4">
                <div className="bg-brand-darker border border-brand-border-dark rounded-lg p-5 flex flex-col gap-3 min-w-[140px]">
                  <span className="text-xs text-brand-muted-dark font-normal uppercase tracking-wider">State Licensed</span>
                  <div className="flex items-center gap-2 font-medium text-lg tracking-tight text-brand-accent">
                    <iconify-icon icon="solar:shield-check-linear" width="24" height="24" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
                    CERTIFIED
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-display font-normal tracking-tight text-brand-bg mb-2">Personalized Attention</h4>
                  <p className="text-sm text-brand-muted-dark leading-relaxed mb-4 max-w-sm">
                    We maintain an exceptionally low resident-to-staff ratio, ensuring that your loved one receives the immediate, individualized support they deserve in a truly homelike atmosphere.
                  </p>
                  <Link href="/services" className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent border-b border-brand-accent/50 pb-0.5 hover:border-brand-accent transition-all uppercase tracking-wider">
                    Explore Services <iconify-icon icon="solar:arrow-right-up-linear" width="12" height="12" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
                  </Link>
                </div>
              </GsapFadeUp>
            </div>
            <GsapFadeUp className="relative w-full aspect-square max-w-md ml-auto flex items-center justify-center opacity-70">
              <div className="grid grid-cols-12 gap-2 w-full h-full rotate-12 scale-110">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="col-span-12 h-1 border-b border-dashed border-[#544e47]" />
                ))}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-transparent to-transparent" />
                <iconify-icon icon="solar:heart-pulse-linear" width="96" height="96" class="-translate-x-1/2 -translate-y-1/2 text-[#544e47] absolute top-1/2 left-1/2" style={{ strokeWidth: "1px" } as React.CSSProperties} />
              </div>
            </GsapFadeUp>
          </div>

          <GsapFadeUp className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div key={stat.value} className="border border-brand-border-dark rounded-xl p-8 bg-brand-darker/50 hover:bg-brand-darker transition-colors group">
                <div className="flex justify-between items-start mb-6">
                  <p className="text-5xl tracking-tight group-hover:text-brand-accent transition-colors font-display font-normal">
                    {stat.value}<span className="text-2xl text-brand-muted-dark font-display font-normal ml-1">{stat.unit}</span>
                  </p>
                  <iconify-icon icon={stat.icon} width="24" height="24" class="text-brand-muted-dark group-hover:text-brand-accent transition-colors" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
                </div>
                <p className="text-sm text-brand-muted-dark">{stat.description}</p>
              </div>
            ))}
          </GsapFadeUp>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="relative bg-brand-dark text-brand-bg pb-32 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <GsapFadeUp className="flex flex-col gap-6">
              <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase">[ OUR EXPERTISE ]</span>
              <ImageAnim src={EXPERTISE[0].image} alt={EXPERTISE[0].alt} className="w-64 h-64" />
              <div className="flex justify-between text-xs tracking-wider text-brand-muted-dark uppercase font-normal">
                <span>{EXPERTISE[0].labelLeft}</span>
                <span>{EXPERTISE[0].labelRight}</span>
              </div>
              <p className="text-base font-normal">{EXPERTISE[0].title}</p>
            </GsapFadeUp>
            <div className="flex flex-col items-end text-right max-w-xl">
              <GsapFadeUp>
                <h2 className="text-4xl md:text-5xl tracking-tight uppercase mb-6 leading-tight font-display font-normal">TAILORED CARE PLANS</h2>
              </GsapFadeUp>
              <GsapFadeUp>
                <p className="text-sm text-brand-muted-dark leading-relaxed max-w-sm mb-12">
                  We curate specialized care environments that align with specific health requirements. From daily living assistance to advanced memory support, our home adapts to your needs.
                </p>
              </GsapFadeUp>
              <GsapFadeUp className="flex flex-col gap-6 text-left w-64 mr-32">
                <ImageAnim src={EXPERTISE[1].image} alt={EXPERTISE[1].alt} className="w-full h-64" />
                <div className="flex justify-between text-xs tracking-wider text-brand-muted-dark uppercase font-normal">
                  <span>{EXPERTISE[1].labelLeft}</span>
                  <span>{EXPERTISE[1].labelRight}</span>
                </div>
                <p className="text-base font-normal">{EXPERTISE[1].title}</p>
              </GsapFadeUp>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <GsapFadeUp className="md:col-span-4 flex flex-col gap-4">
              <p className="text-6xl text-brand-accent tracking-tight font-display font-normal">3</p>
              <p className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase leading-relaxed max-w-[150px]">CORE PILLARS OF OUR FACILITY</p>
            </GsapFadeUp>
            <GsapFadeUp className="md:col-span-4 flex flex-col justify-end h-full pb-8">
              <h2 className="text-3xl tracking-tight uppercase leading-snug font-display font-normal">EMBODYING<br />TRUE COMPASSION</h2>
              <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-medium border-b border-brand-muted-dark pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-all uppercase tracking-wider mt-6 w-fit text-brand-muted-dark">
                DISCUSS YOUR NEEDS <iconify-icon icon="solar:arrow-right-up-linear" width="12" height="12" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
              </Link>
            </GsapFadeUp>
            <GsapFadeUp className="md:col-span-4 flex flex-col gap-6">
              <ImageAnim src={EXPERTISE[2].image} alt={EXPERTISE[2].alt} className="w-full aspect-[4/3]" />
              <div className="flex justify-between text-xs tracking-wider text-brand-muted-dark uppercase font-normal">
                <span>{EXPERTISE[2].labelLeft}</span>
                <span>{EXPERTISE[2].labelRight}</span>
              </div>
              <p className="text-base font-normal">{EXPERTISE[2].title}</p>
            </GsapFadeUp>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-brand-bg text-brand-dark py-32 z-10 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal max-w-xl">Words from our families</h2>
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase">[ CLIENT PERSPECTIVES ]</span>
          </GsapFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <GsapFadeUp key={t.name} className="border border-brand-border rounded-xl p-8 bg-brand-subtle/30 flex flex-col justify-between group hover:border-brand-accent transition-colors duration-300">
                <div>
                  <iconify-icon icon="solar:quote-right-linear" width="32" height="32" class="text-brand-accent mb-8 opacity-40 group-hover:opacity-100 transition-opacity" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
                  <p className="text-sm text-brand-muted leading-relaxed mb-10">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-border flex items-center justify-center text-brand-dark font-display">{t.initial}</div>
                  <div>
                    <p className="text-sm font-medium text-brand-dark">{t.name}</p>
                    <p className="text-xs uppercase tracking-wider text-brand-accent mt-0.5">{t.role}</p>
                  </div>
                </div>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-brand-subtle/40 text-brand-dark py-32 z-10 border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col items-center text-center mb-16 gap-4">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase">[ INQUIRIES ]</span>
            <h2 className="text-3xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal">Frequently Asked Questions</h2>
          </GsapFadeUp>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((faq) => (
              <GsapFadeUp key={faq.question}>
                <details className="group bg-brand-bg rounded-lg border border-brand-border overflow-hidden transition-all duration-300 hover:border-brand-accent">
                  <summary className="flex justify-between items-center p-6 cursor-pointer text-lg tracking-tight font-display select-none">
                    {faq.question}
                    <span className="transition-transform duration-300 group-open:rotate-180 text-brand-accent flex items-center justify-center">
                      <iconify-icon icon="solar:alt-arrow-down-linear" width="20" height="20" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-sm text-brand-muted leading-relaxed border-t border-brand-border/50 mt-2">{faq.answer}</div>
                </details>
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
                <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase block mb-6">[ INITIATE DIALOGUE ]</span>
                <h2 className="text-4xl md:text-5xl tracking-tight uppercase leading-tight font-display font-normal mb-8 max-w-md">Schedule a tour today.</h2>
                <p className="text-sm text-brand-muted-dark leading-relaxed max-w-sm mb-12">
                  Connect with our care coordinators to explore how Flower Adult Family Home can provide the perfect environment for your loved one. We are ready to answer your questions and guide you through the process.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-12 border-t border-brand-border-dark pt-10 mt-8 lg:mt-auto">
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">General Inquiries</span>
                  <a href={`mailto:${SITE.email}`} className="text-sm font-normal hover:text-brand-accent transition-colors">{SITE.email}</a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs tracking-wider text-brand-muted-dark uppercase font-medium">Direct Line</span>
                  <a href={`tel:${SITE.phone2}`} className="text-sm font-normal hover:text-brand-accent transition-colors">{SITE.phone2}</a>
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
