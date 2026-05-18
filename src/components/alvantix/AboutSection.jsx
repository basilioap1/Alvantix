import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4"
            >
              About Alvantix
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-4xl font-medium leading-tight"
            >
              A group built on<br />
              <span className="text-copper italic">real operations.</span>
            </motion.h2>
          </div>

          <div className="md:col-span-7 md:col-start-6 space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-body text-base md:text-lg leading-[1.75] text-muted-foreground"
            >
              Alvantix LLC is an internationally operating company serving as the commercial hub of a
              diversified group with deep-rooted businesses spanning over five decades — from
              industrial food production and wine, to technology and commodities trading.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-body text-base md:text-lg leading-[1.75] text-muted-foreground"
            >
              Our principals bring decades of hands-on operational experience across
              multiple industries and geographies — from a bakery group with over 50
              years of history and a consolidated winery with own brands present in 12+
              countries, to active projects in AI adoption and international commodity markets.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}