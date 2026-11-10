import { PixelGrid } from "./PixelGrid";
import { Btn } from "./Btn";
import { Reveal } from "./Reveal";
import { useCountUp } from "../hooks/useCountUp";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import { card, eyebrow, gradientText, michroma, wrap } from "../ui";

const CASTLE = [
    "#.#.#.#.#",
    "#########",
    "##.###.##",
    "#########",
    "###...###",
    "###.#.###",
    "###.#.###",
];

const COUNTRIES = ["Spain", "Mexico", "Denmark", " Portugal", "United Kingdom", "United States", "Canada", "UAE", "Germany", "Portugal"];

const STATS = [
    { prefix: "$", target: 48.6, suffix: "M+", decimals: 1, label: "Total invested" },
    { prefix: "", target: 126000, suffix: "+", decimals: 0, label: "Active investors" },
    { prefix: "", target: 94, suffix: "", decimals: 0, label: "Countries served" },
    { prefix: "$", target: 12.3, suffix: "M", decimals: 1, label: "Paid out to date" },
];

function Stat({ prefix, target, suffix, decimals, label }: (typeof STATS)[number]) {
    const { ref, value } = useCountUp(target);
    return (
        <div>
            <div style={{ fontFamily: michroma, fontSize: "clamp(20px, 3vw, 30px)", lineHeight: 1.2 }}>
                <span ref={ref} style={gradientText}>
                    {prefix}
                    {value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
                    {suffix}
                </span>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{label}</div>
        </div>
    );
}

function PortfolioCard() {
    const { ref, value } = useCountUp(24860.5, 2200);
    return (
        <div
            style={{
                ...card,
                padding: 20,
                width: "100%",
                maxWidth: 270,
                background: "linear-gradient(180deg, rgba(20,24,44,0.92), rgba(10,12,22,0.92))",
                border: "1px solid rgba(255,255,255,0.14)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--muted)" }}>
                <span>Portfolio value</span>
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>+12.4%</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", margin: "6px 0 10px" }}>
                $<span ref={ref}>{value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <svg viewBox="0 0 240 70" width="100%" height="70" aria-hidden="true">
                <defs>
                    <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#5b73ff" />
                        <stop offset="1" stopColor="#f2c46d" />
                    </linearGradient>
                </defs>
                <polyline
                    points="0,58 28,50 52,54 80,38 108,42 136,26 164,30 192,14 240,8"
                    fill="none"
                    stroke="url(#spark)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

export function Hero() {
    const mobile = useIsMobile();
    const { t } = useLang();

    return (
        <section style={{ ...wrap, paddingTop: mobile ? 40 : 80, paddingBottom: mobile ? 40 : 72 }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: mobile ? "1fr" : "1.1fr 0.9fr",
                    gap: mobile ? 48 : 40,
                    alignItems: "center",
                }}
            >
                <div>
                    <Reveal>
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                border: "1px solid var(--line)",
                                background: "rgba(255,255,255,0.04)",
                                borderRadius: 999,
                                padding: "6px 14px",
                                fontSize: 13,
                                fontWeight: 600,
                                marginBottom: 24,
                            }}
                        >
                            <i style={{ width: 8, height: 8, borderRadius: 99, background: "var(--gold)", animation: "glow 2s ease-in-out infinite" }} />
                            {t("hero_tag")}
                        </span>
                    </Reveal>

                    <Reveal delay={80}>
                        <h1
                            style={{
                                fontSize: "clamp(38px, 6.4vw, 70px)",
                                lineHeight: 1.04,
                                letterSpacing: "-0.04em",
                                fontWeight: 800,
                                margin: "0 0 20px",
                            }}
                        >
                            {t("hero_t1")}
                            <br />
                            <span style={gradientText}>{t("hero_t2")}</span> {t("hero_t3")}
                        </h1>
                    </Reveal>

                    <Reveal delay={160}>
                        <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 520, margin: "0 0 32px" }}>{t("hero_sub")}</p>
                    </Reveal>

                    <Reveal delay={240}>
                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <Btn href="/register" variant="solid" size="lg">{t("hero_cta1")}</Btn>
                            <Btn href="#plans" size="lg">{t("hero_cta2")}</Btn>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={200}>
                    <div style={{ position: "relative", display: "grid", placeItems: "center", minHeight: mobile ? 340 : 440 }}>
                        <div
                            style={{
                                position: "absolute",
                                inset: "5% 0",
                                background: "radial-gradient(closest-side, rgba(59,91,255,0.5), transparent 70%)",
                                filter: "blur(30px)",
                                animation: "glow 5s ease-in-out infinite",
                            }}
                        />
                        <div style={{ position: "relative", animation: "float 6s ease-in-out infinite", width: "100%" }}>
                            <PixelGrid map={CASTLE} maxWidth={mobile ? 250 : 340} label="Pixel castle" />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                bottom: mobile ? -10 : 0,
                                left: mobile ? 0 : -20,
                                animation: "float 7s ease-in-out 1s infinite",
                            }}
                        >
                            <PortfolioCard />
                        </div>
                    </div>
                </Reveal>
            </div>

            <Reveal delay={300}>
                <div
                    style={{
                        ...card,
                        marginTop: mobile ? 56 : 80,
                        padding: mobile ? 22 : "30px 36px",
                        display: "grid",
                        gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
                        gap: mobile ? 24 : 32,
                    }}
                >
                    {STATS.map((s) => (
                        <Stat key={s.label} {...s} />
                    ))}
                </div>
            </Reveal>

            <Reveal delay={360}>
                <div style={{ marginTop: 40, textAlign: "center" }}>
                    <span style={{ ...eyebrow, marginBottom: 18 }}>Trusted by investors in</span>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                        {COUNTRIES.map((c) => (
                            <span
                                key={c}
                                style={{
                                    border: "1px solid var(--line)",
                                    background: "rgba(255,255,255,0.03)",
                                    borderRadius: 999,
                                    padding: "7px 16px",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "var(--muted)",
                                }}
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}