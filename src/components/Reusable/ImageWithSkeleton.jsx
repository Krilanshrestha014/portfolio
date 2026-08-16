import { useState } from "react";

function ImageWithSkeleton({
  src,
  alt,
  imgClassName = "",
  containerClassName = "",
  minHeightClassName = "min-h-[220px] sm:min-h-[320px] md:min-h-[420px]",
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${
        loaded ? "" : minHeightClassName
      } ${containerClassName}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-neutral-200 animate-pulse transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${imgClassName} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default ImageWithSkeleton;