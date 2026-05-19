import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';

const INTERESTS = [
  'Business Consulting',
  'Commercial Intermediation',
  'Commodity Trade',
  'Technology Projects',
  'Strategic Partnership',
  'Other',
];

const INITIAL_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
};

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission — replace with your actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Delay reset so it doesn't flash on close animation
    setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL_FORM);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-xl bg-background border border-border relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top copper accent line */}
              <div className="h-px bg-copper w-full" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-8 md:px-10 pt-10 pb-10">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Header */}
                      <p className="text-[10px] tracking-[0.32em] uppercase text-copper mb-3 font-body">
                        Initiate a Conversation
                      </p>
                      <h2 className="font-heading text-2xl md:text-3xl font-medium leading-tight mb-1">
                        Get in Touch
                      </h2>
                      <p className="text-sm text-muted-foreground font-body leading-[1.7] mb-8">
                        All enquiries are handled at principal level with full discretion.
                      </p>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name + Company */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2 font-body">
                              Full Name <span className="text-copper">*</span>
                            </label>
                            <input
                              name="name"
                              required
                              value={form.name}
                              onChange={handleChange}
                              placeholder="John Smith"
                              className="w-full bg-transparent border border-border px-3.5 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-copper transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2 font-body">
                              Company / Organisation
                            </label>
                            <input
                              name="company"
                              value={form.company}
                              onChange={handleChange}
                              placeholder="Acme Corp"
                              className="w-full bg-transparent border border-border px-3.5 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-copper transition-colors"
                            />
                          </div>
                        </div>

                        {/* Email + Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2 font-body">
                              Email <span className="text-copper">*</span>
                            </label>
                            <input
                              name="email"
                              type="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                              placeholder="j.smith@email.com"
                              className="w-full bg-transparent border border-border px-3.5 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-copper transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2 font-body">
                              Phone
                            </label>
                            <input
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+1 555 000 0000"
                              className="w-full bg-transparent border border-border px-3.5 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-copper transition-colors"
                            />
                          </div>
                        </div>

                        {/* Area of Interest */}
                        <div>
                          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2 font-body">
                            Area of Interest
                          </label>
                          <select
                            name="interest"
                            value={form.interest}
                            onChange={handleChange}
                            className="w-full bg-background border border-border px-3.5 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-copper transition-colors appearance-none cursor-pointer"
                          >
                            <option value="" className="text-muted-foreground">Select an area…</option>
                            {INTERESTS.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2 font-body">
                            Message
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Briefly describe your enquiry…"
                            className="w-full bg-transparent border border-border px-3.5 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-copper transition-colors resize-none"
                          />
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-[10px] text-muted-foreground/50 font-body">
                            <span className="text-copper">*</span> Required fields
                          </p>
                          <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-7 py-3 text-[11px] tracking-[0.18em] uppercase font-body hover:bg-copper hover:text-foreground transition-all duration-300 disabled:opacity-60"
                          >
                            {loading ? (
                              <>
                                <span className="inline-block w-3.5 h-3.5 border border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                                Sending…
                              </>
                            ) : (
                              <>
                                Send Enquiry
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="py-10 text-center"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 border border-copper mb-6">
                        <Check className="w-5 h-5 text-copper" />
                      </div>
                      <p className="text-[10px] tracking-[0.32em] uppercase text-copper mb-3 font-body">
                        Enquiry Received
                      </p>
                      <h3 className="font-heading text-2xl font-medium mb-3">Thank you.</h3>
                      <p className="text-sm text-muted-foreground font-body leading-[1.8] max-w-xs mx-auto mb-8">
                        Your message has been received. One of our principals will be in touch shortly.
                      </p>
                      <button
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-0.5 hover:text-copper hover:border-copper transition-colors font-body"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}