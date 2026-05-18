import React from 'react';
import { motion } from 'framer-motion';

const REGIONS = [
  {
    region: 'Americas',
    desc: 'Food production operations, commodities trading and professional services across the Americas.',
  },
  {
    region: 'Europe',
    desc: 'Wine production and distribution from Spain, with commercial relationships across European markets.',
  },
  {
    region: 'Asia-Pacific',
    desc: 'Active presence in Asian commodity markets through alliances with established local and international partners.',
  },
];

export default function GlobalSection() {
  return (
    <section id="global" className="py-16 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-3"
            >
              Global Presence
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl font-medium"
            >
              Where we <span className="text-copper italic">operate.</span>
            </motion.h2>
          </div>
        </div>

        <div className="divide-y divide-border">
          {REGIONS.map((r, i) => (
            <motion.div
              key={r.region}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid md:grid-cols-12 gap-4 py-8 group"
            >
              <div className="md:col-span-3">
                <p className="font-heading text-xl md:text-2xl font-medium group-hover:text-copper transition-colors duration-300">
                  {r.region}
                </p>
              </div>
              <div className="md:col-span-7 md:col-start-5">
                <p className="font-body text-sm md:text-base leading-[1.7] text-muted-foreground">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}