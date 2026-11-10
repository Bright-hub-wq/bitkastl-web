import type { CSSProperties } from "react";

export const michroma = "Michroma, system-ui, sans-serif";

export const wrap: CSSProperties = {
    maxWidth: 1180,
    width: "100%",
    margin: "0 auto",
    paddingLeft: 20,
    paddingRight: 20,
};

export const pad = (mobile: boolean): CSSProperties => ({
    paddingTop: mobile ? 56 : 96,
    paddingBottom: mobile ? 56 : 96,
});

export const h2: CSSProperties = {
    fontSize: "clamp(28px, 4.2vw, 44px)",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    fontWeight: 800,
    margin: "0 0 14px",
};

export const sub: CSSProperties = {
    color: "var(--muted)",
    fontSize: 17,
    margin: "0 0 40px",
    maxWidth: 560,
};

export const card: CSSProperties = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
    border: "1px solid var(--line)",
    borderRadius: 20,
    padding: 28,
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 50px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
};

export const gradientText: CSSProperties = {
    background: "linear-gradient(90deg, #8fa2ff, #f2c46d)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
};

export const eyebrow: CSSProperties = {
    fontFamily: michroma,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: 14,
    display: "block",
};