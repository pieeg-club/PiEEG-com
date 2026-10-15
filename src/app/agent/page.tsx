import { Metadata } from "next";
import AgentHero from "@/components/agent/AgentHero";
import AgentBench from "@/components/agent/AgentBench";
import AgentMcpSection from "@/components/agent/AgentMcpSection";
import AgentToolsAndScience from "@/components/agent/AgentToolsAndScience";

export const metadata: Metadata = {
  title: "PiEEG Agent & Buddy - Neural Perception Cascade & MCP Server",
  description:
    "Bridge 250 Hz EEG streams to ~1 Hz LLM reasoning. PiEEG Agent and Buddy compress raw biosignals into a 5-tier perception cascade, L2 + group-lasso LORO-CV classifiers, and 22 read/decode/actuator tools served over MCP to Cursor, VS Code, Claude, and ChatGPT.",
};

export default function AgentPage() {
  return (
    <main className="flex-1">
      <AgentHero />
      <AgentBench />
      <AgentMcpSection />
      <AgentToolsAndScience />
    </main>
  );
}
