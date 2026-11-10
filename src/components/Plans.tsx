import { useState } from "react";
import { Btn } from "./Btn";
import { Reveal } from "./Reveal";
import { Slider } from "./Slider";
import { useIsMobile, useIsTablet } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import { PLANS, type Plan } from "../config/site";
import { card, gradientText, h2, michroma, pad, sub, wrap } from "../ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function Check() {
    return (
        <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" style={{ flex: "none", marginTop: 3 }}>
            <circle cx="9" cy="9" r="9" fill="rgba(242,196,109,0.16)" />
            <path d="M5 9.2l2.6 2.6L13 6.4" fill="none" stroke="#f2c46d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function Cell({ label, value, first, gold }: { label: string; value: string; first?: boolean; gold?: boolean }) {
    return (
        <div style={{ flex: 1, padding: "10px 12px", borderLeft: first ? "none" : "1px solid var(--soft)" }}>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: gold ? "var(--gold)" : "var(--ink)" }}>{value}</div>
        </div>
    );
}

function PlanCard({ plan, featured }: { plan: Plan; featured: boolean }) {
    const { t } = useLang();
    const [hover, setHover] = useState(false);
    const perks = [t("plan_perk1"), t("plan_perk2"), t("plan_perk3"), t("plan_perk4")];
    const showBox = plan.returnRate || plan.duration;

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                ...card,
                height: "100%",
                position: "relative",
                overflow: "hidden",
                padding: 22,
                display: "flex",
                flexDirection: "column",
                background: featured
                    ? "linear-gradient(165deg, rgba(59,91,255,0.38), rgba(13,15,26,0.95) 60%)"
                    : card.background,
                border: featured ? "1px solid rgba(120,140,255,0.5)" : card.border,
                boxShadow:
                    hover || featured
                        ? "0 28px 70px -22px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.14)"
                        : card.boxShadow,
                transform: hover ? "translateY(-6px)" : "none",
                transition: "transform 0.2s, box-shadow 0.25s",
            }}
        >
            {featured && (
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        right: -38,
                        width: 150,
                        padding: "5px 0",
                        textAlign: "center",
                        transform: "rotate(45deg)",
                        background: "linear-gradient(90deg, #f2c46d, #e5a93d)",
                        color: "#1a1204",
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 14px -2px rgba(242,196,109,0.5)",
                    }}
                >
                    Most popular
                </div>
            )}

            <span style={{ fontFamily: michroma, color: "var(--gold)", fontSize: 12, letterSpacing: "0.14em" }}>
                {plan.name.toUpperCase()}
            </span>

            <div style={{ margin: "16px 0 16px" }}>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{t("plans_from")}</div>
                <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                    <span style={gradientText}>{money(plan.min)}</span>
                </div>
            </div>

            {showBox && (
                <div
                    style={{
                        display: "flex",
                        border: "1px solid var(--line)",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.03)",
                    }}
                >
                    {plan.returnRate && <Cell first gold label={t("plans_return")} value={plan.returnRate} />}
                    {plan.duration && <Cell first={!plan.returnRate} label={t("plans_duration")} value={plan.duration} />}
                </div>
            )}

            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 18px", flex: 1 }}>
                {perks.map((p) => (
                    <li key={p} style={{ display: "flex", gap: 10, padding: "4px 0", fontSize: 13.5 }}>
                        <Check />
                        {p}
                    </li>
                ))}
            </ul>

            <Btn href={`/register?plan=${plan.id}`} variant={featured ? "solid" : "ghost"} style={{ width: "100%" }}>
                {t("plans_choose")}
            </Btn>
        </div>
    );
}

export function Plans() {
    const mobile = useIsMobile();
    const tablet = useIsTablet();
    const { t } = useLang();

    return (
        <section id="plans" style={{ ...wrap, ...pad(mobile) }}>
            <Reveal>
                <h2 style={h2}>{t("plans_title")}</h2>
                <p style={sub}>{t("plans_sub")}</p>
            </Reveal>

            {mobile ? (
                <Slider cardWidth={290}>
                    {PLANS.map((p, i) => (
                        <PlanCard key={p.id} plan={p} featured={i === 1} />
                    ))}
                </Slider>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: tablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                        gap: 22,
                    }}
                >
                    {PLANS.map((p, i) => (
                        <Reveal key={p.id} delay={i * 100} style={{ height: "100%" }}>
                            <PlanCard plan={p} featured={i === 1} />
                        </Reveal>
                    ))}
                </div>
            )}
        </section>
    );
}