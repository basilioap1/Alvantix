import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const INQUIRY_TYPES = [
  'Commercial Partnership',
  'Commodity Trade',
  'Wine Distribution',
  'Technology Project',
  'Investment / Co-investment',
  'Advisory & Consulting',
  'Other',
];

const INITIAL = {
  name: '',
  company: '',
  email: '',
  country: '',
  inquiry_type: '',
  message: '',
};

const RULES = {
  name: (v) => v.trim().length < 2 ? 'Please enter your full name.' : '',
  company: (v) => v.trim().length < 2 ? 'Please enter your company or organisation name.' : '',
  email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email address.' : '',
  country: (v) => v.trim().length < 2 ? 'Please enter your country.' : '',
  inquiry_type: (v) => !v ? 'Please select the nature of your enquiry.' : '',
  message: (v) => v.trim().length < 30 ? 'Please provide a brief description (min. 30 characters).' : '',
};

function Field({ label, error, touched, required, children }) {
  const hasError = touched && error;
  return (
    <div className="relative">
      <label className={`text-[9px] tracking-[0.28em] uppercase font-body block mb-2.5 transition-colors ${
        hasError ? 'text-red-400/70' : 'text-primary-foreground/30'
      }`}>
        {label}{required && <span className="text-copper ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 mt-2 text-[10px] text-red-400/80 font-body"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase = (hasError) =>
  `w-full bg-transparent border-b pb-2.5 text-sm font-body text-primary-foreground focus:outline-none transition-colors placeholder:text-primary-foreground/15 ${
    hasError
      ? 'border-red-400/40 focus:border-red-400/70'
      : 'border-primary-foreground/15 focus:border-copper'
  }`;

export default function LeadForm() {
  const [form, setForm] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = Object.fromEntries(
    Object.entries(RULES).map(([k, fn]) => [k, fn(form[k])])
  );
  const isValid = Object.values(errors).every((e) => !e);

  const touch = (key) => setTouched((t) => ({ ...t, [key]: true }));
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const showError = (key) => (touched[key] || submitAttempted) && errors[key];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isValid) return;

    setSending(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: 'info@alvantix.com',
        subject: `[${form.inquiry_type}] New qualified enquiry from ${form.name} — ${form.company}`,
        body: `QUALIFIED LEAD — ALVANTIX\n\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nCountry: ${form.country}\nEnquiry Type: ${form.inquiry_type}\n\nMessage:\n${form.message}`,
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 py-8"
      >
        <div className="w-10 h-10 border border-copper/30 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-copper" />
        </div>
        <div>
          <p className="font-heading text-2xl md:text-3xl text-primary-foreground mb-2">
            Enquiry received.
          </p>
          <p className="font-body text-sm leading-[1.8] text-primary-foreground/40 max-w-sm">
            Thank you, <span className="text-primary-foreground/70">{form.name}</span>. A member of our team will review your enquiry and respond within 2 business days. All communications are handled with complete discretion.
          </p>
        </div>
        <div className="mt-4 pt-6 border-t border-primary-foreground/10">
          <p className="text-[9px] tracking-[0.22em] uppercase text-primary-foreground/20 font-body">
            Ref: {form.inquiry_type} · {form.company}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Row 1 — Name + Company */}
      <div className="grid sm:grid-cols-2 gap-8">
        <Field label="Full Name" error={errors.name} touched={touched.name || submitAttempted} required>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            onBlur={() => touch('name')}
            placeholder="John Smith"
            className={inputBase(showError('name'))}
          />
        </Field>
        <Field label="Company / Organisation" error={errors.company} touched={touched.company || submitAttempted} required>
          <input
            type="text"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            onBlur={() => touch('company')}
            placeholder="Acme Holdings Ltd."
            className={inputBase(showError('company'))}
          />
        </Field>
      </div>

      {/* Row 2 — Email + Country */}
      <div className="grid sm:grid-cols-2 gap-8">
        <Field label="Email Address" error={errors.email} touched={touched.email || submitAttempted} required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            onBlur={() => touch('email')}
            placeholder="john@company.com"
            className={inputBase(showError('email'))}
          />
        </Field>
        <Field label="Country" error={errors.country} touched={touched.country || submitAttempted} required>
          <input
            type="text"
            value={form.country}
            onChange={(e) => set('country', e.target.value)}
            onBlur={() => touch('country')}
            placeholder="United States"
            className={inputBase(showError('country'))}
          />
        </Field>
      </div>

      {/* Row 3 — Enquiry type */}
      <Field label="Nature of Enquiry" error={errors.inquiry_type} touched={touched.inquiry_type || submitAttempted} required>
        <div className="relative">
          <select
            value={form.inquiry_type}
            onChange={(e) => { set('inquiry_type', e.target.value); touch('inquiry_type'); }}
            onBlur={() => touch('inquiry_type')}
            className={`appearance-none w-full bg-transparent pb-2.5 text-sm font-body focus:outline-none transition-colors cursor-pointer border-b ${
              showError('inquiry_type')
                ? 'border-red-400/40 text-primary-foreground/50'
                : 'border-primary-foreground/15 focus:border-copper text-primary-foreground/50'
            } ${form.inquiry_type ? '!text-primary-foreground' : ''}`}
          >
            <option value="" disabled className="bg-foreground text-primary-foreground/40">Select enquiry type...</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t} className="bg-foreground text-primary-foreground">{t}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-0 top-0.5 w-3.5 h-3.5 text-primary-foreground/25 pointer-events-none" />
        </div>
      </Field>

      {/* Row 4 — Message */}
      <Field label="Brief Description" error={errors.message} touched={touched.message || submitAttempted} required>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          onBlur={() => touch('message')}
          placeholder="Please describe the nature of your enquiry, your organisation's background, and what you are looking to explore with Alvantix."
          className={`${inputBase(showError('message'))} resize-none leading-[1.7]`}
        />
        <p className="mt-1.5 text-right text-[9px] text-primary-foreground/20 font-body tabular-nums">
          {form.message.length} chars{form.message.length < 30 ? ` — ${30 - form.message.length} more required` : ''}
        </p>
      </Field>

      {/* Disclaimer */}
      <p className="text-[9px] leading-[1.7] text-primary-foreground/20 font-body border-l border-primary-foreground/10 pl-3">
        All submissions are treated with complete confidentiality. We engage exclusively at principal level. By submitting this form you consent to Alvantix LLC processing your contact details for the purpose of responding to your enquiry.
      </p>

      {/* Submit */}
      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-3 bg-copper text-foreground px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-body font-medium hover:bg-copper/80 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <span className="w-3.5 h-3.5 border border-foreground/40 border-t-foreground rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Submit Enquiry
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>

        {submitAttempted && !isValid && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-red-400/70 font-body"
          >
            Please review the fields above.
          </motion.p>
        )}
      </div>
    </form>
  );
}