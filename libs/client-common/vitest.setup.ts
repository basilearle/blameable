import '@testing-library/jest-dom';

// Polyfill for ResizeObserver
(global as any).ResizeObserver = class ResizeObserver {
  observe() { /* empty */ }
  unobserve() { /* empty */ }
  disconnect() { /* empty */ }
}
