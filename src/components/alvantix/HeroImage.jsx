import React from 'react';
import { motion } from 'framer-motion';

export default function HeroImage({ src }) {
  return (
    <section className="px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="overflow-hidden"
      >
        <img
          src={src}
          alt="Global trade operations"
          className="w-full h-[28vh] md:h-[45vh] object-cover"
        />
      </motion.div>
    </section>
  );
}