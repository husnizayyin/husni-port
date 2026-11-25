export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[] | unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
