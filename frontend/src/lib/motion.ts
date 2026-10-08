// Shared motion constants — single source of timing truth.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = { reveal: 0.9, micro: 0.3, page: 0.5 };
export const STAGGER = 0.09;

export const viewportOnce = { once: true, margin: "-12% 0px" } as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
