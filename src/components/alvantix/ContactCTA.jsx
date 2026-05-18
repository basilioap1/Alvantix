import React from 'react';
import { motion } from 'framer-motion';
import LeadForm from '@/components/alvantix/LeadForm';

export default function ContactCTA() {

  return (
    <section id="contact" className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-4"
            >
              Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl font-medium leading-tight mb-6"
            >
              Let's work <span className="text-copper italic">together.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-body text-sm leading-[1.75] text-primary-foreground/50 mb-10"
            >
              We welcome enquiries from established companies, buyers, sellers and
              partners across our sectors of operation. All conversations are handled
              with complete discretion and confidentiality.
            </motion.p>

            <div className="space-y-0 divide-y divide-primary-foreground/10">
              {[
                ['Alvantix LLC', 'United States'],
                ['info@alvantix.com', 'English · Español'],
              ].map(([left, right]) => (
                <div key={left} className="flex justify-between py-4 text-xs text-primary-foreground/40 font-body">
                  <span>{left}</span>
                  <span>{right}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <motion.div
            className="md:col-span-6 md:col-start-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <LeadForm />
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20">
          <p
            className="font-heading font-bold select-none leading-none"
            style={{
              fontSize: 'clamp(3rem, 12vw, 9rem)',
              WebkitTextStroke: '1px hsla(37,21%,91%,0.1)',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.15em',
            }}
          >
            ALVANTIX
          </p>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] tracking-[0.18em] uppercase text-primary-foreground/30 font-body">
            <span>© 2025 Alvantix LLC. All rights reserved.</span>
            <div className="flex gap-8">
              <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">Legal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}