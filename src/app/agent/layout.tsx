import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PiEEG Agent — AI Copilot for Brain Data",
  description:
    "Ask your brain data anything. PiEEG Agent gives you natural language access to live EEG signals, mental state analysis, pattern training, and neuroscience insights.",
};

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
