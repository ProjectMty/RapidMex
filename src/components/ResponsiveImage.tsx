// components/ResponsiveImage.tsx
import Image from "next/image";
import { useEffect, useState } from "react";

interface ResponsiveImageProps {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
}

const ResponsiveImage = ({ desktopSrc, mobileSrc, alt }: ResponsiveImageProps) => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = windowWidth !== null && windowWidth <= 768;
  const isDesktop = windowWidth !== null && windowWidth >= 1024;

  return (
    <Image
      src={isMobile ? mobileSrc : desktopSrc}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className="w-full h-full object-cover"
      style={{
        objectFit: isMobile ? "contain" : "cover",
        objectPosition: isDesktop ? "center" : "left",
      }}
    />
  );
};

export default ResponsiveImage;
