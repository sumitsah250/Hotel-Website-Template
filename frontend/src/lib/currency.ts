import { useSyncExternalStore } from "react";

// Global currency state — a tiny store (no provider needed) so the navbar
// switcher and every price on the site stay in sync. Persisted to localStorage.
export type CurrencyCode = "EUR" | "USD" | "GBP" | "INR" | "NPR";

const RATES: Record<CurrencyCode, { rate: number; symbol: string }> = {
  EUR: { rate: 1, symbol: "€" },
  USD: { rate: 1.09, symbol: "$" },
  GBP: { rate: 0.86, symbol: "£" },
  INR: { rate: 98, symbol: "₹" },
  NPR: { rate: 157, symbol: "रू " },
};

export const currencyCodes: CurrencyCode[] = ["EUR", "USD", "GBP", "INR", "NPR"];

const KEY = "rs_currency";

let current: CurrencyCode = (() => {
  try {
    const saved = localStorage.getItem(KEY);
    return currencyCodes.includes(saved as CurrencyCode) ? (saved as CurrencyCode) : "EUR";
  } catch {
    return "EUR";
  }
})();

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export function setCurrency(code: CurrencyCode) {
  if (code === current) return;
  current = code;
  try {
    localStorage.setItem(KEY, code);
  } catch {
    /* private mode */
  }
  listeners.forEach((l) => l());
}

// Advance to the next currency in the given (config-driven) list.
export function cycleCurrency(codes: readonly string[] = currencyCodes) {
  const next = codes[(codes.indexOf(current) + 1) % codes.length];
  if (currencyCodes.includes(next as CurrencyCode)) setCurrency(next as CurrencyCode);
}

export const useCurrency = () => useSyncExternalStore(subscribe, () => current);

const convert = (eur: number, code: CurrencyCode) => Math.round(eur * RATES[code].rate);

// €890 → $970 / £765
export function formatMoney(eur: number, code: CurrencyCode): string {
  const locale = code === "INR" || code === "NPR" ? "en-IN" : "en-US";
  return `${RATES[code].symbol}${convert(eur, code).toLocaleString(locale)}`;
}

// "From €1,480 for two" → "From $1,613 for two"
export function convertPriceText(text: string, code: CurrencyCode): string {
  if (code === "EUR") return text;
  return text.replace(/€\s?([\d,]+(?:\.\d+)?)/g, (_m, num: string) =>
    formatMoney(Number(num.replace(/,/g, "")), code)
  );
}

// Bare menu prices: "28" → "$31", "12—24" → "$13—26"
export function formatMenuPrice(price: string, code: CurrencyCode): string {
  return `${RATES[code].symbol}${price.replace(/\d+/g, (n) => String(convert(Number(n), code)))}`;
}
