const MAP = [
    "#.#.#.#.#",
    "#########",
    "##.###.##",
    "#########",
    "###...###",
    "###.#.###",
    "###.#.###",
];

export function PixelCastle() {
    let n = 0;

    return (
        <div className="castle" role="img" aria-label="Pixel castle illustration">
            {MAP.flatMap((row, y) =>
                row.split("").map((c, x) => {
                    n++;
                    const cls = c === "#" ? ((x + y) % 4 === 0 ? "px blue" : "px") : "px off";
                    return (
                        <i
                            key={`${x}-${y}`}
                            className={cls}
                            style={{ animationDelay: `${(n % 11) * 0.18}s` }}
                        />
                    );
                })
            )}
        </div>
    );
}