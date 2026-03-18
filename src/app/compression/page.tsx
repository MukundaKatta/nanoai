"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const compressionMethods = [
  { method: "Quantization (Q4)", desc: "Reduce weight precision to 4-bit", typical_ratio: "3-4x", accuracy_loss: "1-3%", speed_impact: "+40-60%", complexity: "Low" },
  { method: "Quantization (Q2)", desc: "Aggressive 2-bit quantization", typical_ratio: "6-8x", accuracy_loss: "5-15%", speed_impact: "+60-80%", complexity: "Low" },
  { method: "Pruning (Unstructured)", desc: "Remove individual weights", typical_ratio: "2-5x", accuracy_loss: "2-8%", speed_impact: "Variable", complexity: "Medium" },
  { method: "Pruning (Structured)", desc: "Remove entire attention heads/layers", typical_ratio: "1.5-3x", accuracy_loss: "3-10%", speed_impact: "+20-50%", complexity: "Medium" },
  { method: "Knowledge Distillation", desc: "Train smaller student from larger teacher", typical_ratio: "2-10x", accuracy_loss: "5-20%", speed_impact: "+100-500%", complexity: "High" },
  { method: "Weight Sharing", desc: "Reuse weights across layers", typical_ratio: "2-4x", accuracy_loss: "2-5%", speed_impact: "Neutral", complexity: "Medium" },
  { method: "Low-Rank Factorization", desc: "Decompose weight matrices", typical_ratio: "2-4x", accuracy_loss: "1-5%", speed_impact: "+10-30%", complexity: "Medium" },
  { method: "Vocabulary Pruning", desc: "Reduce vocabulary size", typical_ratio: "1.2-2x", accuracy_loss: "1-3%", speed_impact: "+5-15%", complexity: "Low" },
];

const pipelineSteps = [
  { step: "Select Base Model", desc: "Choose source model for compression", status: "completed" },
  { step: "Analyze Sensitivity", desc: "Profile layer importance and redundancy", status: "completed" },
  { step: "Apply Pruning", desc: "Remove redundant weights and heads", status: "completed" },
  { step: "Quantize Weights", desc: "Reduce precision to target bits", status: "active" },
  { step: "Fine-tune", desc: "Recover accuracy with small dataset", status: "pending" },
  { step: "Validate", desc: "Run benchmarks and quality checks", status: "pending" },
  { step: "Export", desc: "Package for target runtime", status: "pending" },
];

export default function CompressionPage() {
  const [activeTab, setActiveTab] = useState<"methods" | "pipeline">("methods");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Model Compression Pipeline</h1>
          <p className="text-gray-500 mt-1">Compress models for deployment on ultra-constrained devices</p>
        </div>

        <div className="flex gap-2 mb-6">
          {(["methods", "pipeline"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === t ? "bg-fuchsia-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {t === "methods" ? "Compression Methods" : "Active Pipeline"}
            </button>
          ))}
        </div>

        {activeTab === "methods" ? (
          <div className="space-y-4">
            {compressionMethods.map((m) => (
              <div key={m.method} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{m.method}</h3>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${m.complexity === "Low" ? "bg-green-100 text-green-700" : m.complexity === "Medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                    {m.complexity}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Compression</p><p className="text-sm font-bold text-fuchsia-600">{m.typical_ratio}</p></div>
                  <div className="p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Accuracy Loss</p><p className="text-sm font-bold text-amber-600">{m.accuracy_loss}</p></div>
                  <div className="p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Speed Impact</p><p className="text-sm font-bold text-green-600">{m.speed_impact}</p></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Compression Pipeline: TinyLlama 1.1B -&gt; 300MB Target</h2>
            <div className="space-y-4">
              {pipelineSteps.map((step, i) => (
                <div key={step.step} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    step.status === "completed" ? "bg-green-100 text-green-700" : step.status === "active" ? "bg-fuchsia-100 text-fuchsia-700 animate-pulse" : "bg-gray-100 text-gray-400"
                  }`}>{i + 1}</div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.status === "pending" ? "text-gray-400" : "text-gray-900"}`}>{step.step}</p>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    step.status === "completed" ? "bg-green-100 text-green-700" : step.status === "active" ? "bg-fuchsia-100 text-fuchsia-700" : "bg-gray-100 text-gray-400"
                  }`}>{step.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
