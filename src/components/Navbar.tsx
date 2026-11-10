import { useState, type CSSProperties } from "react";
import { Logo } from "./Logo";
import { Btn } from "./Btn";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import { LANGS, type Lang } from "../i18n/translation";
import { wrap } from "../ui";

const selectStyle: CSSProperties = {
    border: "1px solid var(--line)",
    background: "rgba(255,255,255,0.05)",
    color: "var(--ink)",
    padding: "9px 12px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    outline: "none",
};

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
    const [hover, setHover] = useState(false);
    return (
        <a
            href={href}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                position: "relative",
                fontSize: 15,
                fontWeight: 500,
                color: hover ? "var(--ink)" : "var(--muted)",
                transition: "color 0.2s",
            }}
        >
            {label}
            <span
                style={{
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    height: 2,
                    width: hover ? "100%" : 0,
                    background: "linear-gradient(90deg, var(--blue), var(--gold))",
                    transition: "width 0.25s",
                }}
            />
        </a>
    );
}

export function Navbar() {
    const mobile = useIsMobile();
    const { t, lang, setLang } = useLang();
    const [open, setOpen] = useState(false);

    const links: [string, string][] = [
        ["#features", t("nav_features")],
        ["#how", t("nav_how")],
        ["#plans", t("nav_plans")],
        ["#faq", t("nav_faq")],
    ];

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "rgba(6,7,13,0.72)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                borderBottom: "1px solid var(--line)",
            }}
        >
            <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
                <a href="/" aria-label="BitKastl home">
                    <Logo size={mobile ? 28 : 32} />
                </a>

                {!mobile && (
                    <nav style={{ display: "flex", gap: 36 }}>
                        {links.map(([href, label]) => (
                            <NavLink key={href} href={href} label={label} />
                        ))}
                    </nav>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang)} style={selectStyle}>
                        {LANGS.map((l) => (
                            <option key={l.code} value={l.code} style={{ background: "#0d0f1a", color: "#eef0f8" }}>
                                {l.label}
                            </option>
                        ))}
                    </select>

                    {!mobile ? (
                        <>
                            <Btn href="/login">{t("nav_login")}</Btn>
                            <Btn href="/register" variant="solid">{t("nav_start")}</Btn>
                        </>
                    ) : (
                        <button
                            aria-label="Menu"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--line)",
                                borderRadius: 10,
                                padding: "9px 10px",
                                cursor: "pointer",
                            }}
                        >
                            {[0, 1, 2].map((i) => (
                                <span key={i} style={{ display: "block", width: 18, height: 2, background: "var(--ink)", margin: "4px 0", borderRadius: 2 }} />
                            ))}
                        </button>
                    )}
                </div>
            </div>

            {mobile && open && (
                <div style={{ borderTop: "1px solid var(--line)", padding: "8px 20px 22px" }}>
                    {links.map(([href, label]) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            style={{ display: "block", padding: "15px 0", borderBottom: "1px solid var(--soft)", fontWeight: 600 }}
                        >
                            {label}
                        </a>
                    ))}
                    <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                        <Btn href="/login" style={{ flex: 1 }}>{t("nav_login")}</Btn>
                        <Btn href="/register" variant="solid" style={{ flex: 1 }}>{t("nav_start")}</Btn>
                    </div>
                </div>
            )}
        </header>
    );
}