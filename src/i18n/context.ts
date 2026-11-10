import { createContext, useContext } from "react";
import { translations, type Key, type Lang } from "./translation";

export interface LangCtx {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (k: Key) => string;
}

export const LangContext = createContext<LangCtx>({
    lang: "en",
    setLang: () => {},
    t: (k) => translations.en[k],
});

export const useLang = () => useContext(LangContext);