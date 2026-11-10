import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Ticker } from "./components/Ticker";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Plans } from "./components/Plans";
import { Security } from "./components/Security";
import { Faq } from "./components/Faq";
import { ChatWidget } from "./components/ChatWidget";
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";

function Home() {
    return (
        <main>
            <Hero />
            <Ticker />
            <Features />
            <HowItWorks />
            <Plans />
            <Security />
            <Faq />
        </main>
    );
}

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
            </Routes>
            <Footer />
            <ChatWidget />
        </>
    );
}