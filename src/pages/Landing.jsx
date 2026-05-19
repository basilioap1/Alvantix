import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, Globe, TrendingUp, Shield, Layers, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommodityTicker from '@/components/alvantix/CommodityTicker';
import InsightsSection from '@/components/alvantix/InsightsSection';
import NewsFeed from '@/components/alvantix/NewsFeed';
import LandingNav from '@/components/alvantix/LandingNav';
import ContactModal from '@/components/alvantix/ContactModal';

const HERO_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/f59833f28_generated_image.png';
const PORT_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/8b935a743_generated_image.png';
const BOARD_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/c8c72a997_generated_image.png';
const WINE_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/4dd5150ef_generated_image.png';
const COMMODITIES_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/342907755_generated_image.png';

const PILLARS = [
{
  icon: Globe,
  label: 'Global Reach',
  desc: 'Operations spanning the Americas, Europe and Asia-Pacific through a network of established partnerships and owned assets.'
},
{
  icon: Layers,
  label: 'Multi-Sector',
  desc: 'Diversified exposure across food production, wine, technology and commodities — providing structural resilience across cycles.'
},
{
  icon: TrendingUp,
  label: 'Operational Excellence',
  desc: 'Five decades of hands-on industrial expertise creating competitive advantages that purely financial groups cannot replicate.'
},
{
  icon: Shield,
  label: 'Discretion',
  desc: 'All engagements conducted with full confidentiality. Our principals have built lasting relationships on trust and consistent delivery.'
}];


const METRICS = [
{ value: '50+', label: 'Years in Operation', sub: 'Americas' },
{ value: '12+', label: 'Market Countries', sub: 'Wine Brands' },
{ value: '4', label: 'Core Sectors', sub: 'Active Operations' },
{ value: '3', label: 'Continents', sub: 'Global Presence' }];


const NAV_LINKS = [
{ label: 'About', href: '/group#about' },
{ label: 'Sectors', href: '/group#sectors' },
{ label: 'Services', href: '/group#services' },
{ label: 'Contact', href: '/group#contact' }];


const APPROACH = [
{
  num: '01',
  title: 'Principal-Led',
  body: 'Every engagement is handled directly by our principals — not delegated to junior staff or intermediaries. This ensures continuity, accountability and informed decision-making at every stage.'
},
{
  num: '02',
  title: 'Long-Term Orientation',
  body: 'We build relationships intended to last decades, not transactions. Our commercial approach is grounded in creating durable value rather than extracting short-term returns.'
},
{
  num: '03',
  title: 'Sector Depth',
  body: 'Each business unit within the group is led by operators with 20+ years of specific industry experience — from bakery engineering to wine distribution logistics to enterprise software.'
}];


// Animated word reveal for hero headline
const HEADLINE_WORDS = ['Decades', 'of', 'industry.'];
const HEADLINE_WORDS_2 = ['Global', 'reach.'];

function AnimatedHeroText() {
  return (
    <h1 className="font-heading text-primary-foreground text-[clamp(2.4rem,7vw,6.5rem)] font-medium leading-[1.04] tracking-tight mb-6 md:mb-8 max-w-4xl">
      <span className="block overflow-hidden">
        {HEADLINE_WORDS.map((word, i) =>
        <motion.span
          key={word + i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.25em]">
          
            {word}
          </motion.span>
        )}
      </span>
      <span className="block overflow-hidden italic text-copper">
        {HEADLINE_WORDS_2.map((word, i) =>
        <motion.span
          key={word + i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.25em]">
          
            {word}
          </motion.span>
        )}
      </span>
    </h1>);

}

