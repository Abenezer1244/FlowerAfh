"use client";

import { useState, FormEvent } from "react";
import { SITE, CARE_TYPE_OPTIONS } from "@/lib/constants";

interface ContactFormProps {
  variant: "contact" | "cta";
}

export default function ContactForm({ variant }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", SITE.web3formsKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 py-16 ${variant === "cta" ? "text-brand-bg" : "text-brand-dark"}`}>
        <iconify-icon icon="solar:check-circle-linear" width="48" height="48" class="text-brand-accent" />
        <h3 className="text-2xl font-display tracking-tight">Message Sent!</h3>
        <p className={`text-sm ${variant === "cta" ? "text-brand-muted-dark" : "text-brand-muted"}`}>
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-medium tracking-wider uppercase text-brand-accent border-b border-brand-accent pb-0.5"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">First Name</label>
            <input type="text" name="first_name" required className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark" placeholder="Jane" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">Last Name</label>
            <input type="text" name="last_name" required className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark" placeholder="Doe" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">Email Address</label>
          <input type="email" name="email" required className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark" placeholder="jane@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">Phone Number</label>
          <input type="tel" name="phone" className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark" placeholder="(555) 000-0000" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wider">How can we help?</label>
          <textarea rows={4} name="message" required className="w-full bg-transparent border-b border-brand-border py-2 text-base text-brand-dark focus:outline-none focus:border-brand-accent transition-colors rounded-none placeholder-brand-muted-dark resize-none" placeholder="Tell us a little about your needs..." />
        </div>
        <button type="submit" disabled={status === "submitting"} className="mt-4 bg-brand-dark text-brand-bg px-8 py-4 text-sm font-medium hover:bg-brand-accent transition-colors w-fit flex items-center gap-3 disabled:opacity-50">
          {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}{" "}
          <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
        </button>
        {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
      </form>
    );
  }

  // CTA variant
  return (
    <div className="bg-brand-darker rounded-2xl p-8 md:p-10 border border-brand-border-dark">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 relative">
            <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">Your Name</label>
            <input type="text" name="name" required className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors" />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">Phone Number</label>
            <input type="tel" name="phone" className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors" />
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">Email Address</label>
          <input type="email" name="email" required className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors" />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">Type of Care Needed</label>
          <select name="care_type" defaultValue="" className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors appearance-none cursor-pointer rounded-none">
            {CARE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-brand-darker">{opt.label}</option>
            ))}
          </select>
          <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16" class="absolute right-0 bottom-3 text-brand-muted-dark pointer-events-none" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
        </div>
        <div className="flex flex-col gap-2 relative mb-2">
          <label className="text-xs font-medium tracking-wider text-brand-muted-dark uppercase">Message or Questions</label>
          <textarea rows={3} name="message" className="bg-transparent border-b border-[#544e47] text-sm text-brand-bg py-2 focus:outline-none focus:border-brand-accent transition-colors resize-none" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <input type="checkbox" id="terms" required className="w-4 h-4 border border-[#544e47] rounded-sm checked:bg-brand-accent checked:border-brand-accent cursor-pointer transition-colors bg-transparent accent-brand-accent" />
          <label htmlFor="terms" className="text-xs text-brand-muted-dark cursor-pointer">I agree to the Terms &amp; Privacy Policy</label>
        </div>
        <button type="submit" disabled={status === "submitting"} className="bg-brand-bg hover:bg-brand-accent hover:text-brand-bg text-brand-dark text-xs font-medium tracking-wider uppercase py-4 rounded transition-colors w-full flex justify-center items-center gap-2 disabled:opacity-50">
          {status === "submitting" ? "SUBMITTING..." : "SUBMIT INQUIRY"}{" "}
          <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14" style={{ strokeWidth: "1.5px" } as React.CSSProperties} />
        </button>
        {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
