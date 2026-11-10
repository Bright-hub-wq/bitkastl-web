import { michroma } from "../ui";

const CELLS: [number, number][] = [
    [0, 0],
    [0, 1], [1, 1], [2, 1],
    [0, 2], [2, 2],
    [0, 3], [1, 3], [2, 3],
];

export function Logo({ size = 32 }: { size?: number }) {
    return (
        <span
            aria-label="BitKastl"
            style={{ display: "inline-flex", alignItems: "center", gap: size * 0.43, fontSize: size * 0.62 }}
        >
      <svg width={(size * 3) / 4} height={size} viewBox="0 0 3 4" shapeRendering="crispEdges" aria-hidden="true">
        {CELLS.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--blue)" />
        ))}
      </svg>
      <span aria-hidden="true" style={{ fontFamily: michroma, letterSpacing: "0.02em", color: "var(--ink)" }}>
        B
        <span style={{ position: "relative" }}>
          ı
          <i
              style={{
                  position: "absolute",
                  width: "0.2em",
                  height: "0.2em",
                  background: "var(--blue)",
                  left: "50%",
                  top: "-0.05em",
                  transform: "translateX(-50%)",
              }}
          />
        </span>
        tKastl
      </span>
    </span>
    );
}