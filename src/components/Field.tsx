import { useState, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function Field({ label, error, ...rest }: Props) {
    const [focus, setFocus] = useState(false);

    return (
        <label style={{ display: "block" }}>
            <span style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{label}</span>
            <input
                {...rest}
                onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
                onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
                style={{
                    width: "100%",
                    padding: "13px 14px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--ink)",
                    outline: "none",
                    border: error
                        ? "1px solid #f87171"
                        : focus
                            ? "1px solid rgba(120,140,255,0.8)"
                            : "1px solid var(--line)",
                    boxShadow: focus ? "0 0 0 4px rgba(59,91,255,0.18)" : "none",
                    transition: "border 0.2s, box-shadow 0.2s",
                }}
            />
            {error && <span style={{ display: "block", color: "#f87171", fontSize: 12, marginTop: 6 }}>{error}</span>}
        </label>
    );
}