declare module "./hardware-bench-engine.js" {
  export function mountHardwareBench(root: HTMLElement): () => void;
}

declare module "./platform-bench-engine.js" {
  export function mountPlatformBench(root: HTMLElement): () => void;
}

declare module "./world-map-engine.js" {
  export function mountWorldMap(root: HTMLElement): () => void;
}
