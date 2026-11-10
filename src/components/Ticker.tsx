import { useState, type CSSProperties } from "react";
import { useCoins } from "../hooks/useCoins";

const bar: CSSProperties = {
    borderTop: "1px solid var(--line)",
    borderBottom: "1px solid var(--line)",
    background: "rgba(255,255,255,0.03)",
    overflow: "hidden",
    height: 46,
};

export function Ticker() {
    const { coins } = useCoins();
    const [paused, setPaused] = useState(false);

    if (!coins.length) return <div style={bar} />;

    const items = [...coins, ...coins];

    return (
        <div
            style={bar}
            aria-label="Live crypto prices"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                style={{
                    display: "flex",
                    width: "max-content",
                    animation: "scroll 45s linear infinite",
                    animationPlayState: paused ? "paused" : "running",
                }}
            >
                {items.map((c, i) => {
                    const change = c.price_change_percentage_24h ?? 0;
                    const up = change >= 0;
                    return (
                        <span
                            key={c.id + i}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "0 26px",
                                height: 46,
                                fontSize: 14,
                                whiteSpace: "nowrap",
                                borderRight: "1px solid var(--soft)",
                            }}
                        >
                            <img src={c.image} alt="" width={20} height={20} style={{ borderRadius: "50%" }} />
                            <b>{c.symbol.toUpperCase()}</b>
                            <span style={{ color: "var(--muted)" }}>
                                ${c.current_price.toLocaleString(undefined, { maximumFractionDigits: c.current_price < 1 ? 4 : 2 })}
                            </span>
                            <span style={{ color: up ? "#34d399" : "#f87171", fontWeight: 600 }}>
                                {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}