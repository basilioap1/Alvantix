import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Globe, Handshake, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const HERO_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/44ecdab50_generated_6480d018.png';
const PORT_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/8b935a743_generated_image.png';

const ENGAGEMENT_TYPES = [
  { icon: Globe, title: 'Commodity Trade Partners', body: 'We act as principal and intermediary in energy, metals and agricultural commodity transactions. We work with established exporters, importers and trading houses across the Americas, Europe and Asia. If you have recurring supply or demand for commodities and are looking for a reliable counterparty or commercial coordinator, we are open to a direct conversation.' },
  { icon: TrendingUp, title: 'Investment & Co-investment', body: 'We occasionally consider structured co-investment in operations that align with our existing sectors — food production, wine, technology and commodities. We are not a fund, and we do not consider purely financial opportunities. We engage when there is a clear operational angle and a shared long-term vision with the existing principals.' },
  { icon: Handshake, title: 'Strategic Commercial Alliances', body: 'We are interested in forming long-term commercial alliances with operators, distributors and market participants in our active sectors. This includes joint sourcing arrangements, shared distribution infrastructure, cross-market introductions and structured referral relationships between complementary businesses.' },
  { icon: ShieldCheck, title: 'Professional Services & Advisory', body: 'We provide retained advisory and project-based consulting to companies navigating complex commercial environments — international market entry, multi-entity restructuring, operational audits, and transaction coordination. All advisory work is conducted by our principals under NDA.' },
];

export default function CommercialPartners() {
  const [form, setForm] = useState({ name: '', company: '', email: '', type: '', details: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'info@alvantix.com',
      subject: `Commercial Partnership Enquiry — ${form.company}`,
      body: `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nType of Engagement: ${form.type}\n\nDetails:\n${form.details}`,
    });
    setSending(false);
    setSent(true);
  };

  return (
    <div className="bg-background text-foreground font-body min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading text-base tracking-[0.32em] font-semibold">ALVANTIX</Link>
          <Link to="/group" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors font-body">← Back to Group</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Commodities" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-14 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.35em] uppercase text-copper font-body mb-3">
            Commercial Partnerships · Consulting · Intermediation
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="font-heading text-3xl md:text-6xl font-medium text-primary-foreground leading-tight max-w-3xl">
            We work with principals,<br />
            <span className="italic text-copper">not intermediaries.</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4">Our Approach</p>
          <h2 className="font-heading text-2xl md:text-4xl font-medium leading-tight mb-5">
            Commercial relationships built on depth, not volume.
          </h2>
          <p className="text-base leading-[1.8] text-muted-foreground mb-4">
            Alvantix operates across a range of commercial activities beyond its owned businesses. We intermediate in commodity transactions, advise companies on commercial strategy, coordinate complex multi-party operations and selectively co-invest in aligned opportunities.
          </p>
          <p className="text-base leading-[1.8] text-muted-foreground mb-4">
            Our network spans three continents and includes established importers, exporters, trading houses, industrial operators and institutional buyers across food, energy, metals and agricultural markets. We are not a brokerage — we engage as a principal or qualified intermediary in transactions where we can add genuine structural value.
          </p>
          <p className="text-base leading-[1.8] text-muted-foreground">
            All commercial conversations are conducted at principal level, under NDA from the first interaction, and with full respect for the confidentiality of counterparties and their commercial positions.
          </p>
        </div>
        <div className="overflow-hidden">
          <img src={PORT_IMG} alt="Global trade" className="w-full h-72 md:h-96 object-cover" />
        </div>
      </section>

      {/* 4 types */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-10">Types of engagement</p>
          <div className="divide-y divide-border">
            {ENGAGEMENT_TYPES.map((e, i) => {
              const Icon = e.icon;
              return (
                <motion.div key={e.title}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="grid md:grid-cols-12 gap-6 py-8 group">
                  <div className="md:col-span-1 pt-1">
                    <Icon className="w-4 h-4 text-copper" strokeWidth={1.5} />
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-heading text-lg font-medium group-hover:text-copper transition-colors duration-300">{e.title}</h3>
                  </div>
                  <div className="md:col-span-7 md:col-start-5">
                    <p className="text-sm md:text-base leading-[1.75] text-muted-foreground font-body">{e.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-foreground text-primary-foreground py-20 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4">Initiate a Conversation</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-tight mb-5">
              Tell us about your situation.<br /><span className="italic text-copper">We'll take it from there.</span>
            </h2>
            <p className="text-sm leading-[1.8] text-primary-foreground/50 mb-6">
              We do not respond to cold mass outreach or speculative broker introductions. If you are a principal with a genuine commercial requirement in one of our active sectors, we welcome a direct conversation. All information shared is treated with complete confidentiality.
            </p>
            <div className="space-y-3 text-xs text-primary-foreground/35 font-body">
              <p>✦ All conversations under mutual NDA</p>
              <p>✦ Principals only — no intermediaries or agents</p>
              <p>✦ Response within 2 business days for qualified enquiries</p>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="flex flex-col gap-4 pt-4">
                <CheckCircle className="w-7 h-7 text-copper" />
                <p className="font-heading text-2xl">Message received.</p>
                <p className="text-sm text-primary-foreground/40">We'll be in touch within two business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Company / Organisation', key: 'company', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Type of Engagement', key: 'type', type: 'text', placeholder: 'e.g. Commodity trade, Advisory, Partnership...' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30 font-body block mb-2">{f.label}</label>
                    <input type={f.type} required value={form[f.key]} placeholder={f.placeholder || ''}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-transparent border-b border-primary-foreground/15 pb-2 text-sm font-body text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-copper transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30 font-body block mb-2">Describe your situation or proposal</label>
                  <textarea rows={5} required value={form.details} onChange={e => setForm({ ...form, details: e.target.value })}
                    className="w-full bg-transparent border-b border-primary-foreground/15 pb-2 text-sm font-body text-primary-foreground focus:outline-none focus:border-copper transition-colors resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="inline-flex items-center gap-3 border border-copper text-copper px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-body hover:bg-copper hover:text-foreground transition-all disabled:opacity-40">
                  {sending ? 'Sending...' : 'Send Enquiry'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-primary-foreground/10 py-8">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <span className="font-heading text-sm tracking-[0.3em] font-semibold text-primary-foreground/60">ALVANTIX</span>
          <span className="text-[10px] tracking-[0.15em] uppercase text-primary-foreground/25 font-body">© 2025 Alvantix LLC</span>
        </div>
      </footer>
    </div>
  );
}