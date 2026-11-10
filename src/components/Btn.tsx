import { useState, type CSSProperties, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "solid" | "ghost" | "inverse";
    size?: "sm" | "md" | "lg";
    style?: CSSProperties;
    ariaLabel?: string;
}

export function Btn({ children, href, onClick, variant = "ghost", size = "md", style, ariaLabel }: Props) {
    const [hover, setHover] = useState(false);

    const look: CSSProperties =
        variant === "solid"
            ? {
                background: "linear-gradient(135deg, #5b73ff, #3b5bff 55%, #2a3fd6)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: hover
                    ? "0 12px 40px -6px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.3)"
                    : "0 8px 28px -8px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.25)",
            }
            : variant === "inverse"
                ? {
                    background: "#fff",
                    color: "#06070d",
                    border: "1px solid #fff",
                    boxShadow: hover ? "0 12px 36px -8px rgba(255,255,255,0.45)" : "0 6px 20px -8px rgba(255,255,255,0.3)",
                }
                : {
                    background: hover ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                    boxShadow: "none",
                };

    const s: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: size === "lg" ? "15px 28px" : size === "sm" ? "7px 14px" : "11px 20px",
        fontSize: size === "lg" ? 16 : 15,
        fontWeight: 600,
        borderRadius: 12,
        cursor: "pointer",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "transform 0.15s, box-shadow 0.2s, background 0.2s",
        ...look,
        ...style,
    };

    const events = {
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
    };

    if (href) {
        return <a href={href} style={s} aria-label={ariaLabel} {...events}>{children}</a>;
    }
    return <button type="button" onClick={onClick} style={s} aria-label={ariaLabel} {...events}>{children}</button>;
}