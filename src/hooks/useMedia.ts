import { useEffect, useState } from "react";

export function useMedia(query: string) {
    const [match, setMatch] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const m = window.matchMedia(query);
        const handler = () => setMatch(m.matches);
        m.addEventListener("change", handler);
        return () => m.removeEventListener("change", handler);
    }, [query]);

    return match;
}

export const useIsMobile = () => useMedia("(max-width: 780px)");
export const useIsTablet = () => useMedia("(max-width: 1000px)");