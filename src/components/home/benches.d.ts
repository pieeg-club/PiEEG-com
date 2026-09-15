declare module "./hardware-bench-engine.js" {
  export function mountHardwareBench(root: HTMLElement): () => void;
}

declare module "./platform-bench-engine.js" {
  export function mountPlatformBench(root: HTMLElement): () => void;
}
