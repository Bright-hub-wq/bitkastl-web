import { PixelGrid } from "./PixelGrid";
import { Btn } from "./Btn";
import { Reveal } from "./Reveal";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import { michroma, wrap } from "../ui";

const SHIELD = ["#####", "#####", "#####", ".###.", "..#.."];

const BADGES = ["256-bit encryption", "Two-factor login", "Cold storage", "24/7 monitoring"];

export function Security() {
    const mobile = useIsMobile();
    const { t } = useLang();

    return (
        <section
            id="security"
            style={{ ...wrap, paddingTop: mobile ? 32 : 48, paddingBottom: mobile ? 32 : 48 }}
        >
            <Reveal>
                <div
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        maxWidth: 940,
                        margin: "0 auto",
                        padding: mobile ? "28px 20px" : "32px 36px",
                        borderRadius: 22,
                        border: "1px solid rgba(120,140,255,0.3)",
                        background:
                            "radial-gradient(500px 200px at 50% 0%, rgba(59,91,255,0.3), transparent 70%), linear-gradient(180deg, rgba(20,24,44,0.95), rgba(8,9,18,0.95))",
                        boxShadow: "0 30px 70px -30px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: mobile ? "column" : "row",
                            alignItems: "center",
                            gap: mobile ? 18 : 28,
                            textAlign: mobile ? "center" : "left",
                        }}
                    >
                        <div
                            style={{
                                flex: "none",
                                width: 60,
                                padding: 12,
                                borderRadius: 16,
                                background: "rgba(242,196,109,0.1)",
                                border: "1px solid rgba(242,196,109,0.35)",
                                boxShadow: "0 0 30px -6px rgba(242,196,109,0.45)",
                            }}
                        >
                            <PixelGrid map={SHIELD} gap={2} maxWidth={36} fill="var(--gold)" animate={false} />
                        </div>

                        <div style={{ flex: 1 }}>
                            <h2
                                style={{
                                    fontSize: "clamp(20px, 2.6vw, 28px)",
                                    lineHeight: 1.2,
                                    letterSpacing: "-0.02em",
                                    fontWeight: 800,
                                    margin: "0 0 6px",
                                }}
                            >
                                {t("sec_title")}
                            </h2>
                            <p style={{ margin: 0, color: "var(--muted)", fontSize: 15, maxWidth: 520 }}>{t("sec_text")}</p>
                        </div>

                        <Btn href="/register" variant="inverse">{t("sec_cta")}</Btn>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: mobile ? "center" : "flex-start",
                            gap: 8,
                            marginTop: 24,
                            paddingTop: 20,
                            borderTop: "1px solid var(--soft)",
                        }}
                    >
                        {BADGES.map((b) => (
                            <span
                                key={b}
                                style={{
                                    fontFamily: michroma,
                                    fontSize: 9,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "var(--muted)",
                                    border: "1px solid var(--line)",
                                    background: "rgba(255,255,255,0.03)",
                                    borderRadius: 999,
                                    padding: "7px 12px",
                                }}
                            >
                                {b}
                            </span>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}