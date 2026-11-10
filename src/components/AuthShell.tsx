import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { card } from "../ui";

interface Props {
    title: string;
    subtitle: string;
    children: ReactNode;
    wide?: boolean;
}

export function AuthShell({ title, subtitle, children, wide }: Props) {
    return (
        <main style={{ position: "relative", padding: "48px 20px 80px", display: "grid", placeItems: "center" }}>
            <div
                style={{
                    position: "absolute",
                    top: 30,
                    width: 520,
                    height: 360,
                    maxWidth: "100%",
                    background: "radial-gradient(closest-side, rgba(59,91,255,0.4), transparent 70%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                }}
            />
            <div style={{ ...card, position: "relative", width: "100%", maxWidth: wide ? 580 : 440, padding: "32px 30px" }}>
                <Link to="/" aria-label="BitKastl home" style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
                    <Logo size={40} />
                </Link>
                <h1 style={{ margin: "0 0 6px", fontSize: 28, letterSpacing: "-0.03em", fontWeight: 800, textAlign: "center" }}>{title}</h1>
                <p style={{ margin: "0 0 26px", color: "var(--muted)", textAlign: "center" }}>{subtitle}</p>
                {children}
            </div>
        </main>
    );
}