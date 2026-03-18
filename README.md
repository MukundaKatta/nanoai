# NanoAI

**Ultra-Small AI Models for Browsers, IoT, and Constrained Environments**

NanoAI is a catalog and benchmarking platform for sub-2B parameter AI models. Explore nano-scale models, run them in the browser via WebAssembly/WebGPU, simulate IoT deployments, and compare performance across constrained environments.

## Features

- **Nano Model Catalog** -- Browse and compare ultra-small AI models under 2B parameters
- **Browser Runtime** -- Run models directly in the browser using WebAssembly and WebGPU
- **IoT Simulator** -- Test model performance on simulated microcontroller environments
- **Memory Profiler** -- Analyze memory footprint and optimize for constrained devices
- **Compression Tools** -- Quantization, pruning, and distillation pipeline management
- **Performance Benchmarks** -- MMLU scores, latency, and throughput metrics per model
- **Device Compatibility** -- Filter models by target platform (browser, IoT, mobile)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd nanoai
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Dashboard with model overview
│   ├── catalog/            # Model catalog browser
│   ├── browser/            # In-browser model runner
│   ├── simulator/          # IoT device simulator
│   ├── memory/             # Memory profiler
│   ├── compression/        # Model compression tools
│   └── iot/                # IoT deployment manager
├── components/
│   └── Sidebar.tsx         # Navigation sidebar
└── lib/                    # Utilities and Supabase client
```

## License

MIT
