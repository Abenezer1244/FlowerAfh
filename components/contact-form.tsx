"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, RELATIONSHIP_OPTIONS } from "@/lib/constants";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", SITE.web3formsKey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    }
    setSubmitting(false);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="mb-4 text-accent-green">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold text-text-heading">
            Thank you.
          </h3>
          <p className="mt-2 text-text-body">
            We&apos;ll be in touch within 24 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Honeypot */}
          <input type="checkbox" name="botcheck" className="hidden" />

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-text-heading">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-text-heading">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-heading">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="relationship" className="mb-1 block text-sm font-medium text-text-heading">
              Relationship to Resident
            </label>
            <select
              id="relationship"
              name="relationship"
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            >
              <option value="">Select...</option>
              {RELATIONSHIP_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-text-heading">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <div>
            <label htmlFor="tour_date" className="mb-1 block text-sm font-medium text-text-heading">
              Preferred Tour Date
            </label>
            <input
              type="date"
              id="tour_date"
              name="tour_date"
              className="w-full rounded-lg border border-border-warm bg-white px-4 py-3 text-text-heading transition-colors focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-accent-green to-accent-green-light py-3 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(45,106,79,0.4)] disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
