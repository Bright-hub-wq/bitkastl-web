interface Props {
    map: string[];
    gap?: number;
    maxWidth?: number;
    fill?: string;
    blueEvery?: number;
    animate?: boolean;
    center?: boolean;
    label?: string;
}

export function PixelGrid({
                              map,
                              gap = 4,
                              maxWidth = 420,
                              fill,
                              blueEvery = 4,
                              animate = true,
                              center = true,
                              label,
                          }: Props) {
    let n = 0;
    return (
        <div
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${map[0].length}, 1fr)`,
                gap,
                maxWidth,
                width: "100%",
                margin: center ? "0 auto" : 0,
            }}
        >
            {map.flatMap((row, y) =>
                row.split("").map((c, x) => {
                    n++;
                    const on = c === "#";
                    const bg = !on ? "transparent" : fill ?? ((x + y) % blueEvery === 0 ? "var(--blue)" : "var(--ink)");
                    return (
                        <i
                            key={`${x}-${y}`}
                            style={{
                                display: "block",
                                aspectRatio: "1",
                                background: bg,
                                animation: on && animate ? `pop 3.2s ease-in-out ${(n % 11) * 0.18}s infinite` : undefined,
                            }}
                        />
                    );
                })
            )}
        </div>
    );
}