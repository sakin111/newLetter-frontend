import { useEffect, useRef, useState } from "react";
import { optimizeImage } from "./optimizeImage";
import { Skeleton } from "./Skeleton";


type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  darkSrc?: string;
};

export const Image = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  placeholder = "empty",
  blurDataURL,
  darkSrc,
}: ImageProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);

  // Dark mode detection
  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const finalSrc = isDark && darkSrc ? darkSrc : src;

  // Intersection Observer  
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    });

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const optimizedSrc = inView
    ? optimizeImage(finalSrc, { width })
    : undefined;

  return (
    <div
      style={{
        position: "relative",
        width: width ? `${width}px` : "100%",
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        overflow: "hidden",
      }}
    >
      {!loaded && <Skeleton width={width} height={height} />}

      {placeholder === "blur" && blurDataURL && !loaded && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      )}

      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
};
