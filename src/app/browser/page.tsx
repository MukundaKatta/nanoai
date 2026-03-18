"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type BrowserModel = {
  name: string;
  size_mb: number;
  runtime: "WebGPU" | "WASM" | "Both";
  load_time_s: number;
  tokens_s: number;
  first_token_ms: number;
  memory_mb: number;
  browser_support: string[];
  status: "ready" | "loading" | "error";
};

const browserModels: BrowserModel[] = [
  { name: "TinyLlama 1.1B Q4", size_mb: 640, runtime: "WebGPU", load_time_s: 3.2, tokens_s: 15, first_token_ms: 800, memory_mb: 1500, browser_support: ["Chrome 120+", "Edge 120+", "Firefox 130+"], status: "ready" },
  { name: "Qwen2 0.5B Q4", size_mb: 300, runtime: "WebGPU", load_time_s: 1.8, tokens_s: 28, first_token_ms: 450, memory_mb: 800, browser_support: ["Chrome 120+", "Edge 120+", "Firefox 130+"], status: "ready" },
  { name: "DistilGPT2 82M", size_mb: 164, runtime: "Both", load_time_s: 0.8, tokens_s: 45, first_token_ms: 200, memory_mb: 350, browser_support: ["Chrome 90+", "Safari 16+", "Firefox 100+", "Edge 90+"], status: "ready" },
  { name: "GPT-Neo 125M Q4", size_mb: 75, runtime: "Both", load_time_s: 0.5, tokens_s: 52, first_token_ms: 150, memory_mb: 250, browser_support: ["Chrome 90+", "Safari 16+", "Firefox 100+", "Edge 90+"], status: "ready" },
  { name: "Whisper Tiny 39M", size_mb: 75, runtime: "WASM", load_time_s: 0.6, tokens_s: 0, first_token_ms: 50, memory_mb: 200, browser_support: ["Chrome 80+", "Safari 15+", "Firefox 90+", "Edge 80+"], status: "ready" },
  { name: "MobileNet V3", size_mb: 12, runtime: "Both", load_time_s: 0.2, tokens_s: 0, first_token_ms: 8, memory_mb: 50, browser_support: ["Chrome 80+", "Safari 15+", "Firefox 90+", "Edge 80+"], status: "ready" },
  { name: "TinyBERT 14.5M", size_mb: 28, runtime: "WASM", load_time_s: 0.3, tokens_s: 0, first_token_ms: 15, memory_mb: 80, browser_support: ["Chrome 80+", "Safari 15+", "Firefox 90+", "Edge 80+"], status: "ready" },
  { name: "YOLO v8 Nano", size_mb: 6, runtime: "Both", load_time_s: 0.1, tokens_s: 0, first_token_ms: 12, memory_mb: 40, browser_support: ["Chrome 80+", "Safari 15+", "Firefox 90+", "Edge 80+"], status: "ready" },
];

export default function BrowserPage() {
  const [selectedModel, setSelectedModel] = useState<BrowserModel | null>(null);
  const [demoInput, setDemoInput] = useState("Once upon a time");
  const [demoOutput, setDemoOutput] = useState("");
  const [generating, setGenerating] = useState(false);

  const runDemo = () => {
    setGenerating(true);
    const words = ["in", "a", "small", "village,", "there", "lived", "a", "curious", "inventor", "who", "dreamed", "of", "building", "machines", "that", "could", "think", "and", "reason", "on", "their", "own."];
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) { setDemoOutput((prev) => prev + (prev ? " " : "") + words[i]); i++; }
      else { clearInterval(interval); setGenerating(false); }
    }, 80);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browser Inference Engine</h1>
          <p className="text-gray-500 mt-1">Run AI models directly in the browser using WebAssembly and WebGPU</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">WebGPU Models</p><p className="text-3xl font-bold text-fuchsia-600 mt-1">{browserModels.filter((m) => m.runtime !== "WASM").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">WASM Models</p><p className="text-3xl font-bold text-blue-600 mt-1">{browserModels.filter((m) => m.runtime !== "WebGPU").length}</p></div>
          <div className="glass rounded-xl p-6"><p className="text-sm text-gray-500">Avg Load Time</p><p className="text-3xl font-bold text-green-600 mt-1">{(browserModels.reduce((s, m) => s + m.load_time_s, 0) / browserModels.length).toFixed(1)}s</p></div>
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Demo (Simulated)</h2>
          <div className="flex gap-4 mb-4">
            <input type="text" value={demoInput} onChange={(e) => setDemoInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" placeholder="Enter prompt..." />
            <button onClick={() => { setDemoOutput(""); runDemo(); }} disabled={generating}
              className="px-6 py-2.5 bg-fuchsia-600 text-white rounded-xl font-medium hover:bg-fuchsia-700 disabled:opacity-50 flex items-center gap-2">
              {generating && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {generating ? "Generating..." : "Generate"}
            </button>
          </div>
          {(demoInput || demoOutput) && (
            <div className="p-4 bg-gray-900 rounded-xl text-green-400 font-mono text-sm">
              <span className="text-gray-400">{demoInput}</span> {demoOutput}
              {generating && <span className="animate-pulse">|</span>}
            </div>
          )}
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browser-Ready Models</h2>
          <div className="space-y-3">
            {browserModels.map((m) => (
              <div key={m.name} onClick={() => setSelectedModel(m)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedModel?.name === m.name ? "bg-fuchsia-50 border-fuchsia-300" : "bg-gray-50 border-transparent hover:bg-gray-100"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${m.status === "ready" ? "bg-green-500" : "bg-amber-500 animate-pulse"}`} />
                    <div>
                      <p className="font-medium text-gray-900">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.size_mb}MB | {m.runtime} | Load: {m.load_time_s}s</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {m.tokens_s > 0 && <span className="text-gray-600">{m.tokens_s} tok/s</span>}
                    <span className="text-gray-600">{m.first_token_ms}ms first token</span>
                    <span className="text-gray-600">{m.memory_mb}MB RAM</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${m.runtime === "WebGPU" ? "bg-fuchsia-100 text-fuchsia-700" : m.runtime === "WASM" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {m.runtime}
                    </span>
                  </div>
                </div>
                {selectedModel?.name === m.name && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Browser Support:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.browser_support.map((b) => <span key={b} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded">{b}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
