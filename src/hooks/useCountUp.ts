import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1800) {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf = 0;

        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            obs.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
                const p = Math.min((now - start) / duration, 1);
                setValue(target * (1 - Math.pow(1 - p, 3)));
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        });

        obs.observe(el);
        return () => {
            obs.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [target, duration]);

    return { ref, value };
}