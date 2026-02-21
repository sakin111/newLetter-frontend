
type OptimizeOptions = {
  width?: number;
  quality?: number;
  format?: "webp" | "avif" | "auto";
};

export const optimizeImage = (
  src: string,
  { width, quality = 80, format = "auto" }: OptimizeOptions = {}
) => {


  // Skip optimization for local assets, blobs, or data URLs
  if (
    !src.startsWith("/") ||
    src.startsWith("/src/") ||
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    src.includes("ik.imagekit.io/your_id") // Don't re-optimize if already an ImageKit URL with placeholder
  ) {
    return src;
  }

  const params = [
    width && `w-${width}`,
    `q-${quality}`,
    `f-${format}`,
  ]
    .filter(Boolean)
    .join(",");

  // Use a safer default or handle the case where ID is not set
  const imageKitId = "your_id";
  if (imageKitId === "your_id") return src; // Return original if ID is still placeholder

  return `https://ik.imagekit.io/${imageKitId}${src}?tr=${params}`;
};
