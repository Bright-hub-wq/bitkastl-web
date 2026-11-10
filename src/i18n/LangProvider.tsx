import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LangContext } from "./context";
import { LANGS, RTL, translations, type Key, type Lang } from "./translation";

const STORAGE = "bk-lang";

const FONTS: Partial<Record<Lang, { family: string; href: string }>> = {
    zh: { family: '"Noto Sans SC"', href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" },
    ja: { family: '"Noto Sans JP"', href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" },
    ko: { family: '"Noto Sans KR"', href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" },
    hi: { family: '"Noto Sans Devanagari"', href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&display=swap" },
    bn: { family: '"Noto Sans Bengali"', href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;700&display=swap" },
    ar: { family: '"Noto Sans Arabic"', href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;700&display=swap" },
    ur: { family: '"Noto Nastaliq Urdu"', href: "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;700&display=swap" },
};

function initialLang(): Lang {
    try {
        const saved = localStorage.getItem(STORAGE);
        const found = LANGS.find((l) => l.code === saved);
        if (found) return found.code;
    } catch {
        // storage can be blocked, so we just continue
    }
    const browser = navigator.language.slice(0, 2).toLowerCase();
    return LANGS.find((l) => l.code === browser)?.code ?? "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(initialLang);

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = RTL.includes(lang) ? "rtl" : "ltr";

        const font = FONTS[lang];
        if (font) {
            const id = `bk-font-${lang}`;
            if (!document.getElementById(id)) {
                const link = document.createElement("link");
                link.id = id;
                link.rel = "stylesheet";
                link.href = font.href;
                document.head.appendChild(link);
            }
            document.body.style.lineHeight = lang === "ur" ? "2.1" : "";
            document.body.style.fontFamily = `Inter, ${font.family}, system-ui, sans-serif`;
        } else {
            document.body.style.fontFamily = "";
        }
    }, [lang]);

    const value = useMemo(
        () => ({
            lang,
            setLang: (l: Lang) => {
                setLangState(l);
                try {
                    localStorage.setItem(STORAGE, l);
                } catch {
                    // ignore
                }
            },
            t: (k: Key) => translations[lang]?.[k] ?? translations.en[k],
        }),
        [lang]
    );

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}