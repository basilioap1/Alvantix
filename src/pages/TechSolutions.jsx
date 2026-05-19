import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Cpu, Code, BarChart3, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const HERO_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/ae09259ad_generated_139ebed7.png';

const SERVICES = [
  { icon: Code, title: 'Custom Software Development', body: 'We design and build proprietary business platforms from the ground up — ERP systems, multi-entity consolidation tools, operational dashboards and client-facing portals. All code is written in-house, with no outsourcing or third-party contractors. You own the result.' },
  { icon: Cpu, title: 'AI Strategy & Integration', body: 'We advise industrial companies, holding groups and service businesses on AI adoption strategy — identifying high-impact automation opportunities, selecting the right models and tools, and implementing end-to-end LLM-based workflows that integrate with your existing operations.' },
  { icon: BarChart3, title: 'SaaS Platforms & Reporting', body: 'We have built and currently operate SaaS platforms for distribution management, logistics coordination and multi-entity group reporting. We can deploy adapted versions of these platforms or build bespoke equivalents for your organisation.' },
  { icon: Zap, title: 'Digital Transformation', body: 'For companies with legacy systems or analogue workflows, we provide structured digital transformation programmes — from initial audit and architecture design through to full implementation, staff training and ongoing support.' },
];

const SECTORS = ['Industrial food & beverage production', 'Distribution & logistics operators', 'Holding groups & multi-entity structures', 'Professional services firms', 'Commodity trading operations', 'Real estate & construction management'];

export default function TechSolutions() {
  const [form, setForm] = useState({ name: '', company: '', email: '', sector: '', challenge: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'info@alvantix.com',
      subject: `Technology Enquiry — ${form.company}`,
      body: `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nSector: ${form.sector}\n\nChallenge / Project:\n${form.challenge}`,
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
          <img src={HERO_IMG} alt="Technology" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-14 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.35em] uppercase text-copper font-body mb-3">
            Software · AI · Technology Solutions
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="font-heading text-3xl md:text-6xl font-medium text-primary-foreground leading-tight max-w-3xl">
            Proprietary software<br />
            <span className="italic text-copper">built for real operations.</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4">Our Technology Division</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium leading-tight">
              We build software for operators, not for presentations.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-4">
            <p className="text-base leading-[1.8] text-muted-foreground">
              Our technology division was built out of internal necessity — we needed tools that could handle the complexity of a multi-sector, multi-country group, and the off-the-shelf solutions available didn't meet our standards. So we built our own.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground">
              Over eight years, this has evolved into a dedicated in-house development capability with active projects spanning custom ERP systems, AI-powered workflow automation, SaaS platforms for distribution management and multi-entity financial consolidation tools for holding groups.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground">
              We work exclusively on a B2B basis with industrial operators, distribution companies and multi-entity groups — organisations where operational software directly impacts revenue, margin and control. We do not take on consumer-facing projects or purely cosmetic redesigns.
            </p>
            <p className="text-base leading-[1.8] text-muted-foreground">
              Everything is built in-house by our own team. No outsourcing, no offshore development, no contractors you'll never meet. When you work with us, you work directly with the people writing the code.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Services */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-10">What we build</p>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-background p-8 md:p-10">
                  <Icon className="w-4 h-4 text-copper mb-5" strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-medium mb-3">{s.title}</h3>
                  <p className="text-sm leading-[1.75] text-muted-foreground font-body">{s.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-foreground text-primary-foreground py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4">Sectors we serve</p>
              <h2 className="font-heading text-2xl md:text-4xl font-medium leading-tight mb-6">
                We specialise in operationally complex businesses.
              </h2>
              <p className="text-sm leading-[1.8] text-primary-foreground/50 mb-8">
                Our tools are built for businesses where operations are genuinely complex — multiple entities, cross-border logistics, real-time production data, non-standard reporting requirements. If your business is simple, you don't need us.
              </p>
              <div className="space-y-3">
                {SECTORS.map(s => (
                  <div key={s} className="flex items-center gap-3 text-sm text-primary-foreground/70 font-body">
                    <span className="w-1 h-1 rounded-full bg-copper flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {[
                { value: '100%', label: 'In-house development', sub: 'No outsourcing, ever' },
                { value: '8+', label: 'Years building operational software', sub: 'Internal + client projects' },
                { value: 'B2B', label: 'Exclusively', sub: 'Industrial & multi-entity focus' },
              ].map(m => (
                <div key={m.value} className="border-b border-primary-foreground/10 pb-6">
                  <p className="font-heading text-4xl font-medium text-primary-foreground mb-1">{m.value}</p>
                  <p className="text-xs text-primary-foreground/50 font-body tracking-[0.1em]">{m.label}</p>
                  <p className="text-[10px] text-copper tracking-[0.15em] uppercase font-body mt-0.5">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4">Request a Meeting</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-tight mb-5">
              Describe your challenge.<br /><span className="italic text-copper">We'll tell you if we can help.</span>
            </h2>
            <p className="text-sm leading-[1.8] text-muted-foreground mb-6">
              We take on a limited number of new client projects per year to ensure we can give each engagement the attention it requires. Initial conversations are at principal level, free of charge, and conducted under mutual NDA. There is no obligation.
            </p>
            <div className="space-y-3 text-xs text-muted-foreground font-body">
              <p>✦ Response within 2 business days</p>
              <p>✦ Initial consultation conducted under NDA</p>
              <p>✦ No agencies — you speak directly with our principals</p>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="flex flex-col gap-4 pt-4">
                <CheckCircle className="w-7 h-7 text-copper" />
                <p className="font-heading text-2xl">Project enquiry received.</p>
                <p className="text-sm text-muted-foreground">We'll be in touch within two business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Company / Organisation', key: 'company', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Industry / Sector', key: 'sector', type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground font-body block mb-2">{f.label}</label>
                    <input type={f.type} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-transparent border-b border-border pb-2 text-sm font-body text-foreground focus:outline-none focus:border-copper transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground font-body block mb-2">Describe your challenge or project</label>
                  <textarea rows={5} required value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })}
                    className="w-full bg-transparent border-b border-border pb-2 text-sm font-body text-foreground focus:outline-none focus:border-copper transition-colors resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-body hover:bg-copper transition-all disabled:opacity-40">
                  {sending ? 'Sending...' : 'Submit Project Enquiry'}
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