"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const devices = [
  { name: "ESP32-S3", cpu: "Xtensa LX7 240MHz", ram_kb: 512, flash_mb: 16, type: "MCU", power_mw: 150, models: ["TinyBERT INT8", "Keyword Spotting"], feasible: ["TinyBERT 14.5M Q2", "Custom KWS 500K"] },
  { name: "Arduino Nano 33 BLE", cpu: "nRF52840 64MHz", ram_kb: 256, flash_mb: 1, type: "MCU", power_mw: 50, models: ["Keyword Spotting"], feasible: ["Custom KWS 250K"] },
  { name: "Raspberry Pi Zero 2W", cpu: "Cortex-A53 1GHz", ram_kb: 524288, flash_mb: 16000, type: "SBC", power_mw: 1000, models: ["DistilGPT2", "TinyBERT", "MobileNet V3", "Whisper Tiny"], feasible: ["DistilGPT2 82M", "MobileNet V3", "Whisper Tiny", "YOLO Nano"] },
  { name: "Raspberry Pi 5", cpu: "Cortex-A76 2.4GHz", ram_kb: 8388608, flash_mb: 32000, type: "SBC", power_mw: 5000, models: ["TinyLlama Q2", "All nano models"], feasible: ["TinyLlama 1.1B Q2", "Qwen2 0.5B Q4", "All vision/audio models"] },
  { name: "Coral Dev Board Micro", cpu: "Cortex-M7 + Edge TPU", ram_kb: 65536, flash_mb: 128, type: "Edge", power_mw: 2000, models: ["MobileNet V3", "YOLO Nano", "EfficientNet"], feasible: ["MobileNet V3 INT8", "YOLO v8 Nano INT8"] },
  { name: "Jetson Orin Nano", cpu: "Cortex-A78AE + GPU", ram_kb: 8388608, flash_mb: 64000, type: "Edge", power_mw: 15000, models: ["All sub-2B models"], feasible: ["TinyLlama 1.1B Q4", "SmolLM2 1.7B Q4", "Phi-1.5 Q4", "All vision/audio"] },
];

export default function SimulatorPage() {
  const [selected, setSelected] = useState(devices[0]);
  const [simRunning, setSimRunning] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Device Simulator</h1>
          <p className="text-gray-500 mt-1">Simulate nano model deployment on IoT and edge devices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {devices.map((d) => (
            <div key={d.name} onClick={() => setSelected(d)}
              className={`glass rounded-xl p-5 cursor-pointer card-hover ${selected.name === d.name ? "ring-2 ring-fuchsia-500" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{d.name}</h3>
                  <p className="text-xs text-gray-500">{d.type} | {d.cpu}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${d.type === "MCU" ? "bg-amber-100 text-amber-700" : d.type === "SBC" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{d.type}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">RAM</p><p className="text-xs font-bold">{d.ram_kb >= 1048576 ? `${(d.ram_kb/1048576).toFixed(0)}GB` : d.ram_kb >= 1024 ? `${(d.ram_kb/1024).toFixed(0)}MB` : `${d.ram_kb}KB`}</p></div>
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Storage</p><p className="text-xs font-bold">{d.flash_mb >= 1000 ? `${(d.flash_mb/1000).toFixed(0)}GB` : `${d.flash_mb}MB`}</p></div>
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Power</p><p className="text-xs font-bold">{d.power_mw >= 1000 ? `${(d.power_mw/1000).toFixed(0)}W` : `${d.power_mw}mW`}</p></div>
              </div>
              <p className="text-xs text-gray-500">{d.feasible.length} compatible models</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Simulation: {selected.name}</h2>
            <button onClick={() => { setSimRunning(true); setTimeout(() => setSimRunning(false), 2000); }}
              className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg text-sm hover:bg-fuchsia-700 flex items-center gap-2">
              {simRunning && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {simRunning ? "Simulating..." : "Run Simulation"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Device Specs</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">CPU:</span> <span className="font-medium">{selected.cpu}</span></p>
                <p><span className="text-gray-500">RAM:</span> <span className="font-medium">{selected.ram_kb >= 1048576 ? `${(selected.ram_kb/1048576).toFixed(0)} GB` : selected.ram_kb >= 1024 ? `${(selected.ram_kb/1024).toFixed(0)} MB` : `${selected.ram_kb} KB`}</span></p>
                <p><span className="text-gray-500">Storage:</span> <span className="font-medium">{selected.flash_mb >= 1000 ? `${(selected.flash_mb/1000).toFixed(0)} GB` : `${selected.flash_mb} MB`}</span></p>
                <p><span className="text-gray-500">Power Budget:</span> <span className="font-medium">{selected.power_mw >= 1000 ? `${(selected.power_mw/1000).toFixed(1)} W` : `${selected.power_mw} mW`}</span></p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Compatible Models</h3>
              <div className="space-y-2">
                {selected.feasible.map((m) => (
                  <div key={m} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-green-800">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
