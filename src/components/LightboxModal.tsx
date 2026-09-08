import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  ExternalLink,
  Info,
  Layers
} from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

export interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  projectTitle?: string;
  projectCategory?: string;
  clientName?: string;
  projectLink?: string;
}

export type AspectRatioType = 'tall' | 'portrait' | 'square' | 'landscape' | 'unknown';

export default function LightboxModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectTitle = 'Design Showcase',
  projectCategory = 'Graphic Design',
  clientName,
  projectLink
}: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [aspectType, setAspectType] = useState<AspectRatioType>('unknown');
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync index when initialIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      resetZoom();
    }
  }, [isOpen, initialIndex]);

  // Reset zoom & pan when switching images
  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetZoom();
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetZoom();
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.25, 0.75);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  // Natural aspect ratio calculation
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setDimensions({ width: naturalWidth, height: naturalHeight });
    const ratio = naturalWidth / naturalHeight;

    if (ratio < 0.62) {
      setAspectType('tall'); // 9:16 roll-up banner, vertical posters
    } else if (ratio >= 0.62 && ratio <= 0.85) {
      setAspectType('portrait'); // 4:5 Instagram flyers
    } else if (ratio > 0.85 && ratio < 1.15) {
      setAspectType('square'); // 1:1 square graphics
    } else {
      setAspectType('landscape'); // Landscape / Wide screens
    }
  };

  // Mouse pan handlers for zoom state
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const aspectBadge = useMemo(() => {
    switch (aspectType) {
      case 'tall':
        return { label: 'Roll-Up Banner / 9:16', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'portrait':
        return { label: 'Portrait Flyer / 4:5', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'square':
        return { label: 'Square Post / 1:1', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'landscape':
        return { label: 'Landscape View', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      default:
        return { label: 'Natural Ratio', color: 'bg-slate-700/50 text-slate-300 border-slate-600/30' };
    }
  }, [aspectType]);

  const currentImage = images[currentIndex] || '';

  const whatsappMessage = encodeURIComponent(
    `Hello Techloom, I am interested in getting a design like "${projectTitle}". Could you provide pricing and turnaround time?`
  );
  const whatsappUrl = `https://wa.me/233256259336?text=${whatsappMessage}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-slate-950/96 backdrop-blur-md flex flex-col justify-between select-none overflow-hidden"
        onClick={onClose}
      >
        {/* TOP BAR: Project Context, Aspect Ratio Badge & Actions */}
        <div
          className="relative z-30 flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 bg-slate-900/80 backdrop-blur-md border-b border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: Project title & Badges */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-brand-blue text-white px-2.5 py-1 rounded-md shrink-0">
              {projectCategory}
            </span>

            <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border shrink-0 hidden sm:inline-block ${aspectBadge.color}`}>
              {aspectBadge.label}
            </span>

            <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {projectTitle}
            </h3>

            {clientName && (
              <span className="text-xs text-slate-400 hidden md:inline truncate">
                • {clientName}
              </span>
            )}
          </div>

          {/* Right: Zoom controls, slide count, WhatsApp & Close */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Zoom Controls Pill */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-xl p-1 border border-white/10 text-white">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                title="Zoom Out (-)"
                className="p-1.5 hover:bg-white/15 rounded-lg disabled:opacity-40 transition cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-mono font-bold px-2 text-slate-300 min-w-[42px] text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                title="Zoom In (+)"
                className="p-1.5 hover:bg-white/15 rounded-lg disabled:opacity-40 transition cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              {zoom !== 1 && (
                <button
                  onClick={resetZoom}
                  title="Reset Zoom (0)"
                  className="p-1.5 hover:bg-white/15 rounded-lg text-brand-cyan transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Slide counter */}
            {images.length > 1 && (
              <span className="text-xs font-mono font-bold text-slate-400 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                {currentIndex + 1}/{images.length}
              </span>
            )}

            {/* Inquire on WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition shadow-sm cursor-pointer"
              title="Inquire about this design on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Inquire</span>
            </a>

            {/* Close Lightbox */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer border border-white/10 active:scale-95"
              aria-label="Close Lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MAIN CANVAS: Uncropped Auto-Detecting Viewport */}
        <div
          ref={containerRef}
          className={`relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-auto ${
            zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={(e) => {
            // Clicking canvas outside the image closes modal if not zoomed
            if (e.target === containerRef.current && zoom === 1) {
              onClose();
            }
          }}
        >
          {/* Previous Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition cursor-pointer shadow-2xl active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition cursor-pointer shadow-2xl active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Center Image Container with Pan and Zoom */}
          <div
            className={`relative transition-transform duration-150 ease-out flex items-center justify-center ${
              aspectType === 'tall' && zoom === 1 ? 'h-full max-h-[86vh]' : ''
            }`}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProgressiveImage
              src={currentImage}
              alt={projectTitle}
              onLoad={handleImageLoad}
              wrapperClassName="max-w-full max-h-[82vh] sm:max-h-[86vh] flex items-center justify-center"
              className={`max-w-full max-h-[82vh] sm:max-h-[86vh] object-contain rounded-xl shadow-2xl transition-shadow ${
                aspectType === 'tall' ? 'w-auto h-full' : 'w-auto h-auto'
              }`}
            />
          </div>
        </div>

        {/* BOTTOM CONTROLS & THUMBNAILS FILMSTRIP */}
        <div
          className="relative z-30 px-4 py-3 bg-slate-900/80 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Dimension & Format Notice */}
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-brand-blue shrink-0" />
            <span>
              {dimensions
                ? `${dimensions.width} × ${dimensions.height}px • Full Uncropped Resolution`
                : 'High-Resolution Display'}
            </span>
          </div>

          {/* Filmstrip thumbnails if multiple assets */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto max-w-2xl scrollbar-thin py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    resetZoom();
                  }}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                    currentIndex === idx
                      ? 'border-brand-blue ring-2 ring-brand-blue/40 scale-105 opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <ProgressiveImage
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Quick tip on controls */}
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-500">
            <span>Keys: [← / →] Browse • [+/-] Zoom • [Esc] Close</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
