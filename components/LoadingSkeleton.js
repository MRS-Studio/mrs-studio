// components/LoadingSkeleton.js
// Skeleton placeholder for product cards
const heights = [280, 320, 260, 360, 300, 380, 250, 310, 290, 340, 270, 330];

export default function LoadingSkeleton({ index = 0 }) {
  const h = heights[index % heights.length];
  return (
    <div className="rounded-2xl overflow-hidden bg-cream dark:bg-brown-dark/50 border border-brown/5 dark:border-cream/5">
      {/* Image placeholder */}
      <div className="skeleton" style={{ height: h }} />
      {/* Content placeholder */}
      <div className="p-3.5 space-y-2">
        <div className="skeleton h-3 rounded-full w-4/5" />
        <div className="skeleton h-3 rounded-full w-3/5" />
        <div className="skeleton h-5 w-16 rounded-full mt-2" />
      </div>
    </div>
  );
}
