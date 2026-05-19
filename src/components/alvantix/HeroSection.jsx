import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const CITY_IMG = 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/62c94c2d4_generated_d6e9169f.png';

const HEADLINE_WORDS = ['Decades', 'of', 'industry.'];
const HEADLINE_WORDS_2 = ['Global', 'reach.'];

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const lineW = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%']);

  return (
    <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="absolute inset-0">
        <img src={CITY_IMG} alt="Global operations" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 via-transparent to-foreground/20" />
      </motion.div>

      {/* Animated horizontal line */}
      <div className="absolute top-1/3 left-0 h-px bg-primary-foreground/10 w-full overflow-hidden">
        <motion.div style={{ width: lineW }} className="h-full bg-copper/30" />
      </div>

      <motion.div style={{ y: textY }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pb-16 md:pb-28 w-full">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
          className="text-[10px] tracking-[0.4em] uppercase text-primary-foreground/40 font-body mb-6 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-primary-foreground/30" />
          Alvantix LLC — International Group
        </motion.p>

        <h1 className="font-heading text-primary-foreground text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[1.04] tracking-tight mb-8 max-w-4xl">
          <span className="block overflow-hidden">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden italic text-copper">
            {HEADLINE_WORDS_2.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
          className="font-body text-sm md:text-base leading-[1.8] text-primary-foreground/55 max-w-lg mb-10">
          A privately held international group with deep-rooted businesses in food production, wine, technology and commodities — operating across multiple markets and industries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4">
          <a
            href="#about"
            className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-body hover:bg-copper hover:text-primary-foreground transition-all duration-300">
            Explore the Group
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-primary-foreground/25 text-primary-foreground/80 px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-body hover:border-copper hover:text-copper transition-all duration-300">
            Get in Touch
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.7 }}
          className="mt-14 pt-8 border-t border-primary-foreground/10 grid grid-cols-3 gap-4">
          {[
            { label: 'AMERICAS', value: '50+ years' },
            { label: 'EUROPE', value: '12+ markets' },
            { label: 'INTERNATIONAL', value: 'Multi-sector' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[9px] tracking-[0.25em] uppercase text-copper font-body mb-1.5">{stat.label}</p>
              <p className="font-heading text-xl md:text-2xl font-medium text-primary-foreground">{stat.value}</p>
            </div>
          ))}
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
  );
}