export default function Landing() {
  const heroRef = useRef(null);
  const [contactOpen, setContactOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const lineW = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%']);

  return (
    <div className="bg-background text-foreground font-body overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <LandingNav />

      {/* ── CONTACT MODAL ── */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="absolute inset-0">
          <img src={HERO_IMG} alt="Global operations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/5" />
          {/* Subtle vignette sides */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 via-transparent to-foreground/20" />
        </motion.div>

        {/* Animated horizontal line */}
        <div className="absolute top-1/3 left-0 h-px bg-primary-foreground/10 w-full overflow-hidden">
          <motion.div style={{ width: lineW }} className="h-full bg-copper/30" />
        </div>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 pt-24 md:pt-0 pb-12 md:pb-28 w-full">
  

          <AnimatedHeroText />

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
            className="font-body text-sm md:text-base leading-[1.8] text-primary-foreground/55 max-w-lg mb-10">
            A privately held multinational with over five decades of operational history across food production, wine, technology and international commodities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link to="/group"
            className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-body hover:bg-copper hover:text-primary-foreground transition-all duration-300">
              Explore the Group
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {/* ── UPDATED: now opens ContactModal instead of navigating ── */}
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-3 border border-primary-foreground/25 text-primary-foreground/80 px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-body hover:border-copper hover:text-copper transition-all duration-300">
              Get in Touch
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-0 right-0 mb-6 mr-2 flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-[0.25em] uppercase text-primary-foreground/30 font-body [writing-mode:vertical-rl]">Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
              <ArrowDown className="w-3.5 h-3.5 text-primary-foreground/30" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <CommodityTicker />

      {/* ── METRICS ── */}
      <section className="border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
            {METRICS.map((m, i) =>
            <motion.div key={m.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="px-6 md:px-10 py-10 first:pl-0 last:pr-0">
                <p className="font-heading text-5xl md:text-6xl font-medium text-foreground mb-1">{m.value}</p>
                <p className="text-xs text-muted-foreground font-body tracking-[0.1em] mb-0.5">{m.label}</p>
                <p className="text-[10px] text-copper tracking-[0.15em] uppercase font-body">{m.sub}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── ABOUT SPLIT ── */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-12 py-24 md:py-36 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[10px] tracking-[0.32em] uppercase text-copper mb-4 font-body">The Group</p>
          <h2 className="font-heading text-3xl md:text-5xl font-medium leading-tight mb-6">
            A privately held multinational built on{' '}
            <span className="italic text-copper">real operations.</span>
          </h2>
          <p className="text-base leading-[1.8] text-muted-foreground mb-5 font-body">
            Alvantix LLC serves as the commercial and strategic hub of a diversified international group. Unlike purely financial holding structures, every business within the group is operationally active — with owned assets, established brands, and decades of execution history.
          </p>
          <p className="text-base leading-[1.8] text-muted-foreground mb-8 font-body">
            Our principals maintain hands-on oversight across all operations, ensuring that strategic direction is grounded in deep sector expertise rather than delegated to intermediaries.
          </p>
          <Link to="/group"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-0.5 hover:text-copper hover:border-copper transition-colors font-body">
            Discover the full group
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="overflow-hidden">
          <img src={BOARD_IMG} alt="Corporate leadership" className="w-full h-72 md:h-[420px] object-cover" />
        </motion.div>
      </section>

      {/* ── 4 PILLARS ── */}
      <section className="bg-foreground text-primary-foreground py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="mb-14">
            <p className="text-[10px] tracking-[0.32em] uppercase text-copper mb-4 font-body">Why Alvantix</p>
            <h2 className="font-heading text-3xl md:text-5xl font-medium leading-tight max-w-2xl">
              Structural advantages built over{' '}
              <span className="italic text-copper">five decades.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.label}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-foreground p-8 md:p-10 hover:bg-primary-foreground/5 transition-colors group">
                  <Icon className="w-4 h-4 text-copper mb-6" strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-medium mb-3">{p.label}</h3>
                  <p className="text-sm leading-[1.75] text-primary-foreground/50 font-body">{p.desc}</p>
                </motion.div>);

            })}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-4">
              <p className="text-[10px] tracking-[0.32em] uppercase text-copper mb-4 font-body">Our Approach</p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium leading-tight">
                How we operate differently.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-base leading-[1.8] text-muted-foreground font-body">
                In a market saturated with intermediaries and purely financial structures, Alvantix was built around a different model — one where principals operate, not just invest.
              </p>
            </div>
          </div>
          <div className="divide-y divide-border">
            {APPROACH.map((a, i) =>
            <motion.div key={a.num}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="grid md:grid-cols-12 gap-6 py-8 group">
                <div className="md:col-span-1">
                  <p className="text-xs text-copper font-body tracking-[0.15em]">{a.num}</p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-heading text-xl font-medium group-hover:text-copper transition-colors duration-300">{a.title}</h3>
                </div>
                <div className="md:col-span-7 md:col-start-5">
                  <p className="text-sm md:text-base leading-[1.75] text-muted-foreground font-body">{a.body}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── OPERATIONS PREVIEW ── */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-12 py-24 md:py-36">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-[10px] tracking-[0.32em] uppercase text-copper mb-3 font-body">Our Operations</p>
            <h2 className="font-heading text-3xl md:text-5xl font-medium">Active sectors.</h2>
          </div>
          <Link to="/group#sectors"
          className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors font-body">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 2-col grid with asymmetric tall+short */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative overflow-hidden group cursor-pointer md:row-span-2">
            <img src="https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/89699e36e_generated_36b4e174.png"
            alt="Food Production" className="w-full h-64 md:h-full md:min-h-[480px] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mb-1 font-body">Americas — 50+ years</p>
              <p className="font-heading text-xl text-primary-foreground font-medium">Industrial Food Production</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="relative overflow-hidden group cursor-pointer">
            <img src={WINE_IMG}
            alt="Wine" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mb-1 font-body">Spain — Europe — 12+ countries</p>
              <p className="font-heading text-xl text-primary-foreground font-medium">Wine Production</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          className="relative overflow-hidden group cursor-pointer">
            <img src={COMMODITIES_IMG}
            alt="Commodities" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mb-1 font-body">Americas — Europe — Asia</p>
              <p className="font-heading text-xl text-primary-foreground font-medium">Commodities Trading</p>
            </div>
          </motion.div>
        </div>

        {/* Tech + Services row */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="relative overflow-hidden group cursor-pointer">
            <img src="https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/ae09259ad_generated_139ebed7.png"
            alt="Tech" className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mb-1 font-body">International — 8+ years</p>
              <p className="font-heading text-xl text-primary-foreground font-medium">Software, AI</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }}
          className="relative overflow-hidden group cursor-pointer">
            <img src="https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/bc8336979_generated_3e648e6b.png"
            alt="Services" className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/50 mb-1 font-body">International</p>
              <p className="font-heading text-xl text-primary-foreground font-medium">Professional Services</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link to="/group#sectors"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-body">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <InsightsSection />

      {/* ── NEWS FEED ── */}
      <NewsFeed />

      {/* ── PORT IMAGE ── */}
      <section className="bg-background px-6 md:px-12 max-w-screen-xl mx-auto py-16 md:py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="overflow-hidden">
          <img src={PORT_IMG} alt="Global logistics" className="w-full h-48 md:h-72 object-cover" />
        </motion.div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="bg-foreground text-primary-foreground py-24 md:py-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <p className="text-[10px] tracking-[0.32em] uppercase text-copper mb-4 font-body">Initiate a Conversation</p>
              <h2 className="font-heading text-3xl md:text-5xl font-medium leading-tight mb-6">
                Where capital meets<br />
                    <span className="text-copper italic">operations.</span>
              </h2>
              <p className="text-base leading-[1.8] text-primary-foreground/50 font-body max-w-sm">
                We engage selectively with established counterparties, strategic partners and qualified investors. All conversations are handled at principal level and with full discretion.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7 space-y-0 divide-y divide-primary-foreground/10 mt-4">
              {[
              { label: 'Business Consulting', href: '/group#services' },
              { label: 'Commercial Intermediation', href: '/group#services' },
              { label: 'Commodity Trade', href: '/group#sectors' },
              { label: 'Technology Projects', href: '/group#sectors' },
              { label: 'Strategic Partnership', href: '/group#contact' }].
              map((item) =>
              <Link key={item.label} to={item.href}
              className="flex items-center justify-between py-4 text-sm text-primary-foreground/60 hover:text-primary-foreground group transition-colors font-body">
                  <span className="tracking-[0.05em]">{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-copper transition-opacity" />
                </Link>
              )}
              <div className="pt-8">
                {/* ── Also triggers the modal from the CTA section ── */}
                <button
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center gap-3 bg-copper text-foreground px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-body font-medium hover:bg-copper/80 transition-colors">
                  Begin Enquiry
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground border-t border-primary-foreground/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10">
          {/* Top row: logo + contact info */}
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            {/* Logo */}
            <div className="md:col-span-5">
              <p
                className="font-heading font-bold leading-none select-none mb-6"
                style={{ fontSize: 'clamp(2rem,7vw,5rem)', WebkitTextStroke: '1px hsla(37,21%,91%,0.08)', WebkitTextFillColor: 'transparent', letterSpacing: '0.15em' }}>
                ALVANTIX
              </p>
              <p className="font-body text-sm leading-[1.8] text-primary-foreground/30 max-w-xs">
                A privately held multinational with over five decades of operational history across food production, wine, technology and international commodities.
              </p>
            </div>

            {/* Contact details */}
            <div className="md:col-span-6 md:col-start-7 grid sm:grid-cols-3 gap-8">
              <div>
                <p className="text-[9px] tracking-[0.28em] uppercase text-copper font-body mb-3">Email</p>
                <a href="mailto:info@alvantix.com" className="font-body text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
                  info@alvantix.com
                </a>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.28em] uppercase text-copper font-body mb-3">Location</p>
                <p className="font-body text-sm text-primary-foreground/50">
                  254 Chapman Rd, Ste 208 #27733<br />Newark, Delaware 19702<br />United States
                </p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.28em] uppercase text-copper font-body mb-3">Languages</p>
                <p className="font-body text-sm text-primary-foreground/50">
                  English<br />Español
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-[10px] tracking-[0.18em] uppercase text-primary-foreground/25 font-body">
            <span>© 2025 Alvantix LLC. All rights reserved.</span>
            <div className="flex gap-8">
              <span className="cursor-pointer hover:text-primary-foreground/50 transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-primary-foreground/50 transition-colors">Legal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}