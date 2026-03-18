"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const memoryProfiles = [
  { model: "TinyLlama 1.1B Q4", weights_mb: 640, kv_cache_mb: 128, activations_mb: 256, runtime_mb: 85, total_mb: 1109, peak_mb: 1350, ctx_length: 2048, batch_size: 1 },
  { model: "Qwen2 0.5B Q4", weights_mb: 300, kv_cache_mb: 64, activations_mb: 120, runtime_mb: 45, total_mb: 529, peak_mb: 680, ctx_length: 2048, batch_size: 1 },
  { model: "SmolLM2 1.7B Q4", weights_mb: 1020, kv_cache_mb: 192, activations_mb: 384, runtime_mb: 95, total_mb: 1691, peak_mb: 2100, ctx_length: 2048, batch_size: 1 },
  { model: "DistilGPT2 82M", weights_mb: 164, kv_cache_mb: 16, activations_mb: 48, runtime_mb: 25, total_mb: 253, peak_mb: 320, ctx_length: 1024, batch_size: 1 },
  { model: "GPT-Neo 125M Q4", weights_mb: 75, kv_cache_mb: 24, activations_mb: 64, runtime_mb: 30, total_mb: 193, peak_mb: 250, ctx_length: 2048, batch_size: 1 },
  { model: "MobileNet V3", weights_mb: 12, kv_cache_mb: 0, activations_mb: 18, runtime_mb: 15, total_mb: 45, peak_mb: 65, ctx_length: 0, batch_size: 1 },
  { model: "Whisper Tiny 39M", weights_mb: 75, kv_cache_mb: 8, activations_mb: 42, runtime_mb: 20, total_mb: 145, peak_mb: 200, ctx_length: 0, batch_size: 1 },
  { model: "YOLO v8 Nano", weights_mb: 6, kv_cache_mb: 0, activations_mb: 24, runtime_mb: 12, total_mb: 42, peak_mb: 55, ctx_length: 0, batch_size: 1 },
];

export default function MemoryPage() {
  const [sortBy, setSortBy] = useState<"total_mb" | "peak_mb" | "weights_mb">("total_mb");

  const sorted = [...memoryProfiles].sort((a, b) => a[sortBy] - b[sortBy]);
  const maxPeak = Math.max(...memoryProfiles.map((m) => m.peak_mb));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Memory Profiler</h1>
          <p className="text-gray-500 mt-1">Analyze memory usage breakdown for ultra-small models</p>
        </div>

        <div className="flex gap-2 mb-6">
          {([["total_mb", "Total"], ["peak_mb", "Peak"], ["weights_mb", "Weights"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setSortBy(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${sortBy === key ? "bg-fuchsia-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Sort: {label}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Memory Breakdown</h2>
          <div className="space-y-4">
            {sorted.map((m) => (
              <div key={m.model}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{m.model}</span>
                  <span className="text-sm text-gray-600">{m.total_mb}MB total | {m.peak_mb}MB peak</span>
                </div>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-fuchsia-500" style={{ width: `${(m.weights_mb / maxPeak) * 100}%` }} title={`Weights: ${m.weights_mb}MB`} />
                  <div className="h-full bg-blue-400" style={{ width: `${(m.kv_cache_mb / maxPeak) * 100}%` }} title={`KV Cache: ${m.kv_cache_mb}MB`} />
                  <div className="h-full bg-amber-400" style={{ width: `${(m.activations_mb / maxPeak) * 100}%` }} title={`Activations: ${m.activations_mb}MB`} />
                  <div className="h-full bg-green-400" style={{ width: `${(m.runtime_mb / maxPeak) * 100}%` }} title={`Runtime: ${m.runtime_mb}MB`} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-fuchsia-500 rounded" /><span>Weights</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded" /><span>KV Cache</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-400 rounded" /><span>Activations</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-400 rounded" /><span>Runtime</span></div>
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Model</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Weights</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">KV Cache</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Activations</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Runtime</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Total</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Peak</th>
            </tr></thead>
            <tbody>{sorted.map((m) => (
              <tr key={m.model} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{m.model}</td>
                <td className="py-3 px-4 text-right">{m.weights_mb}MB</td>
                <td className="py-3 px-4 text-right">{m.kv_cache_mb}MB</td>
                <td className="py-3 px-4 text-right">{m.activations_mb}MB</td>
                <td className="py-3 px-4 text-right">{m.runtime_mb}MB</td>
                <td className="py-3 px-4 text-right font-medium text-fuchsia-600">{m.total_mb}MB</td>
                <td className="py-3 px-4 text-right font-medium text-red-600">{m.peak_mb}MB</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
