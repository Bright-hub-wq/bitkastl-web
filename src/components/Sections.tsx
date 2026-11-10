import { Logo } from "./Logo";

const FEATURES = [
    { t: "Simple funding", d: "Deposit through trusted payment partners. Your balance updates only after payment is confirmed." },
    { t: "Every move recorded", d: "Deposits, investments and withdrawals are logged, so you always know where your money is." },
    { t: "Made for mobile", d: "Fast and clear on any phone or laptop, wherever you check in." },
];

const STEPS = [
    { t: "Create your account", d: "Sign up and verify your identity to keep the platform safe for everyone." },
    { t: "Fund your wallet", d: "Add money securely with your preferred payment method." },
    { t: "Start investing", d: "Choose an option, invest, and follow progress from your dashboard." },
];

export function Features() {
    return (
        <section id="features" className="wrap sec">
            <h2>Everything in one place</h2>
            <p className="sub">
                A clean dashboard that keeps your money movement visible and easy to understand.
            </p>
            <div className="grid">
                {FEATURES.map((f, i) => (
                    <article className="card" key={f.t}>
                        <span className="num">0{i + 1}</span>
                        <h3>{f.t}</h3>
                        <p>{f.d}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export function HowItWorks() {
    return (
        <section id="how" className="wrap sec">
            <h2>Three blocks to get started</h2>
            <div className="steps">
                {STEPS.map((s, i) => (
                    <div className="step" key={s.t}>
                        <span className="stepno">{i + 1}</span>
                        <div>
                            <h3>{s.t}</h3>
                            <p>{s.d}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function Security() {
    return (
        <section id="security" className="wrap sec">
            <div className="band">
                <h2>Security is not an afterthought</h2>
                <p>
                    Encrypted connections, two-factor authentication and monitored
                    transactions protect your account.
                </p>
                <a className="btn lg inv" href="/register">Open your account</a>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="foot">
            <div className="wrap foot-grid">
                <div>
                    <Logo size={26} />
                    <p>Invest with clarity.</p>
                </div>
                <div>
                    <h4>Product</h4>
                    <a href="#markets">Markets</a>
                    <a href="#features">Features</a>
                    <a href="#how">How it works</a>
                </div>
                <div>
                    <h4>Support</h4>
                    <a href="#faq">FAQ</a>
                    <a href="#security">Security</a>
                    <a href="/contact">Contact</a>
                </div>
                <div>
                    <h4>Legal</h4>
                    <a href="/terms">Terms</a>
                    <a href="/privacy">Privacy</a>
                </div>
            </div>
            <div className="wrap foot-bottom">
                © {new Date().getFullYear()} BitKastl. All rights reserved.
            </div>
        </footer>
    );
}