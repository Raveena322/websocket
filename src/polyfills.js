// Polyfill for buffer in browser
globalThis.Buffer = {
  isBuffer: () => false,
  alloc: () => null,
  from: () => null,
  allocUnsafe: () => null,
};