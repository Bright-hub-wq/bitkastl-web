import { useState } from "react";
import { Logo } from "./Logo";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import { SITE } from "../config/site";
import { michroma, wrap } from "../ui";

function FooterLink({ href, label }: { href: string; label: string }) {
    const [hover, setHover] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: "block",
                marginBottom: 10,
                color: hover ? "var(--gold)" : "var(--muted)",
                transform: hover ? "translateX(3px)" : "none",
                transition: "color 0.2s, transform 0.2s",
            }}
        >
            {label}
        </a>
    );
}

export function Footer() {
    const mobile = useIsMobile();
    const { t } = useLang();

    const cols: { title: string; links: [string, string][] }[] = [
        { title: t("foot_product"), links: [["#features", t("nav_features")], ["#plans", t("nav_plans")], ["#how", t("nav_how")]] },
        { title: t("foot_support"), links: [["#faq", t("nav_faq")], ["#security", "Security"], [`mailto:${SITE.contactEmail}`, t("foot_contact")]] },
        { title: t("foot_legal"), links: [["/terms", t("foot_terms")], ["/privacy", t("foot_privacy")]] },
    ];

    return (
        <footer
            style={{
                position: "relative",
                marginTop: 40,
                padding: "56px 0 36px",
                background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.025))",
                color: "var(--muted)",
                fontSize: 14,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(120,140,255,0.55), rgba(242,196,109,0.45), transparent)",
                }}
            />

            <div
                style={{
                    ...wrap,
                    display: "grid",
                    gridTemplateColumns: mobile ? "1fr 1fr" : "1.6fr 1fr 1fr 1fr",
                    gap: mobile ? 32 : 40,
                }}
            >
                <div style={{ gridColumn: mobile ? "1 / -1" : "auto" }}>
                    <Logo size={28} />
                    <p style={{ margin: "14px 0 0", maxWidth: 300 }}>{t("foot_tag")}</p>
                </div>

                {cols.map((c) => (
                    <div key={c.title}>
                        <h4
                            style={{
                                margin: "0 0 16px",
                                fontFamily: michroma,
                                fontSize: 11,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "var(--ink)",
                                fontWeight: 400,
                            }}
                        >
                            {c.title}
                        </h4>
                        {c.links.map(([href, label]) => (
                            <FooterLink key={href} href={href} label={label} />
                        ))}
                    </div>
                ))}
            </div>

            <div
                style={{
                    ...wrap,
                    marginTop: 40,
                    paddingTop: 22,
                    borderTop: "1px solid var(--soft)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    fontSize: 13,
                }}
            >
                <span>
                    © {new Date().getFullYear()} BitKastl. {t("foot_rights")}
                </span>
            </div>
        </footer>
    );
}