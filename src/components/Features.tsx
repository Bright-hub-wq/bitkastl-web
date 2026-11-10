import { useState } from "react";
import { PixelGrid } from "./PixelGrid";
import { Reveal } from "./Reveal";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import type { Key } from "../i18n/translation";
import { card, h2, michroma, pad, sub, wrap } from "../ui";

interface Tile {
    t: Key;
    d: Key;
    span: number;
    dark: boolean;
    icon: string[];
}

const TILES: Tile[] = [
    { t: "f1_t", d: "f1_d", span: 2, dark: true, icon: ["..#..", "..#..", "#.#.#", ".###.", "#####"] },
    { t: "f2_t", d: "f2_d", span: 1, dark: false, icon: ["#.###", ".....", "#.###", ".....", "#.###"] },
    { t: "f3_t", d: "f3_d", span: 1, dark: false, icon: [".###.", ".#.#.", ".#.#.", ".#.#.", ".###."] },
    { t: "f4_t", d: "f4_d", span: 2, dark: true, icon: [".###.", ".#.#.", "#####", "##.##", "#####"] },
];

function TileCard({ tile, index, mobile }: { tile: Tile; index: number; mobile: boolean }) {
    const { t } = useLang();
    const [hover, setHover] = useState(false);

    const highlight = tile.dark;

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                ...card,
                minHeight: mobile ? 0 : 240,
                height: "100%",
                position: "relative",
                overflow: "hidden",
                background: highlight
                    ? "linear-gradient(135deg, rgba(59,91,255,0.38), rgba(13,15,26,0.92) 70%)"
                    : card.background,
                border: highlight ? "1px solid rgba(120,140,255,0.35)" : card.border,
                boxShadow: hover
                    ? "0 24px 60px -18px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.12)"
                    : card.boxShadow,
                transform: hover ? "translateY(-5px)" : "none",
                transition: "transform 0.2s, box-shadow 0.25s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 28,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div
                    style={{
                        width: 64,
                        padding: 10,
                        borderRadius: 14,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--line)",
                    }}
                >
                    <PixelGrid map={tile.icon} gap={3} maxWidth={44} center={false} fill={highlight ? "#fff" : "var(--gold)"} />
                </div>
                <span style={{ fontFamily: michroma, fontSize: 12, color: "var(--muted)", letterSpacing: "0.1em" }}>
                    0{index + 1}
                </span>
            </div>

            <div>
                <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{t(tile.t)}</h3>
                <p style={{ margin: 0, color: highlight ? "rgba(238,240,248,0.85)" : "var(--muted)", maxWidth: 420 }}>
                    {t(tile.d)}
                </p>
            </div>
        </div>
    );
}

export function Features() {
    const mobile = useIsMobile();
    const { t } = useLang();

    return (
        <section id="features" style={{ ...wrap, ...pad(mobile) }}>
            <Reveal>
                <h2 style={h2}>{t("feat_title")}</h2>
                <p style={sub}>{t("feat_sub")}</p>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
                {TILES.map((tile, i) => (
                    <Reveal key={tile.t} delay={i * 100} style={{ gridColumn: mobile ? "auto" : `span ${tile.span}` }}>
                        <TileCard tile={tile} index={i} mobile={mobile} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}