import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import ProjectGalleryModal from './ProjectGalleryModal';

const PROJECTS = [
  {
    meta: 'Americas · 50+ Years',
    title: 'Industrial Food Production',
    description: 'Industrial bread production and food manufacturing at scale, with established regional distribution networks serving commercial and retail clients across the Americas.',
    image: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/89699e36e_generated_36b4e174.png',
    images: [
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/89699e36e_generated_36b4e174.png',
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/f1666b230_generated_image.png',
    ],
    specs: [
      { label: 'Location', value: 'Americas' },
      { label: 'Established', value: '50+ years ago' },
      { label: 'Operation', value: 'Industrial scale' },
      { label: 'Distribution', value: 'Regional networks' },
      { label: 'Clients', value: 'Commercial & Retail' },
      { label: 'Products', value: 'Bread & food manufacturing' },
    ],
    metrics: [
      { value: '50+', label: 'Years active' },
      { value: 'B2B', label: 'Market focus' },
    ],
  },
  {
    meta: 'Spain · Europe · 12+ Countries',
    title: 'Wine Production & Own Brands',
    description: 'Our winery group operates owned vineyard estates in Spain, with full vertical integration from viticulture through vinification, bottling and international distribution. Own brands are commercially active across 12+ countries spanning Europe, the Americas and export markets, supported by established logistics and import partnerships.',
    image: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/4dd5150ef_generated_image.png',
    images: [
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/4dd5150ef_generated_image.png',
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/2926aa475_generated_image.png',
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/15475c939_generated_878242b1.png',
    ],
    specs: [
      { label: 'Base', value: 'Spain' },
      { label: 'Markets', value: '12+ countries' },
      { label: 'Experience', value: '25+ years' },
      { label: 'Distribution', value: 'Europe, Americas, International' },
      { label: 'Model', value: 'Own brands + Private label' },
      { label: 'Certification', value: 'European standards' },
    ],
    metrics: [
      { value: '25+', label: 'Years production' },
      { value: '12+', label: 'Countries' },
    ],
  },
  {
    meta: 'International · 8+ Years',
    title: 'Software, AI & Technology',
    description: 'Our technology division develops proprietary business software, multi-entity consolidation platforms and AI-powered operational tools for companies across multiple industries. We advise and implement enterprise AI adoption strategies — from workflow automation and LLM integration to full digital transformation programmes. Active engagements include AI migration projects for industrial operators, custom SaaS platforms for distribution and logistics management, and bespoke reporting tools for multi-entity holding groups. All technology is designed and built in-house, ensuring full ownership and long-term maintainability for our clients.',
    image: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/ae09259ad_generated_139ebed7.png',
    images: [
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/ae09259ad_generated_139ebed7.png',
    ],
    specs: [
      { label: 'Scope', value: 'International' },
      { label: 'Experience', value: '8+ years' },
      { label: 'Core Offer', value: 'Proprietary Software Development' },
      { label: 'AI Services', value: 'Strategy, Integration, LLM Deployment' },
      { label: 'Platforms Built', value: 'SaaS, ERP, Consolidation, Reporting' },
      { label: 'Active Projects', value: 'AI migration, Industrial SaaS, Holding tools' },
      { label: 'Technology Stack', value: 'Cloud-native, AI/ML, Full-stack' },
      { label: 'Delivery Model', value: 'In-house build, no outsourcing' },
      { label: 'Clients', value: 'B2B — Industrial, Distribution, Holding groups' },
    ],
    metrics: [
      { value: '8+', label: 'Years' },
      { value: '100%', label: 'In-house' },
    ],
  },
  {
    meta: 'Americas · Europe · Asia',
    title: 'Commodities & International Trade',
    description: 'Professional intermediation across energy, metals and agricultural markets, with established alliances among leading importers and exporters across three continents.',
    image: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/44ecdab50_generated_6480d018.png',
    images: [
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/44ecdab50_generated_6480d018.png',
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/edffbb39a_generated_image.png',
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/8b935a743_generated_image.png',
    ],
    specs: [
      { label: 'Regions', value: 'Americas, Europe, Asia' },
      { label: 'Sectors', value: 'Energy, Metals, Agriculture' },
      { label: 'Role', value: 'Professional Intermediation' },
      { label: 'Network', value: 'Established importers & exporters' },
      { label: 'Coverage', value: '3 continents' },
      { label: 'Mode', value: 'Principal & Advisory' },
    ],
    metrics: [
      { value: '3', label: 'Continents' },
      { value: 'Multi', label: 'Commodities' },
    ],
  },
  {
    meta: 'International',
    title: 'Professional Services',
    description: 'Business consulting, commercial advisory and operational support for companies in construction, logistics, production and services. End-to-end transaction coordination.',
    image: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/bc8336979_generated_3e648e6b.png',
    images: [
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/bc8336979_generated_3e648e6b.png',
      'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/c8c72a997_generated_image.png',
    ],
    specs: [
      { label: 'Scope', value: 'International' },
      { label: 'Service Type', value: 'Consulting & Advisory' },
      { label: 'Sectors Served', value: 'Construction, Logistics, Production' },
      { label: 'Model', value: 'Retained & Project basis' },
      { label: 'Confidentiality', value: 'Full NDA standard' },
      { label: 'Engagement', value: 'C-level & Principals only' },
    ],
    metrics: [
      { value: 'Full', label: 'Discretion' },
      { value: 'B2B', label: 'Only' },
    ],
  },
];

export default function SectorsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="sectors" className="py-16 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-baseline justify-between mb-12 md:mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-3">
                Our Sectors
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="font-heading text-3xl md:text-5xl font-medium">
                What we <span className="text-copper italic">do.</span>
              </motion.h2>
            </div>
            <p className="hidden md:block text-xs text-muted-foreground font-body tracking-[0.12em]">5 sectors</p>
          </div>

          <div>
            {PROJECTS.map((project, i) => {
              const num = String(i + 1).padStart(2, '0');
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-b border-border last:border-0 items-start group"
                >
                  <div className="md:col-span-1">
                    <p className="text-xs text-copper font-body tracking-[0.15em]">{num}</p>
                  </div>

                  {/* Clickable image */}
                  <div
                    className="md:col-span-4 overflow-hidden relative cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <motion.img
                      whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}
                      src={project.image} alt={project.title}
                      className="w-full h-44 md:h-52 object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-400 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                        <ZoomIn className="w-6 h-6 text-primary-foreground" />
                        <span className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground font-body">
                          View Gallery
                        </span>
                      </div>
                    </div>
                    {/* Image count badge */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 text-[9px] tracking-[0.1em] font-body text-foreground">
                        {project.images.length} photos
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-6">
                    <p className="text-[9px] tracking-[0.22em] uppercase text-muted-foreground font-body mb-3">
                      {project.meta}
                    </p>
                    <h3 className="font-heading text-xl md:text-2xl font-medium mb-3">{project.title}</h3>
                    <p className="font-body text-sm md:text-base leading-[1.7] text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-[10px] tracking-[0.18em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-copper hover:text-copper transition-colors font-body"
                    >
                      View specifications →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectGalleryModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}