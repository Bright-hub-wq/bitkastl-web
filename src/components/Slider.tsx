import { Children, useEffect, useRef, useState, type ReactNode } from "react";

const GAP = 16;

interface Props {
    children: ReactNode;
    cardWidth?: number;
    interval?: number;
}

export function Slider({ children, cardWidth = 280, interval = 3500 }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const paused = useRef(false);
    const [active, setActive] = useState(0);
    const count = Children.count(children);
    const step = cardWidth + GAP;

    const goTo = (i: number) => ref.current?.scrollTo({ left: i * step, behavior: "smooth" });

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            if (!paused.current) goTo((active + 1) % count);
        }, interval);
        return () => clearInterval(id);
    }, [active, count, interval, step]);

    function onScroll() {
        const el = ref.current;
        if (!el) return;
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
        setActive(atEnd ? count - 1 : Math.round(el.scrollLeft / step));
    }

    const hold = () => { paused.current = true; };
    const release = () => { setTimeout(() => { paused.current = false; }, 2500); };

    return (
        <div>
            <div
                ref={ref}
                className="noscroll"
                onScroll={onScroll}
                onTouchStart={hold}
                onTouchEnd={release}
                onMouseEnter={hold}
                onMouseLeave={release}
                style={{
                    display: "flex",
                    gap: GAP,
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    padding: "20px 4px 16px",
                    scrollbarWidth: "none",
                }}
            >
                {Children.map(children, (c) => (
                    <div style={{ flex: `0 0 ${cardWidth}px`, scrollSnapAlign: "start" }}>{c}</div>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 4 }}>
                {Array.from({ length: count }).map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to plan ${i + 1}`}
                        onClick={() => goTo(i)}
                        style={{
                            width: i === active ? 26 : 8,
                            height: 8,
                            padding: 0,
                            border: 0,
                            borderRadius: 99,
                            cursor: "pointer",
                            background: i === active ? "var(--gold)" : "rgba(255,255,255,0.2)",
                            transition: "width 0.3s, background 0.3s",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}