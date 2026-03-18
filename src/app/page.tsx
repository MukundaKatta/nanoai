"use client";

import Sidebar from "@/components/Sidebar";

const nanoModels = [
  { name: "TinyLlama 1.1B", params: 1.1, size_q4_mb: 640, mmlu: 25.3, tasks: ["General", "Text Gen"], browser: true, iot: true },
  { name: "SmolLM2 1.7B", params: 1.7, size_q4_mb: 1020, mmlu: 35.2, tasks: ["General"], browser: true, iot: false },
  { name: "Qwen2 0.5B", params: 0.5, size_q4_mb: 300, mmlu: 18.2, tasks: ["General", "Chat"], browser: true, iot: true },
  { name: "OLMo 1B", params: 1.0, size_q4_mb: 600, mmlu: 24.5, tasks: ["General", "Research"], browser: true, iot: true },
  { name: "StableLM 2 1.6B", params: 1.6, size_q4_mb: 960, mmlu: 38.9, tasks: ["General", "Chat"], browser: true, iot: false },
  { name: "Phi-1.5 1.3B", params: 1.3, size_q4_mb: 780, mmlu: 43.8, tasks: ["Reasoning", "Code"], browser: true, iot: false },
  { name: "GPT-Neo 125M", params: 0.125, size_q4_mb: 75, mmlu: 12.5, tasks: ["Text Gen"], browser: true, iot: true },
  { name: "DistilGPT2 82M", params: 0.082, size_q4_mb: 50, mmlu: 8.2, tasks: ["Text Gen"], browser: true, iot: true },
  { name: "MobileNet V3 5M", params: 0.005, size_q4_mb: 12, mmlu: 0, tasks: ["Vision"], browser: true, iot: true },
  { name: "Whisper Tiny 39M", params: 0.039, size_q4_mb: 75, mmlu: 0, tasks: ["Speech"], browser: true, iot: true },
  { name: "YOLO v8 Nano 3M", params: 0.003, size_q4_mb: 6, mmlu: 0, tasks: ["Detection"], browser: true, iot: true },
  { name: "TinyBERT 14.5M", params: 0.015, size_q4_mb: 28, mmlu: 0, tasks: ["Classification", "NER"], browser: true, iot: true },
];

const browserCapable = nanoModels.filter((m) => m.browser).length;
const iotCapable = nanoModels.filter((m) => m.iot).length;

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">NanoAI Dashboard</h1>
          <p className="text-gray-500 mt-1">Ultra-small AI models for browsers, IoT devices, and constrained environments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">Nano Models</p><p className="text-3xl font-bold text-fuchsia-600 mt-1">{nanoModels.length}</p><p className="text-xs text-gray-400">All under 2B params</p></div>
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">Browser Ready</p><p className="text-3xl font-bold text-blue-600 mt-1">{browserCapable}</p><p className="text-xs text-gray-400">WebAssembly / WebGPU</p></div>
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">IoT Compatible</p><p className="text-3xl font-bold text-green-600 mt-1">{iotCapable}</p><p className="text-xs text-gray-400">Run on microcontrollers</p></div>
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">Smallest Model</p><p className="text-3xl font-bold text-amber-600 mt-1">3M</p><p className="text-xs text-gray-400">YOLO v8 Nano (6MB)</p></div>
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sub-2B Model Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nanoModels.map((m) => (
              <div key={m.name} className="p-4 bg-gray-50 rounded-lg hover:bg-fuchsia-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{m.name}</h3>
                    <p className="text-xs text-gray-500">{m.params}B params | {m.size_q4_mb > 500 ? `${(m.size_q4_mb / 1000).toFixed(1)}GB` : `${m.size_q4_mb}MB`} Q4</p>
                  </div>
                  <div className="flex gap-1">
                    {m.browser && <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">Web</span>}
                    {m.iot && <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">IoT</span>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {m.tasks.map((t) => <span key={t} className="text-xs px-2 py-0.5 bg-fuchsia-50 text-fuchsia-600 rounded">{t}</span>)}
                </div>
                {m.mmlu > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs"><span className="text-gray-500">MMLU</span><span>{m.mmlu}%</span></div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-fuchsia-500 rounded-full" style={{ width: `${m.mmlu}%` }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Size Distribution</h3>
            {[["< 50MB", nanoModels.filter((m) => m.size_q4_mb < 50).length], ["50-500MB", nanoModels.filter((m) => m.size_q4_mb >= 50 && m.size_q4_mb < 500).length], ["500MB-1GB", nanoModels.filter((m) => m.size_q4_mb >= 500 && m.size_q4_mb < 1000).length], ["1GB+", nanoModels.filter((m) => m.size_q4_mb >= 1000).length]].map(([label, count]) => (
              <div key={label as string} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">{label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-fuchsia-500 rounded-full" style={{ width: `${((count as number) / nanoModels.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium w-4">{count as number}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Task Coverage</h3>
            {["General", "Vision", "Speech", "Code", "Detection", "Classification"].map((task) => (
              <div key={task} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">{task}</span>
                <span className="text-sm font-medium text-fuchsia-600">{nanoModels.filter((m) => m.tasks.includes(task)).length} models</span>
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Deployment Targets</h3>
            {["Chrome/Firefox (WebGPU)", "Arduino/ESP32", "Raspberry Pi", "Mobile Apps", "Smart Speakers", "Wearables"].map((target, i) => (
              <div key={target} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">{target}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${i < 4 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {i < 4 ? "Ready" : "Experimental"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
