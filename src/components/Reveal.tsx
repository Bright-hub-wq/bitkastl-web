import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    delay?: number;
    y?: number;
    style?: CSSProperties;
}

export function Reveal({ children, delay = 0, y = 28, style }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    useEffect(() => {
        const el = ref.current;
        if (!el || shown) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [shown]);

    return (
        <div
            ref={ref}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : `translateY(${y}px)`,
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
                ...style,
            }}
        >
            {children}
        </div>
    );
}