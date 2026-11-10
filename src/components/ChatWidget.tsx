import { useEffect, useRef, useState, type FormEvent } from "react";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import type { Key } from "../i18n/translation";

type Msg = { from: "me"; text: string } | { from: "bot" };

function QuickBtn({ label, onClick }: { label: string; onClick: () => void }) {
    const [hover, setHover] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                alignSelf: "flex-start",
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                borderRadius: 999,
                background: hover ? "rgba(59,91,255,0.18)" : "rgba(255,255,255,0.04)",
                color: "var(--ink)",
                border: hover ? "1px solid rgba(120,140,255,0.6)" : "1px solid var(--line)",
                transition: "background 0.2s, border 0.2s",
            }}
        >
            {label}
        </button>
    );
}

export function ChatWidget() {
    const { t } = useLang();
    const mobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [hint, setHint] = useState(false);
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [text, setText] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const openChat = () => setOpen(true);
        window.addEventListener("bk-open-chat", openChat);
        return () => window.removeEventListener("bk-open-chat", openChat);
    }, []);

    useEffect(() => {
        const el = listRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [msgs, open]);

    useEffect(() => {
        const id = setTimeout(() => setHint(true), 4000);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (open) setHint(false);
    }, [open]);

    function send(value: string) {
        const clean = value.trim();
        if (!clean) return;
        setMsgs((m) => [...m, { from: "me", text: clean }]);
        setText("");
        // TODO: replace this with a real call to the backend (for example SignalR in .NET)
        setTimeout(() => setMsgs((m) => [...m, { from: "bot" }]), 700);
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        send(text);
    }

    const quick: Key[] = ["chat_q1", "chat_q2", "chat_q3"];

    const bubble = (mine: boolean) => ({
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "85%",
        padding: "10px 14px",
        fontSize: 14,
        lineHeight: 1.5,
        borderRadius: mine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        background: mine ? "linear-gradient(135deg, #5b73ff, #3b5bff)" : "rgba(255,255,255,0.06)",
        color: mine ? "#fff" : "var(--ink)",
        border: mine ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--line)",
    } as const);

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    right: 16,
                    bottom: "calc(90px + env(safe-area-inset-bottom, 0px))",
                    width: "min(360px, calc(100vw - 32px))",
                    height: "min(480px, calc(100vh - 130px))",
                    zIndex: 60,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    borderRadius: 22,
                    background: "rgba(10,12,22,0.94)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(120,140,255,0.3)",
                    boxShadow: "0 30px 80px -20px rgba(0,0,0,0.9), 0 0 60px -24px var(--blue-glow)",
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(16px) scale(0.98)",
                    pointerEvents: open ? "auto" : "none",
                    transition: "opacity 0.2s, transform 0.2s",
                }}
            >
                <div
                    style={{
                        padding: "16px 18px",
                        background: "linear-gradient(135deg, rgba(59,91,255,0.55), rgba(20,24,44,0.9))",
                        borderBottom: "1px solid var(--line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{t("chat_title")}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                        <i
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 99,
                                background: "#34d399",
                                boxShadow: "0 0 10px #34d399",
                                animation: "glow 2s ease-in-out infinite",
                            }}
                        />
                        Online
                    </span>
                </div>

                <div
                    ref={listRef}
                    style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}
                >
                    <div style={bubble(false)}>{t("chat_hello")}</div>

                    {msgs.length === 0 && quick.map((k) => <QuickBtn key={k} label={t(k)} onClick={() => send(t(k))} />)}

                    {msgs.map((m, i) =>
                        m.from === "me" ? (
                            <div key={i} style={bubble(true)}>{m.text}</div>
                        ) : (
                            <div key={i} style={bubble(false)}>{t("chat_auto")}</div>
                        )
                    )}
                </div>

                <form
                    onSubmit={onSubmit}
                    style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--line)", background: "rgba(255,255,255,0.02)" }}
                >
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={t("chat_ph")}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            padding: "11px 14px",
                            borderRadius: 12,
                            border: "1px solid var(--line)",
                            background: "rgba(255,255,255,0.05)",
                            color: "var(--ink)",
                            outline: "none",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "0 18px",
                            borderRadius: 12,
                            background: "linear-gradient(135deg, #5b73ff, #3b5bff)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.18)",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        {t("chat_send")}
                    </button>
                </form>
            </div>

            {hint && !open && (
                <div
                    style={{
                        position: "fixed",
                        right: 16,
                        bottom: "calc(84px + env(safe-area-inset-bottom, 0px))",
                        zIndex: 60,
                        maxWidth: 230,
                        padding: "12px 34px 12px 14px",
                        borderRadius: "16px 16px 4px 16px",
                        background: "rgba(13,15,26,0.96)",
                        border: "1px solid rgba(120,140,255,0.35)",
                        boxShadow: "0 20px 50px -16px rgba(0,0,0,0.9), 0 0 40px -18px var(--blue-glow)",
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: 1.4,
                    }}
                >
                    Welcome to BitKastl 👋 Let's chat!
                    <button
                        aria-label="Dismiss"
                        onClick={() => setHint(false)}
                        style={{
                            position: "absolute",
                            top: 6,
                            right: 8,
                            background: "none",
                            border: 0,
                            color: "var(--muted)",
                            fontSize: 16,
                            cursor: "pointer",
                        }}
                    >
                        ×
                    </button>
                </div>
            )}

            <button
                aria-label="Chat support"
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    right: 16,
                    bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
                    zIndex: 60,
                    height: 56,
                    minWidth: 56,
                    padding: open || mobile ? 0 : "0 22px 0 18px",
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "linear-gradient(135deg, #5b73ff, #3b5bff 55%, #2a3fd6)",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow: "0 12px 36px -6px var(--blue-glow), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
            >
                {open ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <>
                        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H11l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="1.8"
                                strokeLinejoin="round"
                            />
                            <circle cx="8" cy="11" r="1.2" fill="#fff" />
                            <circle cx="12" cy="11" r="1.2" fill="#fff" />
                            <circle cx="16" cy="11" r="1.2" fill="#fff" />
                        </svg>
                        {!mobile && "Chat support"}
                    </>
                )}
            </button>
        </>
    );
}