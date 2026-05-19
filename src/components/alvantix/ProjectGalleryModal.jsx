import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function ProjectGalleryModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [panning, setPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [panBase, setPanBase] = useState({ x: 0, y: 0 });

  // Reset zoom/pan when image changes
  useEffect(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setPanBase({ x: 0, y: 0 });
  }, [activeImg]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImg(i => Math.min(i + 1, project.images.length - 1));
      if (e.key === 'ArrowLeft') setActiveImg(i => Math.max(i - 1, 0));
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + 0.5, 4));
      if (e.key === '-') setZoom(z => Math.max(z - 0.5, 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, project.images.length]);

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    setPanBase({ ...panOffset });
  };
  const handleMouseMove = (e) => {
    if (!panning) return;
    setPanOffset({
      x: panBase.x + (e.clientX - panStart.x),
      y: panBase.y + (e.clientY - panStart.y),
    });
  };
  const handleMouseUp = () => setPanning(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setZoom(z => Math.min(Math.max(z + delta, 1), 4));
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* ── LEFT: Zoomable Gallery ── */}
        <div className="flex-1 flex flex-col h-[55vh] md:h-full min-h-0 relative">
          {/* Controls bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5">
              <button onClick={() => setZoom(z => Math.max(z - 0.5, 1))}
                className="p-1 hover:text-copper transition-colors" title="Zoom out (-)">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] tracking-[0.15em] w-10 text-center font-body text-muted-foreground">
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={() => setZoom(z => Math.min(z + 0.5, 4))}
                className="p-1 hover:text-copper transition-colors" title="Zoom in (+)">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-border mx-1" />
              <button onClick={() => { setZoom(1); setPanOffset({ x: 0, y: 0 }); }}
                className="p-1 hover:text-copper transition-colors text-[9px] tracking-[0.1em] uppercase" title="Reset zoom">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <button onClick={onClose}
              className="p-2 bg-background/80 backdrop-blur-sm border border-border hover:bg-foreground hover:text-primary-foreground transition-all duration-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main image */}
          <div
            className={`flex-1 overflow-hidden flex items-center justify-center select-none ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <motion.img
              key={activeImg}
              src={project.images[activeImg]}
              alt={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              draggable={false}
              style={{
                transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
                transition: panning ? 'none' : 'transform 0.2s ease',
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Nav arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImg(i => Math.max(i - 1, 0))}
                disabled={activeImg === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 border border-border hover:bg-foreground hover:text-primary-foreground transition-all disabled:opacity-20">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveImg(i => Math.min(i + 1, project.images.length - 1))}
                disabled={activeImg === project.images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 border border-border hover:bg-foreground hover:text-primary-foreground transition-all disabled:opacity-20">
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 px-4">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-14 h-10 overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? 'border-copper' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 z-20 text-[10px] tracking-[0.15em] text-muted-foreground font-body">
            {String(activeImg + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
          </div>
        </div>

        {/* ── RIGHT: Technical Sidebar ── */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full md:w-[360px] lg:w-[400px] flex-shrink-0 bg-background border-t md:border-t-0 md:border-l border-border overflow-y-auto h-[45vh] md:h-full"
        >
          <div className="p-6 md:p-8 space-y-8">
            {/* Header */}
            <div className="border-b border-border pb-6">
              <p className="text-[9px] tracking-[0.3em] uppercase text-copper font-body mb-2">
                {project.meta}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium leading-tight mb-3">
                {project.title}
              </h2>
              <p className="text-sm leading-[1.7] text-muted-foreground font-body">
                {project.description}
              </p>
            </div>

            {/* Technical specs */}
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-4">
                Technical Specifications
              </p>
              <div className="space-y-0 divide-y divide-border">
                {project.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-start py-3 gap-4">
                    <p className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground font-body flex-shrink-0">
                      {spec.label}
                    </p>
                    <p className="text-sm text-right font-body text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key metrics */}
            {project.metrics && (
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-body mb-4">
                  Key Metrics
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="border border-border p-4">
                      <p className="font-heading text-2xl font-medium text-copper mb-1">{m.value}</p>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground font-body">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keyboard hint */}
            <div className="border-t border-border pt-4">
              <p className="text-[9px] text-muted-foreground/50 font-body leading-relaxed">
                Use ← → to navigate · Scroll or +/- to zoom · Drag to pan when zoomed · ESC to close
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}