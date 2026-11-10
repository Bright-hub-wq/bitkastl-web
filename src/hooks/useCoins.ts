import { useEffect, useState } from "react";

export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number | null;
}

const IDS = "bitcoin,ethereum,tether,binancecoin,solana,ripple,usd-coin,dogecoin,cardano,tron";
const URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
    IDS +
    "&order=market_cap_desc&sparkline=false&price_change_percentage=24h";

export function useCoins() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        let alive = true;

        async function load() {
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error("bad response");
                const data: Coin[] = await res.json();
                if (alive) {
                    setCoins(data);
                    setError(false);
                }
            } catch {
                if (alive) setError(true);
            }
        }

        load();
        const timer = setInterval(load, 60000);
        return () => {
            alive = false;
            clearInterval(timer);
        };
    }, []);

    return { coins, error };
}