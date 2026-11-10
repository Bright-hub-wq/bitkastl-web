import type { ReactNode } from "react";
import { card, wrap } from "../ui";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
    return (
        <main style={{ ...wrap, padding: "56px 20px 80px" }}>
            <div style={{ ...card, maxWidth: 820, margin: "0 auto", padding: "36px 32px" }}>
                <h1 style={{ margin: "0 0 6px", fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "-0.03em", fontWeight: 800 }}>{title}</h1>
                <p style={{ margin: "0 0 28px", color: "var(--muted)", fontSize: 14 }}>{updated}</p>
                <div style={{ display: "grid", gap: 22, lineHeight: 1.7 }}>{children}</div>
            </div>
        </main>
    );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section>
            <h2 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 700, color: "var(--gold)" }}>{title}</h2>
            <div style={{ color: "var(--muted)" }}>{children}</div>
        </section>
    );
}