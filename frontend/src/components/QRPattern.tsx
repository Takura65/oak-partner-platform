import { useMemo } from "react";

interface QRPatternProps {
  seed?: number;
  size?: number;
}

export default function QRPattern({ seed = 1, size = 180 }: QRPatternProps) {
  const cells = 15;
  const grid = useMemo(() => {
    let s = seed * 9301 + 49297;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const arr: boolean[] = [];
    for (let i = 0; i < cells * cells; i++) arr.push(rand() > 0.55);
    return arr;
  }, [seed]);

  const cellSize = size / cells;

  return (
    <svg width={size} height={size} className="rounded-md">
      <rect width={size} height={size} fill="white" />
      {grid.map((on, i) => {
        if (!on) return null;
        const x = (i % cells) * cellSize;
        const y = Math.floor(i / cells) * cellSize;
        return <rect key={i} x={x} y={y} width={cellSize} height={cellSize} fill="#0f1e3d" />;
      })}
      {([[0, 0], [cells - 3, 0], [0, cells - 3]] as const).map(([cx, cy], idx) => (
        <g key={idx}>
          <rect x={cx * cellSize} y={cy * cellSize} width={cellSize * 3} height={cellSize * 3} fill="#0f1e3d" />
          <rect x={cx * cellSize + cellSize * 0.6} y={cy * cellSize + cellSize * 0.6} width={cellSize * 1.8} height={cellSize * 1.8} fill="white" />
          <rect x={cx * cellSize + cellSize * 1.1} y={cy * cellSize + cellSize * 1.1} width={cellSize * 0.8} height={cellSize * 0.8} fill="#0f1e3d" />
        </g>
      ))}
    </svg>
  );
}
