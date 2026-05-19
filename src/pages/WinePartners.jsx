import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Wine, Globe, Package, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const HERO_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/4dd5150ef_generated_image.png';
const VINEYARD_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/2926aa475_generated_image.png';

const POINTS = [
  { icon: Globe, title: 'Active in 12+ countries', body: 'Our brands are already commercially distributed across Europe, the Americas and select international markets — with established import relationships and documentation for each region.' },
  { icon: Award, title: 'Owned vineyard estates in Spain', body: 'We operate owned and leased estate vineyards in Spain with full vertical integration: from viticulture and vinification through to bottling and labelling under our own brands or private label for partners.' },
  { icon: Package, title: 'Flexible commercial formats', body: 'We work with importers, distributors, restaurant groups and retail chains. We offer own-brand allocations, exclusive regional rights and full private-label programmes depending on volume and commitment.' },
  { icon: Wine, title: '25+ years of production experience', body: 'Our winery group has over two decades of production history with certified quality standards, consistent vintage profiles and award-recognised labels across white, red and rosé categories.' },
];

export default function WinePartners() {
  const [form, setForm] = useState({ name: '', company: '', email: '', country: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'info@alvantix.com',
      subject: `Wine Distribution Enquiry — ${form.company} (${form.country})`,
      body: `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nCountry/Region: ${form.country}\n\nMessage:\n${form.message}`,
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
          <img src={HERO_IMG} alt="Wine production" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/10" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pb-14 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.35em] uppercase text-copper font-body mb-3">
            Wine Production · Spain · Distribution Partners
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="font-heading text-3xl md:text-6xl font-medium text-primary-foreground leading-tight max-w-3xl">
            Distribute our wines<br />
            <span className="italic text-copper">in your market.</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4">Who we are</p>
          <h2 className="font-heading text-2xl md:text-4xl font-medium leading-tight mb-5">
            A vertically integrated winery group with owned estates and international commercial reach.
          </h2>
          <p className="text-base leading-[1.8] text-muted-foreground mb-4">
            Our winery operations are based in Spain, where we manage owned and leased vineyard estates producing wines under our proprietary brands. The full production chain — from harvest and fermentation through aging, bottling and labelling — is conducted in-house, giving us complete control over quality and consistency.
          </p>
          <p className="text-base leading-[1.8] text-muted-foreground mb-4">
            We currently distribute across more than 12 countries through an established network of importers and local distributors. We are selectively expanding our distribution partnerships in markets where we do not yet have a strong presence, and we are open to discussions with qualified operators who can represent our portfolio at the appropriate level.
          </p>
          <p className="text-base leading-[1.8] text-muted-foreground">
            We also offer private-label production for established buyers who want to commercialise wines under their own brand. All programmes are discussed and structured at principal level.
          </p>
        </div>
        <div className="overflow-hidden">
          <img src={VINEYARD_IMG} alt="Vineyard" className="w-full h-72 md:h-96 object-cover" />
        </div>
      </section>

      {/* 4 Points */}
      <section className="border-t border-border bg-secondary/20 py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-10">Why partner with us</p>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-background p-8 md:p-10">
                  <Icon className="w-4 h-4 text-copper mb-5" strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-medium mb-2">{p.title}</h3>
                  <p className="text-sm leading-[1.75] text-muted-foreground font-body">{p.body}</p>
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
            <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4">Request a Meeting</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-tight mb-5">
              Let's discuss your market<br /><span className="italic text-copper">and your needs.</span>
            </h2>
            <p className="text-sm leading-[1.8] text-primary-foreground/50 mb-6">
              We engage with established importers, distributors, buying groups and retail operators. To initiate a conversation, please complete the form and a member of our commercial team will respond within two business days. All enquiries are treated with complete discretion.
            </p>
            <div className="space-y-3 text-xs text-primary-foreground/35 font-body">
              <p>✦ Minimum volume requirements apply</p>
              <p>✦ Exclusive regional rights available for qualified partners</p>
              <p>✦ Private label programmes available on request</p>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="flex flex-col gap-4 pt-4">
                <CheckCircle className="w-7 h-7 text-copper" />
                <p className="font-heading text-2xl">Enquiry received.</p>
                <p className="text-sm text-primary-foreground/40">We'll be in touch within two business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Company / Organisation', key: 'company', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Country / Region of Distribution', key: 'country', type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30 font-body block mb-2">{f.label}</label>
                    <input type={f.type} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-transparent border-b border-primary-foreground/15 pb-2 text-sm font-body text-primary-foreground focus:outline-none focus:border-copper transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30 font-body block mb-2">Tell us about your operation</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-primary-foreground/15 pb-2 text-sm font-body text-primary-foreground focus:outline-none focus:border-copper transition-colors resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="inline-flex items-center gap-3 border border-copper text-copper px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-body hover:bg-copper hover:text-foreground transition-all disabled:opacity-40">
                  {sending ? 'Sending...' : 'Send Distribution Enquiry'}
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