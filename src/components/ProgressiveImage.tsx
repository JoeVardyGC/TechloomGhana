import React, { useState, useMemo } from 'react';

export interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
  aspectRatio?: string;
}

export default function ProgressiveImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fallbackSrc = '/portfolio-assets/elan-noir-flyer.webp',
  aspectRatio,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Compute corresponding webp source if the image is a local asset
  const webpSrc = useMemo(() => {
    if (!src) return null;
    if (src.endsWith('.webp')) return src;
    if (src.startsWith('/') || src.startsWith('./') || !src.startsWith('http')) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return null;
  }, [src]);

  const currentSrc = hasError ? fallbackSrc : src;

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Shimmer Placeholder Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200/90 dark:bg-slate-800/80 animate-pulse transition-opacity duration-300 z-0">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
        </div>
      )}

      <picture>
        {webpSrc && !hasError && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={(e) => {
            setIsLoaded(true);
            if (onLoad) onLoad(e);
          }}
          onError={(e) => {
            if (!hasError) {
              setHasError(true);
            }
            if (onError) onError(e);
          }}
          className={`transition-opacity duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      </picture>
    </div>
  );
}
