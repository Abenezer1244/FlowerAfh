"use client";

import GsapFadeUp from "@/components/gsap-fade-up";
import {
  CARE_APPROACH_STEPS,
  CORE_SERVICES,
  SPECIALTIES,
  AMENITIES,
  ADMISSION_STEPS,
  PAYMENT_METHODS,
  CARE_LEVELS,
  INCLUDED_IN_CARE,
} from "@/lib/constants";

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-6">
              [ OUR SERVICES ]
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl tracking-tight leading-[1.05] font-display font-normal mb-8">
              Comprehensive care, <br />
              <span className="text-brand-accent">tailored to you.</span>
            </h1>
            <p className="text-base md:text-lg text-brand-muted leading-relaxed max-w-2xl mb-16">
              We offer a wide spectrum of personalized services designed to
              support physical health, cognitive well-being, and emotional
              fulfillment in a warm, residential setting.
            </p>
          </GsapFadeUp>

          <GsapFadeUp className="w-full aspect-[21/9] md:aspect-[24/9] bg-brand-subtle rounded-sm overflow-hidden relative mt-8">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
              alt="Serene home environment"
              className="w-full h-full object-cover"
            />
          </GsapFadeUp>
        </div>
      </section>

      {/* Care Approach Section */}
      <section className="relative bg-brand-subtle/40 text-brand-dark py-32 z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <GsapFadeUp className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
                [ METHODOLOGY ]
              </span>
              <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal mb-6">
                Our Care Approach
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                We don&apos;t believe in a one-size-fits-all model. Our approach
                is deeply iterative and collaborative, ensuring every
                resident&apos;s care plan evolves exactly as their needs do.
              </p>
            </GsapFadeUp>

            <div className="lg:col-span-8 space-y-16">
              {CARE_APPROACH_STEPS.map((step, i) => (
                <GsapFadeUp
                  key={step.number}
                  className={`flex flex-col md:flex-row gap-8 items-start ${
                    i < CARE_APPROACH_STEPS.length - 1
                      ? "pb-16 border-b border-brand-border"
                      : ""
                  }`}
                >
                  <span className="text-3xl tracking-tight font-normal text-brand-accent font-display">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-2xl tracking-tight font-display font-normal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </GsapFadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="relative bg-brand-bg py-32 z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
              [ DAILY LIVING ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-display font-normal mb-6">
              Core Services
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              Our foundation is built on uncompromising daily support. We handle
              the complexities of care so residents can focus on living joyfully.
            </p>
          </GsapFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((service) => (
              <GsapFadeUp
                key={service.title}
                className="bg-white/40 border border-brand-border p-8 rounded-sm hover:bg-white/60 transition-colors"
              >
                <iconify-icon icon={service.icon} width="24" height="24" class="text-brand-accent mb-6 block" style={{ strokeWidth: "1.5px" }} />
                <h3 className="text-xl tracking-tight font-display font-normal mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {service.description}
                </p>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <GsapFadeUp className="mb-20">
            <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase block mb-4">
              [ ADVANCED CARE ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-display font-normal mb-6 max-w-2xl">
              Our Specialties
            </h2>
          </GsapFadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {SPECIALTIES.map((s) => (
              <GsapFadeUp key={s.title} className="group flex flex-col">
                <div className="w-full aspect-video bg-brand-darker rounded-sm overflow-hidden mb-8 border border-brand-border-dark">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <h3 className="text-2xl tracking-tight font-display font-normal mb-4">
                  {s.title}
                </h3>
                <p className="text-sm text-brand-muted-dark leading-relaxed mb-6">
                  {s.description}
                </p>
                <ul className="space-y-3 mt-auto">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs text-brand-bg">
                      <iconify-icon icon="solar:check-circle-linear" class="text-brand-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </GsapFadeUp>
            ))}
          </div>
        </div>
        <iconify-icon icon="solar:medical-kit-linear" width="400" height="400" class="absolute -left-32 -top-32 text-brand-bg opacity-[0.02] pointer-events-none" style={{ strokeWidth: "1px" }} />
      </section>

      {/* Amenities Section */}
      <section className="relative bg-brand-bg py-32 z-10 border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="text-center mb-20">
            <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
              [ THE ENVIRONMENT ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal">
              Facility Amenities
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed mt-6 max-w-xl mx-auto">
              Comfort is integral to well-being. Our home is intentionally
              designed to provide the highest standards of safety without
              compromising on elegance and warmth.
            </p>
          </GsapFadeUp>

          <div className="border-t border-brand-border">
            {AMENITIES.map((a) => (
              <GsapFadeUp
                key={a.title}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-brand-border gap-4 transition-colors hover:bg-white/40 px-4 -mx-4 rounded-sm cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-brand-subtle rounded-full text-brand-dark">
                    <iconify-icon icon={a.icon} width="24" height="24" style={{ strokeWidth: "1.5px" }} />
                  </div>
                  <h3 className="text-xl tracking-tight font-display font-normal">
                    {a.title}
                  </h3>
                </div>
                <p className="text-sm text-brand-muted md:text-right max-w-sm">
                  {a.description}
                </p>
              </GsapFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="relative bg-brand-bg py-32 z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <GsapFadeUp className="lg:col-span-5">
              <span className="text-xs font-medium tracking-widest text-brand-accent uppercase block mb-4">
                [ GETTING STARTED ]
              </span>
              <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal mb-6">
                Your path to peace of mind.
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed mb-8">
                We understand that choosing a care home is one of the most important decisions your family will make. Our process is designed to be transparent, supportive, and pressure-free.
              </p>

              <div className="bg-brand-subtle/60 border border-brand-border rounded-lg p-6">
                <h3 className="text-lg font-display tracking-tight mb-4">Conditions We Support</h3>
                <ul className="space-y-2">
                  {CARE_LEVELS.map((level) => (
                    <li key={level} className="flex items-start gap-3 text-sm text-brand-muted">
                      <iconify-icon icon="solar:check-circle-linear" class="text-brand-accent mt-0.5 shrink-0" />
                      {level}
                    </li>
                  ))}
                </ul>
              </div>
            </GsapFadeUp>

            <div className="lg:col-span-7 space-y-12">
              {ADMISSION_STEPS.map((step, i) => (
                <GsapFadeUp
                  key={step.number}
                  className={`flex flex-col sm:flex-row gap-6 items-start ${
                    i < ADMISSION_STEPS.length - 1 ? "pb-12 border-b border-brand-border" : ""
                  }`}
                >
                  <span className="text-3xl tracking-tight font-normal text-brand-accent font-display shrink-0">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-2xl tracking-tight font-display font-normal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </GsapFadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Payment Section */}
      <section className="relative bg-brand-dark text-brand-bg py-32 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <GsapFadeUp className="mb-20 max-w-2xl">
            <span className="text-xs font-medium tracking-widest text-brand-muted-dark uppercase block mb-4">
              [ PRICING & PAYMENT ]
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight font-display font-normal mb-6">
              Transparent, personalized pricing.
            </h2>
            <p className="text-sm text-brand-muted-dark leading-relaxed">
              Every resident&apos;s needs are unique, so we provide customized quotes based on the level of care required. Contact us for a no-obligation consultation and personalized rate.
            </p>
          </GsapFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {PAYMENT_METHODS.map((method) => (
              <GsapFadeUp
                key={method.title}
                className="border border-brand-border-dark rounded-xl p-8 bg-brand-darker/50 hover:bg-brand-darker transition-colors"
              >
                <iconify-icon icon={method.icon} width="24" height="24" class="text-brand-accent mb-4 block" style={{ strokeWidth: "1.5px" }} />
                <h3 className="text-xl tracking-tight font-display font-normal mb-3">
                  {method.title}
                </h3>
                <p className="text-sm text-brand-muted-dark leading-relaxed">
                  {method.description}
                </p>
              </GsapFadeUp>
            ))}
          </div>

          <GsapFadeUp className="bg-brand-darker border border-brand-border-dark rounded-xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl tracking-tight font-display font-normal mb-6">
                  What&apos;s included in your care
                </h3>
                <ul className="space-y-3">
                  {INCLUDED_IN_CARE.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-brand-bg">
                      <iconify-icon icon="solar:check-circle-linear" class="text-brand-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-brand-muted-dark text-sm leading-relaxed mb-6">
                  Our all-inclusive approach means no surprise charges. The monthly rate covers everything your loved one needs for comfortable, dignified daily living.
                </p>
                <a
                  href="/contact"
                  className="bg-brand-bg hover:bg-brand-accent hover:text-brand-bg text-brand-dark text-xs font-medium tracking-wider uppercase py-4 px-8 rounded transition-colors w-fit flex items-center gap-2"
                >
                  REQUEST A PERSONALIZED QUOTE
                  <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14" style={{ strokeWidth: "1.5px" }} />
                </a>
              </div>
            </div>
          </GsapFadeUp>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section className="relative bg-brand-accent text-brand-bg py-32 z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <iconify-icon icon="solar:quote-left-linear" width="48" height="48" class="text-brand-bg/30 mb-8 inline-block" style={{ strokeWidth: "1.5px" }} />
          <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] font-display font-normal mb-8">
            Care is not merely a service we provide; it is the environment we
            cultivate. We believe every individual deserves to age with profound
            dignity, surrounded by unwavering warmth.
          </h2>
          <p className="text-sm font-medium tracking-widest uppercase mt-12 text-brand-bg/80">
            — The Flower Family Promise
          </p>
        </div>
      </section>
    </main>
  );
}
