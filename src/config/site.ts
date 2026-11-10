export interface Plan {
    id: string;
    name: string;
    min: number;
    max: number | null;
    returnRate?: string; // fill only with terms the client has approved
    duration?: string;
}

export const SITE = {
    contactEmail: "support@bitkastl.com", // replace with the real email
};

export const PLANS: Plan[] = [
    { id: "starter", name: "Starter", min: 500,   max: 1999, returnRate: "8% ROI",  duration: "30 days" },
    { id: "growth",  name: "Growth",  min: 2000,  max: 4999, returnRate: "12% ROI", duration: "30 days" },
    { id: "pro",     name: "Pro",     min: 5000,  max: 9999, returnRate: "15% ROI", duration: "45 days" },
    { id: "elite",   name: "Elite",   min: 10000, max: null, returnRate: "20% ROI", duration: "60 days" },
];