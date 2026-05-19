"use client";

import { cn } from "@/lib/utils";

type ProductSeries =
  | "ct4000"
  | "ct9000"
  | "ce6000"
  | "ct8000"
  | "chamber"
  | "formation"
  | "ct3000"
  | "resistors";

type Size = "sm" | "md" | "lg" | "xl";

interface ProductImagePlaceholderProps {
  productId?: string;
  series?: ProductSeries;
  size?: Size;
  className?: string;
}

const seriesColors: Record<ProductSeries, { primary: string; secondary: string }> = {
  ct4000: { primary: "#3B82F6", secondary: "#93C5FD" },
  ct9000: { primary: "#10B981", secondary: "#6EE7B7" },
  ce6000: { primary: "#F59E0B", secondary: "#FCD34D" },
  ct8000: { primary: "#8B5CF6", secondary: "#C4B5FD" },
  chamber: { primary: "#06B6D4", secondary: "#67E8F9" },
  formation: { primary: "#EC4899", secondary: "#F9A8D4" },
  ct3000: { primary: "#6B7280", secondary: "#9CA3AF" },
  resistors: { primary: "#EF4444", secondary: "#FCA5A5" },
};

const sizeDimensions: Record<Size, { width: number; height: number; fontSize: number }> = {
  sm: { width: 120, height: 90, fontSize: 8 },
  md: { width: 240, height: 180, fontSize: 10 },
  lg: { width: 400, height: 300, fontSize: 12 },
  xl: { width: 600, height: 450, fontSize: 14 },
};

function getSeriesFromProductId(productId?: string): ProductSeries {
  if (!productId) return "ct4000";

  const id = productId.toLowerCase();

  if (id.includes("ct4000") || id.includes("cte-4000") || id.startsWith("bts4000")) {
    return "ct4000";
  }
  if (id.includes("ct9000") || id.includes("bts9000")) {
    return "ct9000";
  }
  if (id.includes("ce6000") || id.includes("igbt") || id.includes("ce-6000")) {
    return "ce6000";
  }
  if (id.includes("ct8000") || id.includes("cte-8000") || id.includes("bts8000")) {
    return "ct8000";
  }
  if (id.includes("chamber") || id.includes("温度") || id.includes("高低")) {
    return "chamber";
  }
  if (id.includes("formation") || id.includes("化成")) {
    return "formation";
  }
  if (id.includes("ct3000") || id.includes("bts3000")) {
    return "ct3000";
  }
  if (id.includes("resistor") || id.includes("电阻")) {
    return "resistors";
  }

  return "ct4000";
}

export function ProductImagePlaceholder({
  productId,
  series,
  size = "md",
  className,
}: ProductImagePlaceholderProps) {
  const selectedSeries = series || getSeriesFromProductId(productId);
  const colors = seriesColors[selectedSeries] || seriesColors.ct4000;
  const dimensions = sizeDimensions[size];

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-slate-50", className)}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Product placeholder"
      >
        {/* Background grid pattern */}
        <defs>
          <pattern
            id={`grid-${selectedSeries}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="0.3"
              opacity="0.3"
            />
          </pattern>

          <linearGradient
            id={`gradient-${selectedSeries}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill={`url(#gradient-${selectedSeries})`} />
        <rect width="100%" height="100%" fill={`url(#grid-${selectedSeries})`} />

        {/* Equipment body outline */}
        <rect
          x={dimensions.width * 0.1}
          y={dimensions.height * 0.15}
          width={dimensions.width * 0.8}
          height={dimensions.height * 0.55}
          rx="8"
          fill="white"
          stroke={colors.primary}
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Display screen */}
        <rect
          x={dimensions.width * 0.2}
          y={dimensions.height * 0.22}
          width={dimensions.width * 0.35}
          height={dimensions.height * 0.25}
          rx="3"
          fill={colors.secondary}
          opacity="0.2"
          stroke={colors.primary}
          strokeWidth="1"
        />

        {/* Display content lines */}
        <line
          x1={dimensions.width * 0.23}
          y1={dimensions.height * 0.28}
          x2={dimensions.width * 0.48}
          y2={dimensions.height * 0.28}
          stroke={colors.primary}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1={dimensions.width * 0.23}
          y1={dimensions.height * 0.33}
          x2={dimensions.width * 0.42}
          y2={dimensions.height * 0.33}
          stroke={colors.primary}
          strokeWidth="1"
          opacity="0.3"
        />
        <line
          x1={dimensions.width * 0.23}
          y1={dimensions.height * 0.38}
          x2={dimensions.width * 0.45}
          y2={dimensions.height * 0.38}
          stroke={colors.primary}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Status indicators */}
        <circle
          cx={dimensions.width * 0.62}
          cy={dimensions.height * 0.28}
          r="6"
          fill="#10B981"
          opacity="0.8"
        />
        <circle
          cx={dimensions.width * 0.72}
          cy={dimensions.height * 0.28}
          r="6"
          fill="#F59E0B"
          opacity="0.8"
        />

        {/* Connection terminals */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle
              cx={dimensions.width * (0.22 + i * 0.14)}
              cy={dimensions.height * 0.58}
              r="8"
              fill="white"
              stroke={colors.primary}
              strokeWidth="1.5"
            />
            <circle
              cx={dimensions.width * (0.22 + i * 0.14)}
              cy={dimensions.height * 0.58}
              r="4"
              fill={colors.secondary}
            />
          </g>
        ))}

        {/* Cable lines from terminals */}
        <path
          d={`M ${dimensions.width * 0.22} ${dimensions.height * 0.66} 
              Q ${dimensions.width * 0.22} ${dimensions.height * 0.75} ${dimensions.width * 0.3} ${dimensions.height * 0.75}
              L ${dimensions.width * 0.7} ${dimensions.height * 0.75}
              Q ${dimensions.width * 0.78} ${dimensions.height * 0.75} ${dimensions.width * 0.78} ${dimensions.height * 0.85}`}
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Battery icon in display */}
        <rect
          x={dimensions.width * 0.65}
          y={dimensions.height * 0.38}
          width="18"
          height="10"
          rx="2"
          fill={colors.primary}
          opacity="0.4"
        />
        <rect
          x={dimensions.width * 0.65}
          y={dimensions.height * 0.38}
          width="12"
          height="10"
          rx="2"
          fill={colors.primary}
          opacity="0.6"
        />

        {/* NEWARE text branding */}
        <text
          x={dimensions.width / 2}
          y={dimensions.height * 0.88}
          textAnchor="middle"
          fontSize={dimensions.fontSize}
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill={colors.primary}
          opacity="0.7"
        >
          NEWARE
        </text>

        {/* Series indicator */}
        <text
          x={dimensions.width / 2}
          y={dimensions.height * 0.94}
          textAnchor="middle"
          fontSize={dimensions.fontSize * 0.7}
          fontFamily="system-ui, -apple-system, sans-serif"
          fill={colors.secondary}
          opacity="0.6"
        >
          Battery Testing Equipment
        </text>
      </svg>
    </div>
  );
}

export default ProductImagePlaceholder;
