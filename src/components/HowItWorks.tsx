import { Reveal } from "./Reveal";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import { card, gradientText, h2, michroma, pad, sub, wrap } from "../ui";

export function HowItWorks() {
    const mobile = useIsMobile();
    const { t } = useLang();

    const steps = [
        [t("s1_t"), t("s1_d")],
        [t("s2_t"), t("s2_d")],
        [t("s3_t"), t("s3_d")],
    ];

    return (
        <section id="how" style={{ ...wrap, ...pad(mobile) }}>
            <Reveal>
                <h2 style={h2}>{t("how_title")}</h2>
                <p style={sub}>{t("how_sub")}</p>
            </Reveal>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
                    gap: mobile ? 16 : 24,
                    alignItems: "end",
                }}
            >
                {steps.map(([title, desc], i) => {
                    const last = i === 2;
                    return (
                        <Reveal key={title} delay={i * 150} style={{ minHeight: mobile ? 0 : 230 + i * 80 }}>
                            <div
                                style={{
                                    ...card,
                                    height: "100%",
                                    background: last
                                        ? "linear-gradient(135deg, rgba(59,91,255,0.45), rgba(13,15,26,0.92) 75%)"
                                        : card.background,
                                    border: last ? "1px solid rgba(120,140,255,0.4)" : card.border,
                                    boxShadow: last
                                        ? "0 24px 70px -18px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.14)"
                                        : card.boxShadow,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    gap: 24,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                                    {Array.from({ length: i + 1 }).map((_, k) => (
                                        <span
                                            key={k}
                                            style={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: 3,
                                                background: last ? "#fff" : "var(--gold)",
                                                display: "block",
                                            }}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div style={{ fontFamily: michroma, fontSize: 40, lineHeight: 1 }}>
                                        <span style={gradientText}>0{i + 1}</span>
                                    </div>
                                    <h3 style={{ margin: "14px 0 8px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</h3>
                                    <p style={{ margin: 0, color: last ? "rgba(238,240,248,0.85)" : "var(--muted)" }}>{desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}