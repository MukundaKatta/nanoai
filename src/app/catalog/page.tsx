"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const models = [
  { id: "1", name: "TinyLlama 1.1B", params_m: 1100, size_fp16_mb: 2200, size_q4_mb: 640, size_q2_mb: 380, type: "LLM", arch: "Transformer", context: 2048, mmlu: 25.3, tasks: ["General", "Text Gen"], license: "Apache 2.0", wasm: true, webgpu: true, iot: true },
  { id: "2", name: "Qwen2 0.5B", params_m: 500, size_fp16_mb: 1000, size_q4_mb: 300, size_q2_mb: 180, type: "LLM", arch: "Transformer", context: 32768, mmlu: 18.2, tasks: ["General", "Chat"], license: "Apache 2.0", wasm: true, webgpu: true, iot: true },
  { id: "3", name: "SmolLM2 1.7B", params_m: 1700, size_fp16_mb: 3400, size_q4_mb: 1020, size_q2_mb: 610, type: "LLM", arch: "Transformer", context: 8192, mmlu: 35.2, tasks: ["General"], license: "Apache 2.0", wasm: false, webgpu: true, iot: false },
  { id: "4", name: "Phi-1.5 1.3B", params_m: 1300, size_fp16_mb: 2600, size_q4_mb: 780, size_q2_mb: 460, type: "LLM", arch: "Transformer", context: 2048, mmlu: 43.8, tasks: ["Reasoning", "Code"], license: "MIT", wasm: true, webgpu: true, iot: false },
  { id: "5", name: "GPT-Neo 125M", params_m: 125, size_fp16_mb: 250, size_q4_mb: 75, size_q2_mb: 45, type: "LLM", arch: "Transformer", context: 2048, mmlu: 12.5, tasks: ["Text Gen"], license: "MIT", wasm: true, webgpu: true, iot: true },
  { id: "6", name: "DistilGPT2 82M", params_m: 82, size_fp16_mb: 164, size_q4_mb: 50, size_q2_mb: 30, type: "LLM", arch: "Transformer", context: 1024, mmlu: 8.2, tasks: ["Text Gen"], license: "Apache 2.0", wasm: true, webgpu: true, iot: true },
  { id: "7", name: "MobileNet V3 5M", params_m: 5, size_fp16_mb: 22, size_q4_mb: 12, size_q2_mb: 8, type: "Vision", arch: "CNN", context: 0, mmlu: 0, tasks: ["Classification"], license: "Apache 2.0", wasm: true, webgpu: true, iot: true },
  { id: "8", name: "Whisper Tiny 39M", params_m: 39, size_fp16_mb: 150, size_q4_mb: 75, size_q2_mb: 50, type: "Audio", arch: "Transformer", context: 0, mmlu: 0, tasks: ["Speech-to-Text"], license: "MIT", wasm: true, webgpu: true, iot: true },
  { id: "9", name: "YOLO v8 Nano 3M", params_m: 3, size_fp16_mb: 12, size_q4_mb: 6, size_q2_mb: 4, type: "Vision", arch: "CNN", context: 0, mmlu: 0, tasks: ["Detection"], license: "AGPL-3.0", wasm: true, webgpu: true, iot: true },
  { id: "10", name: "TinyBERT 14.5M", params_m: 15, size_fp16_mb: 56, size_q4_mb: 28, size_q2_mb: 18, type: "NLU", arch: "Transformer", context: 512, mmlu: 0, tasks: ["Classification", "NER"], license: "Apache 2.0", wasm: true, webgpu: true, iot: true },
  { id: "11", name: "DistilBERT 66M", params_m: 66, size_fp16_mb: 256, size_q4_mb: 128, size_q2_mb: 80, type: "NLU", arch: "Transformer", context: 512, mmlu: 0, tasks: ["Classification", "QA"], license: "Apache 2.0", wasm: true, webgpu: true, iot: true },
  { id: "12", name: "OLMo 1B", params_m: 1000, size_fp16_mb: 2000, size_q4_mb: 600, size_q2_mb: 360, type: "LLM", arch: "Transformer", context: 2048, mmlu: 24.5, tasks: ["General"], license: "Apache 2.0", wasm: true, webgpu: true, iot: true },
];

export default function CatalogPage() {
  const [filter, setFilter] = useState<"all" | "LLM" | "Vision" | "Audio" | "NLU">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof models[0] | null>(null);

  const filtered = models
    .filter((m) => filter === "all" || m.type === filter)
    .filter((m) => !search || m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sub-2B Model Catalog</h1>
          <p className="text-gray-500 mt-1">Ultra-small models for the most constrained environments</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <input type="text" placeholder="Search models..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-fuchsia-500 outline-none" />
          {(["all", "LLM", "Vision", "Audio", "NLU"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f ? "bg-fuchsia-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f === "all" ? "All Types" : f}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-3 text-gray-500 font-medium">Model</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">Params</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">Q4 Size</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">Q2 Size</th>
                <th className="text-center py-3 px-3 text-gray-500 font-medium">Type</th>
                <th className="text-center py-3 px-3 text-gray-500 font-medium">WASM</th>
                <th className="text-center py-3 px-3 text-gray-500 font-medium">WebGPU</th>
                <th className="text-center py-3 px-3 text-gray-500 font-medium">IoT</th>
                <th className="text-left py-3 px-3 text-gray-500 font-medium">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} onClick={() => setSelected(m)} className={`border-b border-gray-100 hover:bg-fuchsia-50 cursor-pointer ${selected?.id === m.id ? "bg-fuchsia-50" : ""}`}>
                  <td className="py-3 px-3 font-medium text-gray-900">{m.name}</td>
                  <td className="py-3 px-3 text-right text-gray-600">{m.params_m >= 1000 ? `${(m.params_m/1000).toFixed(1)}B` : `${m.params_m}M`}</td>
                  <td className="py-3 px-3 text-right text-gray-600">{m.size_q4_mb > 500 ? `${(m.size_q4_mb/1000).toFixed(1)}GB` : `${m.size_q4_mb}MB`}</td>
                  <td className="py-3 px-3 text-right text-gray-600">{m.size_q2_mb > 500 ? `${(m.size_q2_mb/1000).toFixed(1)}GB` : `${m.size_q2_mb}MB`}</td>
                  <td className="py-3 px-3 text-center"><span className="text-xs px-2 py-0.5 bg-fuchsia-100 text-fuchsia-700 rounded">{m.type}</span></td>
                  <td className="py-3 px-3 text-center">{m.wasm ? <span className="text-green-600">Yes</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="py-3 px-3 text-center">{m.webgpu ? <span className="text-green-600">Yes</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="py-3 px-3 text-center">{m.iot ? <span className="text-green-600">Yes</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="py-3 px-3"><div className="flex flex-wrap gap-1">{m.tasks.map((t) => <span key={t} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{t}</span>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{selected.name} Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[["Architecture", selected.arch], ["License", selected.license], ["Context", selected.context > 0 ? selected.context.toLocaleString() : "N/A"], ["FP16 Size", `${selected.size_fp16_mb}MB`], ["MMLU", selected.mmlu > 0 ? `${selected.mmlu}%` : "N/A"]].map(([label, val]) => (
                <div key={label as string} className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">{label}</p><p className="font-medium">{val}</p></div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
