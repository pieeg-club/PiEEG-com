declare module "./agent-bench-engine.js" {
  export function mountAgentBench(root: HTMLElement): () => void;
}

declare module "@/components/home/mcp-stage.js" {
  export function mountMcpStage(
    root: HTMLElement,
    opts?: { reduce?: boolean },
  ): () => void;
}

