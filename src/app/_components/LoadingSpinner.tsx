// LoadingSpinner.tsx
"use client";
type Props = {
  size?: number;
  stroke?: number;
  className?: string;
  label?: string;
};

export default function LoadingSpinner({
  size = 24,
  stroke = 2,
  className,
  label = "Loading",
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="status"
      aria-label={label}
      className={className}
      style={{ display: "inline-block" }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { transform-origin: 50% 50%; animation: spin 1s linear infinite; }
      `}</style>
      <g
        className="spin"
        stroke="currentColor"
        strokeWidth={stroke}
        fill="none"
      >
        <circle cx="12" cy="12" r="9" opacity=".25" />
        <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
      </g>
    </svg>
  );
}
