import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { number: '50+', label: 'Years of industrial food production' },
  { number: '12+', label: 'Countries with our wine brands' },
  { number: '25+', label: 'Years in wine production & distribution' },
  { number: '8+', label: 'Years in software, AI & consulting' },
];

export default function StatsGrid() {
  return (
    <section className="py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="md:px-8 first:pl-0 last:pr-0"
            >
              <p className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-2">{stat.number}</p>
              <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground font-body leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}