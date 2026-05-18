import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    num: '01',
    title: 'Business Consulting',
    desc: 'Strategic advisory for companies navigating complex commercial environments, international expansion or operational restructuring.',
  },
  {
    num: '02',
    title: 'Commercial Intermediation',
    desc: 'Sourcing and connecting qualified counterparties across sectors. Full transaction support from introduction to signed agreement.',
  },
  {
    num: '03',
    title: 'Project Coordination',
    desc: 'Management of complex operations involving multiple parties, suppliers and service providers across construction, production and logistics.',
  },
  {
    num: '04',
    title: 'Technology Solutions',
    desc: 'Software development and digital tools for business management, reporting and operational efficiency through our technology division.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-3"
            >
              Professional Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-4xl font-medium leading-tight"
            >
              How we can<br />
              <span className="text-copper italic">help you.</span>
            </motion.h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-body text-base leading-[1.75] text-muted-foreground"
            >
              Beyond our own operations, Alvantix provides professional services to
              established companies across multiple sectors.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-8 md:p-10 hover:bg-secondary/50 transition-colors duration-400"
            >
              <p className="text-xs text-copper font-body tracking-[0.15em] mb-4">{s.num}</p>
              <h3 className="font-heading text-lg md:text-xl font-medium mb-3">{s.title}</h3>
              <p className="font-body text-sm leading-[1.7] text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}