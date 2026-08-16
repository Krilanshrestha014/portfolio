import { useState, useRef, useEffect } from "react";

const loadedImages = new Set();

function ImageWithSkeleton({
  src,
  alt,
  imgClassName = "",
  containerClassName = "",
  minHeightClassName = "min-h-[220px] sm:min-h-[320px] md:min-h-[420px]",
}) {
  const [loaded, setLoaded] = useState(() => loadedImages.has(src));
  const imgRef = useRef(null);

  useEffect(() => {
    if (loadedImages.has(src)) {
      setLoaded(true);
      return;
    }
    if (imgRef.current && imgRef.current.complete) {
      loadedImages.add(src);
      setLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    loadedImages.add(src);
    setLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${
        loaded ? "" : minHeightClassName
      } ${containerClassName}`}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-neutral-200 animate-pulse"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        className={`${imgClassName} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default ImageWithSkeleton;