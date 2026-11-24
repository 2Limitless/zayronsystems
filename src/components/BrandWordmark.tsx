/**
 * Clean typographic brand wordmark used across headers and gateways
 * until a dedicated graphical logo mark is needed.
 */
export default function BrandWordmark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
  }[size];

  return (
    <span
      className={`inline-flex items-baseline font-sans font-bold tracking-tight select-none leading-none ${sizeClasses} ${className}`}
    >
      <span className="text-white">Pongo</span>
      <span className="text-[#00ff66]">fly</span>
      <span className="text-[#00ff66] ml-0.5">.</span>
    </span>
  );
}
