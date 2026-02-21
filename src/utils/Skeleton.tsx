export const Skeleton = ({ width, height }: { width?: number; height?: number }) => (
  <div
    style={{
      width: width || "100%",
      height: height || "100%",
      background: "linear-gradient(90deg,#eee,#f5f5f5,#eee)",
      animation: "pulse 1.5s infinite",
    }}
  />
);
