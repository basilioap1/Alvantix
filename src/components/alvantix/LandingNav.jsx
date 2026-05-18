import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', href: '/group#about' },
  { label: 'Sectors', href: '/group#sectors' },
  { label: 'Services', href: '/group#services' },
  { label: 'Contact', href: '/group#contact' },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className={`font-heading text-base md:text-lg tracking-[0.32em] font-semibold transition-colors duration-500 z-10 ${
              open ? 'text-primary-foreground' : scrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}
          >
            ALVANTIX
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className={`text-[11px] tracking-[0.2em] uppercase transition-colors font-body ${
                  scrolled
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="/group#contact"
            className={`hidden md:inline-flex items-center gap-2 border px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase font-body transition-all duration-300 ${
              scrolled
                ? 'border-foreground/30 text-foreground hover:bg-foreground hover:text-primary-foreground'
                : 'border-primary-foreground/30 text-primary-foreground/80 hover:border-copper hover:text-copper'
            }`}>
            Contact
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-end gap-1.5 focus:outline-none"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              transition={{ duration: 0.3 }}
              className={`block h-px origin-center transition-colors ${open ? 'bg-primary-foreground' : scrolled ? 'bg-foreground' : 'bg-primary-foreground'}`}
              style={{ width: '24px' }}
            />
            <motion.span
              animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`block h-px transition-colors ${open ? 'bg-primary-foreground' : scrolled ? 'bg-foreground' : 'bg-primary-foreground'}`}
              style={{ width: '16px' }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              transition={{ duration: 0.3 }}
              className={`block h-px origin-center transition-colors ${open ? 'bg-primary-foreground' : scrolled ? 'bg-foreground' : 'bg-primary-foreground'}`}
              style={{ width: '24px' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-foreground flex flex-col justify-between px-8 pt-28 pb-12"
          >
            {/* Links */}
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-heading text-4xl font-medium text-primary-foreground/80 hover:text-copper transition-colors py-3 border-b border-primary-foreground/10"
                  >
                    {l.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <a
                href="/group#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center border border-copper text-copper px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-body hover:bg-copper hover:text-foreground transition-all duration-300"
              >
                Get in Touch
              </a>
              <p className="text-[9px] tracking-[0.2em] uppercase text-primary-foreground/20 font-body text-center">
                © 2025 Alvantix LLC
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}