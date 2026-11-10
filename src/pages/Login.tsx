import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "../components/AuthShell";
import { Field } from "../components/Field";
import { Btn } from "../components/Btn";
import { useLang } from "../i18n/context";

export function Login() {
    const { t } = useLang();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!email.trim() || !password) {
            setError(t("login_err"));
            return;
        }
        setError("");
        // TODO: call the .NET login endpoint here
    }

    return (
        <AuthShell title={t("login_title")} subtitle={t("login_sub")}>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
                <Field label={t("email")} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                <Field label={t("password")} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("password_ph")} />

                <div style={{ textAlign: "end", fontSize: 13 }}>
                    <Link to="/forgot-password" style={{ color: "var(--gold)" }}>{t("forgot")}</Link>
                </div>

                {error && <div style={{ color: "#f87171", fontSize: 13 }}>{error}</div>}

                <button type="submit" style={{ all: "unset" }}>
                    <Btn variant="solid" size="lg" style={{ width: "100%", pointerEvents: "none" }}>{t("login_btn")}</Btn>
                </button>

                <p style={{ margin: 0, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
                    {t("new_here")} <Link to="/register" style={{ color: "var(--gold)", fontWeight: 600 }}>{t("create_account")}</Link>
                </p>
                <p style={{ margin: 0, textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
                    {t("login_terms")} <Link to="/terms" style={{ textDecoration: "underline" }}>{t("terms_short")}</Link> {t("and")}{" "}
                    <Link to="/privacy" style={{ textDecoration: "underline" }}>{t("privacy_short")}</Link>.
                </p>
            </form>
        </AuthShell>
    );
}