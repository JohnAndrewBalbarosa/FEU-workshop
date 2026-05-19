import { useState, type ImgHTMLAttributes } from 'react';
import './placeholder.css';

interface PlaceholderImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  seed: string;
  width?: number;
  height?: number;
  topic?: string;
  showBadge?: boolean;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/**
 * Renders an image with graceful fallback to a stable picsum.photos seed when
 * the primary src is missing or 404s. Adds a "PLACEHOLDER" hairline corner
 * badge whenever the fallback is in use.
 */
export function PlaceholderImage({
  src,
  seed,
  width = 1200,
  height = 800,
  alt = '',
  showBadge = true,
  ...rest
}: PlaceholderImageProps) {
  const fallback = `https://picsum.photos/seed/${slug(seed)}/${width}/${height}`;
  const [current, setCurrent] = useState(src || fallback);
  const [isFallback, setIsFallback] = useState(!src);

  return (
    <span className="placeholder">
      <img
        {...rest}
        src={current}
        alt={alt}
        width={width}
        height={height}
        onError={() => {
          if (current !== fallback) {
            setCurrent(fallback);
            setIsFallback(true);
          }
        }}
      />
      {showBadge && isFallback ? (
        <span className="placeholder__badge mono">Placeholder</span>
      ) : null}
    </span>
  );
}
