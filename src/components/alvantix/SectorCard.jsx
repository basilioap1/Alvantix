import React from 'react';
import { motion } from 'framer-motion';

export default function SectorCard({ index, meta, title, description, image }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className="grid md:grid-cols-12 gap-6 md:gap-10 py-12 border-b border-border last:border-0 items-start"
    >
      {/* Number */}
      <div className="md:col-span-1">
        <p className="text-xs text-copper font-body tracking-[0.15em]">{num}</p>
      </div>

      {/* Image — compact */}
      <div className="md:col-span-4 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt={title}
          className="w-full h-44 md:h-52 object-cover"
        />
      </div>

      {/* Content */}
      <div className="md:col-span-6">
        <p className="text-[9px] tracking-[0.22em] uppercase text-muted-foreground font-body mb-3">
          {meta}
        </p>
        <h3 className="font-heading text-xl md:text-2xl font-medium mb-3">{title}</h3>
        <p className="font-body text-sm md:text-base leading-[1.7] text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}