import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wine, Cpu, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const CARDS = [
  {
    icon: Wine,
    tag: 'Wine Distribution',
    title: 'Become a distributor of our wine brands.',
    body: 'Our wine brands are present in 12+ countries across Europe and the Americas. We work with qualified importers, distributors and on-trade operators who share our commitment to quality. If you are looking to add a well-established Spanish portfolio to your offer, we want to hear from you.',
    cta: 'Enquire as Distributor',
    href: '/wine-partners',
    accent: true,
  },
  {
    icon: Cpu,
    tag: 'Technology',
    title: 'Explore our software and AI solutions.',
    body: 'We develop proprietary platforms, AI integration strategies and custom SaaS tools for industrial operators, holding groups and distribution companies. Whether you need to automate operations, consolidate multi-entity reporting, or migrate to AI-assisted workflows — we build it in-house.',
    cta: 'Discuss a Project',
    href: '/tech-solutions',
    accent: false,
  },
  {
    icon: Briefcase,
    tag: 'Commercial Partnership',
    title: 'Explore a strategic or commercial collaboration.',
    body: 'We engage with established companies in food production, logistics, commodities and professional services. If you represent a qualified buyer, seller, co-investor or strategic partner in any of our active sectors, we are open to a confidential conversation at principal level.',
    cta: 'Initiate a Conversation',
    href: '/commercial-partners',
    accent: false,
  },
];

export default function PartnerCTAs() {
  return (
    <section className="border-t border-border py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-3">
            Work With Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl font-medium">
            How to engage <span className="text-copper italic">with us.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.tag}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col p-8 md:p-10 ${card.accent ? 'bg-foreground text-primary-foreground' : 'bg-background'}`}
              >
                <div className={`w-8 h-8 flex items-center justify-center border mb-6 ${card.accent ? 'border-primary-foreground/20' : 'border-border'}`}>
                  <Icon className={`w-4 h-4 ${card.accent ? 'text-copper' : 'text-copper'}`} strokeWidth={1.5} />
                </div>

                <p className={`text-[9px] tracking-[0.28em] uppercase font-body mb-3 ${card.accent ? 'text-primary-foreground/40' : 'text-muted-foreground'}`}>
                  {card.tag}
                </p>

                <h3 className={`font-heading text-xl md:text-2xl font-medium leading-snug mb-4 ${card.accent ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {card.title}
                </h3>

                <p className={`text-sm leading-[1.75] font-body mb-8 flex-1 ${card.accent ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
                  {card.body}
                </p>

                <Link
                  to={card.href}
                  className={`inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-body border-b pb-0.5 transition-colors w-fit ${
                    card.accent
                      ? 'text-copper border-copper/40 hover:border-copper'
                      : 'text-foreground border-foreground/30 hover:text-copper hover:border-copper'
                  }`}
                >
                  {card.cta}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}