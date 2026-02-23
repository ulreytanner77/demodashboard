"use client"

/**
 * Northstar logo: compass-style star with north on top. Purple highlight on north point.
 */
export function NorthstarLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <defs>
        {/* Purple at top (north), accent-foreground below */}
        <linearGradient id="northstar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-chart-4)" />
          <stop offset="35%" stopColor="var(--color-chart-4)" />
          <stop offset="100%" stopColor="var(--color-accent-foreground)" />
        </linearGradient>
      </defs>
      {/* 4-point compass star — top point is north (North Star) */}
      <path
        d="M12 2 L14.5 10 L22 12 L14.5 14 L12 22 L9.5 14 L2 12 L9.5 10 Z"
        fill="url(#northstar-gradient)"
        fillOpacity={0.95}
        stroke="url(#northstar-gradient)"
      />
      {/* Center dot = the star (Polaris) */}
      <circle cx="12" cy="12" r="2" fill="var(--color-accent-foreground)" stroke="none" />
    </svg>
  )
}
