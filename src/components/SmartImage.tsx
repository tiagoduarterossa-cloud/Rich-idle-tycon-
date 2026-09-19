import { useState, type ReactNode } from 'react';

interface SmartImageProps {
  src?: string;
  alt: string;
  fallback: ReactNode;
}

export function SmartImage({ src, alt, fallback }: SmartImageProps) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}
