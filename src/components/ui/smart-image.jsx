"use client";
import Image from "next/image";
import { useState, useMemo } from "react";

const isSvg = (src) =>
  typeof src === "string" && src.toLowerCase().endsWith(".svg");

const shimmer = (w = 700, h = 475) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Loading image">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e5e7eb" offset="20%" />
      <stop stop-color="#f3f4f6" offset="50%" />
      <stop stop-color="#e5e7eb" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e5e7eb" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function SmartImage({
  className = "",
  wrapperClassName = "",
  width,
  height,
  src,
  alt,
  priority = false,
  sizes,
  quality,
  decoding = "async",
  onLoadingComplete,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const svg = isSvg(src);

  const blurDataURL = useMemo(() => {
    if (svg) return undefined;
    const w = typeof width === "number" ? width : 1200;
    const h = typeof height === "number" ? height : 800;
    return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
  }, [svg, width, height]);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800"
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        decoding={decoding}
        placeholder={svg ? "empty" : "blur"}
        blurDataURL={svg ? undefined : blurDataURL}
        className={`transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={(img) => {
          setLoaded(true);
          onLoadingComplete?.(img);
        }}
        {...rest}
      />
    </div>
  );
}
