"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const iotGuides = [
  { category: "Smart Home", icon: "home", devices: ["ESP32-S3", "RPi Zero 2W", "Google Coral"], use_cases: ["Keyword spotting", "Person detection", "Gesture recognition", "Anomaly detection"], recommended_models: ["Whisper Tiny (KWS)", "MobileNet V3", "YOLO Nano"], ram_req: "256KB - 512MB", difficulty: "Beginner", steps: ["Flash firmware with TFLite Micro", "Load INT8 quantized model", "Configure wake-word detection", "Set up MQTT for smart home integration"] },
  { category: "Industrial IoT", icon: "factory", devices: ["Jetson Orin Nano", "Coral Dev Board", "RPi 5"], use_cases: ["Predictive maintenance", "Quality inspection", "Safety monitoring", "Process optimization"], recommended_models: ["YOLO v8 Nano", "MobileNet V3", "Custom anomaly detector"], ram_req: "512MB - 8GB", difficulty: "Intermediate", steps: ["Set up edge compute node with JetPack", "Deploy TensorRT optimized models", "Configure data pipeline to cloud", "Set up alerting and monitoring"] },
  { category: "Wearables", icon: "watch", devices: ["nRF52840", "ESP32-S3", "STM32"], use_cases: ["Activity recognition", "Heart rate anomaly", "Fall detection", "Sleep analysis"], recommended_models: ["TinyBERT (classification)", "Custom CNN 100K", "MicroNet"], ram_req: "64KB - 512KB", difficulty: "Advanced", steps: ["Use TensorFlow Lite Micro", "Quantize to INT8 with full-integer mode", "Optimize for ARM Cortex-M", "Implement power-aware inference scheduling"] },
  { category: "Agriculture", icon: "plant", devices: ["RPi Zero 2W", "ESP32-S3", "Coral Dev Board"], use_cases: ["Crop disease detection", "Pest identification", "Soil analysis", "Weather prediction"], recommended_models: ["MobileNet V3 (custom fine-tuned)", "YOLO Nano", "Custom regression model"], ram_req: "256KB - 512MB", difficulty: "Intermediate", steps: ["Collect domain-specific training images", "Fine-tune MobileNet V3 on crop data", "Quantize to INT8 for edge TPU", "Deploy with solar-powered setup"] },
  { category: "Retail & POS", icon: "shop", devices: ["RPi 5", "Jetson Orin Nano", "Android tablets"], use_cases: ["Product recognition", "Customer counting", "Shelf monitoring", "Queue estimation"], recommended_models: ["YOLO v8 Nano", "MobileNet V3", "DistilBERT (NLU)"], ram_req: "1GB - 8GB", difficulty: "Beginner", steps: ["Set up camera and edge device", "Deploy pre-trained object detection", "Configure counting zones", "Connect to POS system via API"] },
  { category: "Automotive", icon: "car", devices: ["Jetson Orin Nano", "Hailo-8L", "Coral USB"], use_cases: ["Driver monitoring", "Passenger detection", "Voice commands", "Gesture control"], recommended_models: ["YOLO v8 Nano", "Whisper Tiny", "MobileNet V3", "Custom CNN"], ram_req: "4GB - 8GB", difficulty: "Advanced", steps: ["Set up real-time camera pipeline", "Deploy multi-model inference", "Configure CAN bus integration", "Implement safety-critical fallbacks"] },
];

export default function IoTPage() {
  const [selected, setSelected] = useState(iotGuides[0]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">IoT Deployment Guide</h1>
          <p className="text-gray-500 mt-1">Step-by-step guides for deploying nano AI models on IoT devices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {iotGuides.map((guide) => (
            <div key={guide.category} onClick={() => setSelected(guide)}
              className={`glass rounded-xl p-5 cursor-pointer card-hover ${selected.category === guide.category ? "ring-2 ring-fuchsia-500" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{guide.category}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${guide.difficulty === "Beginner" ? "bg-green-100 text-green-700" : guide.difficulty === "Intermediate" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                  {guide.difficulty}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">RAM: {guide.ram_req}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {guide.devices.map((d) => <span key={d} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{d}</span>)}
              </div>
              <p className="text-xs text-gray-500">{guide.use_cases.length} use cases | {guide.recommended_models.length} models</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{selected.category} - Deployment Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Use Cases</h3>
              <div className="space-y-2">
                {selected.use_cases.map((uc) => (
                  <div key={uc} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-fuchsia-500" />
                    <span className="text-sm">{uc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Recommended Models</h3>
              <div className="space-y-2 mb-4">
                {selected.recommended_models.map((m) => (
                  <div key={m} className="flex items-center gap-2 p-2 bg-fuchsia-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-fuchsia-500" />
                    <span className="text-sm text-fuchsia-800">{m}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Deployment Steps</h3>
              <div className="space-y-2">
                {selected.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-gray-700">{step}</span>
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
