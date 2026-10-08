import type { ReactNode } from "react";

// Shared form styling for light (ivory) and dark (charcoal) surfaces.
export const fieldThemes = {
  light: {
    label: "eyebrow text-sand",
    input:
      "w-full border-b border-line bg-transparent py-3 text-sm text-ink placeholder:text-sand/50 focus:border-gold focus:outline-none transition-colors duration-300",
    error: "mt-2 text-xs text-gold-deep",
  },
  dark: {
    label: "eyebrow text-gold-light/80",
    input:
      "w-full border-b border-line-light bg-transparent py-3 text-sm text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none transition-colors duration-300 [color-scheme:dark]",
    error: "mt-2 text-xs text-gold-light",
  },
} as const;

export type FieldVariant = keyof typeof fieldThemes;

interface FieldProps {
  label: string;
  error?: string;
  variant?: FieldVariant;
  children: ReactNode;
  htmlFor?: string;
}

export function Field({ label, error, variant = "light", children, htmlFor }: FieldProps) {
  const t = fieldThemes[variant];
  return (
    <label htmlFor={htmlFor} className="block">
      <span className={t.label}>{label}</span>
      {children}
      {error && (
        <p role="alert" className={t.error}>
          {error}
        </p>
      )}
    </label>
  );
}
