import { useState } from "react";
import { Btn } from "./Btn";
import { Reveal } from "./Reveal";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import type { Key } from "../i18n/translation";
import { card, h2, pad, sub, wrap } from "../ui";

const ITEMS: [Key, Key][] = [
    ["q1", "a1"],
    ["q2", "a2"],
    ["q3", "a3"],
    ["q4", "a4"],
    ["q5", "a5"],
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                ...card,
                position: "relative",
                overflow: "hidden",
                padding: 0,
                borderRadius: 16,
                background: open
                    ? "linear-gradient(135deg, rgba(59,91,255,0.22), rgba(13,15,26,0.94) 70%)"
                    : card.background,
                border: open ? "1px solid rgba(120,140,255,0.4)" : hover ? "1px solid rgba(255,255,255,0.22)" : card.border,
                boxShadow: open
                    ? "0 20px 50px -20px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : card.boxShadow,
                transition: "border 0.2s, box-shadow 0.25s, background 0.25s",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: "linear-gradient(180deg, var(--gold), var(--blue))",
                    opacity: open ? 1 : 0,
                    transition: "opacity 0.25s",
                }}
            />

            <button
                onClick={onToggle}
                aria-expanded={open}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "20px 22px",
                    background: "none",
                    border: 0,
                    color: "var(--ink)",
                    fontWeight: 600,
                    fontSize: 16,
                    textAlign: "left",
                    cursor: "pointer",
                }}
            >
                {q}
                <span
                    style={{
                        flex: "none",
                        width: 30,
                        height: 30,
                        borderRadius: 99,
                        display: "grid",
                        placeItems: "center",
                        background: open ? "var(--gold)" : "rgba(255,255,255,0.06)",
                        color: open ? "#1a1204" : "var(--ink)",
                        border: open ? "1px solid var(--gold)" : "1px solid var(--line)",
                        fontWeight: 700,
                        fontSize: 18,
                        lineHeight: 1,
                        transform: open ? "rotate(45deg)" : "none",
                        transition: "transform 0.25s, background 0.25s, color 0.25s",
                    }}
                >
                    +
                </span>
            </button>

            <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}>
                <div style={{ overflow: "hidden", minHeight: 0 }}>
                    <p style={{ margin: 0, padding: "0 22px 22px", color: "var(--muted)" }}>{a}</p>
                </div>
            </div>
        </div>
    );
}

export function Faq() {
    const mobile = useIsMobile();
    const { t } = useLang();
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section
            id="faq"
            style={{
                ...wrap,
                ...pad(mobile),
                display: "grid",
                gridTemplateColumns: mobile ? "1fr" : "1fr 1.7fr",
                gap: mobile ? 28 : 64,
                alignItems: "start",
            }}
        >
            <Reveal style={mobile ? undefined : { position: "sticky", top: 110 }}>
                <h2 style={h2}>{t("faq_title")}</h2>
                <p style={sub}>{t("faq_sub")}</p>
                <Btn variant="solid" onClick={() => window.dispatchEvent(new Event("bk-open-chat"))}>
                    {t("faq_chat")}
                </Btn>
            </Reveal>

            <div style={{ display: "grid", gap: 12 }}>
                {ITEMS.map(([q, a], i) => (
                    <Reveal key={q} delay={i * 80}>
                        <Item q={t(q)} a={t(a)} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}