import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthShell } from "../components/AuthShell";
import { Field } from "../components/Field";
import { SelectField } from "../components/SelectField";
import { Btn } from "../components/Btn";
import { useIsMobile } from "../hooks/useMedia";
import { useLang } from "../i18n/context";
import { PLANS } from "../config/site";

// [ISO country code, dial code]
const COUNTRIES: [string, string][] = [
    ["NG", "+234"], ["GH", "+233"], ["KE", "+254"], ["ZA", "+27"], ["UG", "+256"],
    ["TZ", "+255"], ["CM", "+237"], ["SN", "+221"], ["CI", "+225"], ["EG", "+20"],
    ["MA", "+212"], ["ET", "+251"], ["RW", "+250"], ["GB", "+44"], ["IE", "+353"],
    ["FR", "+33"], ["DE", "+49"], ["ES", "+34"], ["IT", "+39"], ["PT", "+351"],
    ["NL", "+31"], ["BE", "+32"], ["CH", "+41"], ["SE", "+46"], ["NO", "+47"],
    ["PL", "+48"], ["RU", "+7"], ["US", "+1"], ["CA", "+1"], ["MX", "+52"],
    ["BR", "+55"], ["AR", "+54"], ["CO", "+57"], ["CL", "+56"], ["PE", "+51"],
    ["AE", "+971"], ["SA", "+966"], ["QA", "+974"], ["TR", "+90"], ["IN", "+91"],
    ["PK", "+92"], ["BD", "+880"], ["CN", "+86"], ["JP", "+81"], ["KR", "+82"],
    ["SG", "+65"], ["MY", "+60"], ["ID", "+62"], ["PH", "+63"], ["VN", "+84"],
    ["AU", "+61"], ["NZ", "+64"],
];

function ageOf(dob: string) {
    const d = new Date(dob);
    if (isNaN(d.getTime())) return -1;
    const n = new Date();
    let years = n.getFullYear() - d.getFullYear();
    const m = n.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && n.getDate() < d.getDate())) years--;
    return years;
}

export function Register() {
    const { t, lang } = useLang();
    const mobile = useIsMobile();
    const [params] = useSearchParams();
    const plan = PLANS.find((p) => p.id === params.get("plan"));

    const [f, setF] = useState({
        first: "", last: "", email: "", country: "", phone: "",
        dob: "", password: "", confirm: "", referral: params.get("ref") ?? "",
    });
    const [agree, setAgree] = useState(false);
    const [risk, setRisk] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Country names in the visitor's language, sorted alphabetically for that language
    const countries = useMemo(() => {
        let names: Intl.DisplayNames | null = null;
        try {
            names = new Intl.DisplayNames([lang], { type: "region" });
        } catch {
            names = null;
        }
        return COUNTRIES.map(([code, dial]) => ({ code, dial, name: names?.of(code) ?? code })).sort((x, y) =>
            x.name.localeCompare(y.name, lang)
        );
    }, [lang]);

    const set = (k: keyof typeof f) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setF({ ...f, [k]: e.target.value });

    const dial = countries.find((c) => c.code === f.country)?.dial;
    const today = new Date().toISOString().split("T")[0];
    const two = { display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 } as const;

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        const next: Record<string, string> = {};
        if (!f.first.trim()) next.first = t("e_first");
        if (!f.last.trim()) next.last = t("e_last");
        if (!/^\S+@\S+\.\S+$/.test(f.email)) next.email = t("e_email");
        if (!f.country) next.country = t("e_country");
        if (!/^\d{6,14}$/.test(f.phone.replace(/[\s-]/g, ""))) next.phone = t("e_phone");
        if (!f.dob) next.dob = t("e_dob");
        else if (ageOf(f.dob) < 18) next.dob = t("e_age");
        if (f.password.length < 8) next.password = t("e_pass");
        if (f.confirm !== f.password) next.confirm = t("e_confirm");
        if (!risk) next.risk = t("e_risk");
        if (!agree) next.agree = t("e_agree");
        setErrors(next);
        if (Object.keys(next).length) return;
        // TODO: call the .NET register endpoint here
        // send: first, last, email, country (ISO code), dial + phone, dob, password, referral, plan?.id
    }

    const check = (checked: boolean, onChange: (v: boolean) => void, error: string | undefined, content: ReactNode) => (
        <div>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, cursor: "pointer" }}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    style={{ marginTop: 3, width: 16, height: 16, accentColor: "#3b5bff" }}
                />
                <span style={{ color: "var(--muted)" }}>{content}</span>
            </label>
            {error && <div style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{error}</div>}
        </div>
    );

    return (
        <AuthShell wide title={t("reg_title")} subtitle={t("reg_sub")}>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
                {plan && (
                    <div
                        style={{
                            padding: "10px 14px",
                            borderRadius: 12,
                            border: "1px solid rgba(242,196,109,0.35)",
                            background: "rgba(242,196,109,0.08)",
                            fontSize: 14,
                        }}
                    >
                        {t("selected_plan")}: <b style={{ color: "var(--gold)" }}>{plan.name}</b>
                    </div>
                )}

                <div style={two}>
                    <Field label={t("first_name")} autoComplete="given-name" value={f.first} onChange={set("first")} error={errors.first} />
                    <Field label={t("last_name")} autoComplete="family-name" value={f.last} onChange={set("last")} error={errors.last} />
                </div>

                <Field label={t("email")} type="email" autoComplete="email" value={f.email} onChange={set("email")} error={errors.email} />

                <div style={two}>
                    <SelectField label={t("country")} value={f.country} onChange={set("country")} error={errors.country}>
                        <option value="" style={{ background: "#0d0f1a" }}>{t("select_country")}</option>
                        {countries.map((c) => (
                            <option key={c.code} value={c.code} style={{ background: "#0d0f1a" }}>{c.name}</option>
                        ))}
                    </SelectField>
                    <Field
                        label={dial ? `${t("phone")} (${dial})` : t("phone")}
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="tel"
                        value={f.phone}
                        onChange={set("phone")}
                        error={errors.phone}
                    />
                </div>

                <div style={two}>
                    <Field label={t("dob")} type="date" max={today} autoComplete="bday" value={f.dob} onChange={set("dob")} error={errors.dob} />
                    <Field label={`${t("referral")} (${t("optional")})`} value={f.referral} onChange={set("referral")} />
                </div>

                <div style={two}>
                    <Field label={t("password")} type="password" autoComplete="new-password" value={f.password} onChange={set("password")} error={errors.password} />
                    <Field label={t("confirm")} type="password" autoComplete="new-password" value={f.confirm} onChange={set("confirm")} error={errors.confirm} />
                </div>

                {check(risk, setRisk, errors.risk, t("risk_ack"))}
                {check(
                    agree,
                    setAgree,
                    errors.agree,
                    <>
                        {t("agree_a")} <Link to="/terms" target="_blank" style={{ color: "var(--gold)" }}>{t("terms_full")}</Link> {t("agree_b")}{" "}
                        <Link to="/privacy" target="_blank" style={{ color: "var(--gold)" }}>{t("privacy_full")}</Link>.
                    </>
                )}

                <button type="submit" style={{ all: "unset" }}>
                    <Btn variant="solid" size="lg" style={{ width: "100%", pointerEvents: "none" }}>{t("reg_btn")}</Btn>
                </button>

                <p style={{ margin: 0, textAlign: "center", fontSize: 14, color: "var(--muted)" }}>
                    {t("have_account")} <Link to="/login" style={{ color: "var(--gold)", fontWeight: 600 }}>{t("login_link")}</Link>
                </p>
            </form>
        </AuthShell>
    );
}