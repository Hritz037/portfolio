import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Sliders,
  DollarSign,
  TrendingUp,
  Code2,
  Check,
  Radio,
  Wifi,
  WifiOff,
  RefreshCw,
  Plus,
  Move,
  ArrowRight,
  Maximize2,
  Cpu,
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface InteractiveDemoModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-300 rounded-2xl shadow-2xl overflow-hidden my-auto text-neutral-100 light:text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Window Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 light:border-neutral-200 bg-neutral-950/80 light:bg-neutral-100/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-neutral-800 light:bg-neutral-300 mx-1" />
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-neutral-200 light:text-neutral-900 font-display">
                Interactive Live Sandbox
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-indigo-400 light:text-indigo-600 font-medium truncate max-w-[200px] sm:max-w-md">
                {project.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono-code text-emerald-400 bg-emerald-500/10 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Simulated Runtime Active</span>
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 rounded-lg hover:bg-neutral-800 light:hover:bg-neutral-200 transition-colors"
              aria-label="Close interactive demo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Demo Content Area according to project type */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950 light:bg-neutral-50">
          {project.id === 'cloudscale-observability' && <CloudScaleDemo />}
          {project.id === 'nexus-ai-canvas' && <NexusCanvasDemo />}
          {project.id === 'aura-wealth-fintech' && <AuraWealthDemo />}
          {project.id === 'hypercore-orm' && <HyperCoreDemo />}
          {project.id === 'pulse-vitals-mobile' && <PulseVitalsDemo />}
          {/* Fallback for any other custom projects */}
          {!['cloudscale-observability', 'nexus-ai-canvas', 'aura-wealth-fintech', 'hypercore-orm', 'pulse-vitals-mobile'].includes(project.id) && (
            <GenericProjectDemo project={project} />
          )}
        </div>

        {/* Modal Window Footer */}
        <div className="px-5 py-3 border-t border-neutral-800 light:border-neutral-200 bg-neutral-900/90 light:bg-neutral-100/90 flex flex-wrap items-center justify-between text-xs text-neutral-400 light:text-neutral-600 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono-code">Stack:</span>
            <span>{project.techStack.slice(0, 3).join(', ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Live client-side simulator sandbox</span>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-neutral-800 light:bg-neutral-200 text-neutral-200 light:text-neutral-800 hover:bg-neutral-700 rounded-md font-medium transition-colors"
            >
              Close Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   1. CloudScale Observability Live Interactive Demo
   ------------------------------------------------------------- */
function CloudScaleDemo() {
  const [isRunning, setIsRunning] = useState(true);
  const [eventsPerSec, setEventsPerSec] = useState(28400);
  const [p95Latency, setP95Latency] = useState(380);
  const [errorRate, setErrorRate] = useState(0.02);
  const [activeService, setActiveService] = useState('all');
  const [spiked, setSpiked] = useState(false);
  const [selectedSpan, setSelectedSpan] = useState<string | null>('span-1');

  // Simulated live event ticker
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setEventsPerSec((prev) => {
        const delta = Math.floor((Math.random() - 0.48) * 600);
        return Math.max(15000, prev + delta);
      });
      setP95Latency((prev) => {
        if (spiked) return prev;
        const delta = Math.floor((Math.random() - 0.5) * 15);
        return Math.max(340, Math.min(430, prev + delta));
      });
    }, 800);
    return () => clearInterval(timer);
  }, [isRunning, spiked]);

  const triggerAnomalySpike = () => {
    setSpiked(true);
    setP95Latency(1420);
    setErrorRate(3.84);
    setTimeout(() => {
      setSpiked(false);
      setP95Latency(385);
      setErrorRate(0.02);
    }, 4500);
  };

  const traces = [
    {
      id: 'span-1',
      service: 'checkout-api',
      endpoint: 'POST /v2/orders/checkout',
      duration: spiked ? '1,420 ms' : '142 ms',
      status: spiked ? 504 : 200,
      breakdown: [
        { name: 'Gateway Auth Verification', time: '14 ms', pct: 10, color: 'bg-indigo-500' },
        { name: 'Postgres Account Balance Locking', time: spiked ? '1,180 ms' : '62 ms', pct: spiked ? 82 : 45, color: spiked ? 'bg-rose-500' : 'bg-emerald-500' },
        { name: 'Stripe Settlement RPC', time: '48 ms', pct: 30, color: 'bg-sky-500' },
        { name: 'Kafka Event Dispatch', time: '18 ms', pct: 15, color: 'bg-amber-500' },
      ],
    },
    {
      id: 'span-2',
      service: 'inventory-svc',
      endpoint: 'GET /v1/stock/sku-9921',
      duration: '24 ms',
      status: 200,
      breakdown: [
        { name: 'Redis Cache Query', time: '2.4 ms', pct: 15, color: 'bg-indigo-500' },
        { name: 'In-memory Aggregation', time: '21.6 ms', pct: 85, color: 'bg-emerald-500' },
      ],
    },
    {
      id: 'span-3',
      service: 'auth-gateway',
      endpoint: 'POST /v1/oauth/token',
      duration: '48 ms',
      status: 200,
      breakdown: [
        { name: 'Ed25519 Signature Verify', time: '12 ms', pct: 25, color: 'bg-indigo-500' },
        { name: 'Session Token Generation', time: '36 ms', pct: 75, color: 'bg-emerald-500' },
      ],
    },
  ];

  const currentSpan = traces.find((t) => t.id === selectedSpan) || traces[0];

  return (
    <div className="space-y-5">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 light:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-700 transition-colors"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isRunning ? 'Pause Telemetry' : 'Resume Stream'}</span>
          </button>

          <button
            onClick={triggerAnomalySpike}
            disabled={spiked}
            className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-600/30 transition-colors disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>{spiked ? 'Simulating Spike...' : 'Simulate Latency Spike'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Cluster Service:</span>
          <select
            value={activeService}
            onChange={(e) => setActiveService(e.target.value)}
            className="bg-neutral-950 light:bg-neutral-100 border border-neutral-800 light:border-neutral-300 rounded px-2 py-1 text-xs text-neutral-200 light:text-neutral-800"
          >
            <option value="all">All Services (8/8)</option>
            <option value="checkout-api">checkout-api</option>
            <option value="inventory-svc">inventory-svc</option>
            <option value="auth-gateway">auth-gateway</option>
          </select>
        </div>
      </div>

      {/* Key Real-Time Telemetry Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400 font-medium">Ingestion Throughput</div>
          <div className="text-xl font-bold font-mono-code text-indigo-400 light:text-indigo-600 tabular-nums mt-0.5">
            {eventsPerSec.toLocaleString()} <span className="text-xs font-normal text-neutral-500">ev/sec</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400 font-medium">p95 Query Latency</div>
          <div className={`text-xl font-bold font-mono-code tabular-nums mt-0.5 ${spiked ? 'text-rose-400' : 'text-emerald-400'}`}>
            {p95Latency} <span className="text-xs font-normal text-neutral-500">ms</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400 font-medium">Cluster Error Rate</div>
          <div className={`text-xl font-bold font-mono-code tabular-nums mt-0.5 ${spiked ? 'text-rose-400' : 'text-neutral-200 light:text-neutral-800'}`}>
            {errorRate.toFixed(2)}%
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400 font-medium">Mesh Health</div>
          <div className="text-xl font-bold font-mono-code text-emerald-400 tabular-nums mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>99.99% SLO</span>
          </div>
        </div>
      </div>

      {/* Interactive Trace Waterfall Explorer */}
      <div className="p-4 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800 light:border-neutral-200 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 light:text-neutral-800 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Distributed Spans & Waterfall Drilldown</span>
          </h4>
          <span className="text-xs text-neutral-500">Click a span to inspect execution graph</span>
        </div>

        <div className="space-y-2">
          {traces.map((trace) => {
            const isSelected = selectedSpan === trace.id;
            return (
              <div
                key={trace.id}
                onClick={() => setSelectedSpan(trace.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-neutral-800/90 light:bg-indigo-50/70 border-indigo-500/80'
                    : 'bg-neutral-950/60 light:bg-neutral-50 border-neutral-800/80 light:border-neutral-200 hover:border-neutral-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                      trace.status === 200 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {trace.status}
                    </span>
                    <span className="font-mono-code font-semibold text-neutral-200 light:text-neutral-800">
                      {trace.endpoint}
                    </span>
                    <span className="text-neutral-500 font-mono-code text-[11px]">({trace.service})</span>
                  </div>
                  <div className="font-mono-code font-bold text-neutral-300 light:text-neutral-700">
                    {trace.duration}
                  </div>
                </div>

                {/* Micro waterfall progress bar */}
                <div className="mt-2.5 h-2 w-full bg-neutral-900 light:bg-neutral-200 rounded-full flex overflow-hidden">
                  {trace.breakdown.map((seg, i) => (
                    <div
                      key={i}
                      style={{ width: `${seg.pct}%` }}
                      className={`${seg.color} transition-all duration-300`}
                      title={`${seg.name}: ${seg.time}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Span Detail Breakdown */}
        {currentSpan && (
          <div className="p-3.5 rounded-lg bg-neutral-950 light:bg-neutral-100/80 border border-neutral-800 light:border-neutral-200 space-y-2.5">
            <div className="text-xs font-semibold text-neutral-300 light:text-neutral-700 flex items-center justify-between">
              <span>Detailed Span Latency Profile: {currentSpan.endpoint}</span>
              <span className="font-mono-code text-indigo-400 font-bold">{currentSpan.duration}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentSpan.breakdown.map((seg, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-neutral-900 light:bg-white border border-neutral-800/80 light:border-neutral-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${seg.color}`} />
                    <span className="text-neutral-300 light:text-neutral-700 truncate max-w-[170px]">
                      {seg.name}
                    </span>
                  </div>
                  <span className="font-mono-code font-semibold text-neutral-200 light:text-neutral-900">
                    {seg.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   2. Nexus Spatial Workspace Interactive Demo
   ------------------------------------------------------------- */
function NexusCanvasDemo() {
  const [nodes, setNodes] = useState([
    { id: '1', title: 'API Gateway (Kong)', x: 40, y: 30, type: 'gateway' },
    { id: '2', title: 'Auth Service (Go)', x: 260, y: 30, type: 'service' },
    { id: '3', title: 'Order Orchestrator', x: 260, y: 150, type: 'service' },
    { id: '4', title: 'Postgres Primary DB', x: 480, y: 30, type: 'database' },
    { id: '5', title: 'Redis Cache Cluster', x: 480, y: 150, type: 'cache' },
  ]);

  const [activeCursor, setActiveCursor] = useState({ x: 320, y: 80, name: 'Sarah (Staff Eng)' });
  const [collaboratorActive, setCollaboratorActive] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Animate mock collaborator cursor
  useEffect(() => {
    if (!collaboratorActive) return;
    const interval = setInterval(() => {
      setActiveCursor((prev) => ({
        ...prev,
        x: Math.max(80, Math.min(500, prev.x + (Math.random() - 0.5) * 60)),
        y: Math.max(40, Math.min(200, prev.y + (Math.random() - 0.5) * 40)),
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, [collaboratorActive]);

  const addCustomNode = () => {
    const newNode = {
      id: String(Date.now()),
      title: `Worker Pod #${nodes.length + 1}`,
      x: 100 + (nodes.length % 3) * 120,
      y: 180 + (nodes.length % 2) * 50,
      type: 'worker',
    };
    setNodes([...nodes, newNode]);
  };

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(10, Math.min(rect.width - 150, e.clientX - rect.left - 60));
    const y = Math.max(10, Math.min(rect.height - 60, e.clientY - rect.top - 20));

    setNodes((prev) =>
      prev.map((n) => (n.id === draggingId ? { ...n, x, y } : n))
    );
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Canvas Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200">
        <div className="flex items-center gap-2">
          <button
            onClick={addCustomNode}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service Node</span>
          </button>

          <button
            onClick={() => setCollaboratorActive(!collaboratorActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              collaboratorActive
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-neutral-800 light:bg-neutral-200 border-transparent text-neutral-400'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{collaboratorActive ? 'Sync Active (2 Peers)' : 'Collaboration Paused'}</span>
          </button>
        </div>

        <div className="text-xs text-neutral-400 flex items-center gap-2">
          <span className="font-mono-code font-bold text-indigo-400">Yjs CRDT 60 FPS</span>
          <span className="hidden sm:inline">· Drag cards to rearrange architecture</span>
        </div>
      </div>

      {/* Infinite Canvas Viewport */}
      <div
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleDragEnd}
        className="relative h-[360px] w-full rounded-2xl bg-neutral-950 light:bg-neutral-100 border border-neutral-800 light:border-neutral-300 overflow-hidden select-none cursor-crosshair shadow-inner"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Node connections (SVG cables) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="120" y1="60" x2="260" y2="60" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="340" y1="60" x2="480" y2="60" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" />
          <line x1="340" y1="180" x2="480" y2="180" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" />
          <line x1="300" y1="75" x2="300" y2="150" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Dynamic Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            onMouseDown={() => handleDragStart(node.id)}
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
            className={`absolute p-3 rounded-xl border bg-neutral-900/90 light:bg-white cursor-grab active:cursor-grabbing shadow-lg transition-shadow hover:shadow-indigo-500/10 ${
              draggingId === node.id
                ? 'border-indigo-400 ring-2 ring-indigo-500/20 z-20'
                : 'border-neutral-700/80 light:border-neutral-300 z-10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                node.type === 'gateway' ? 'bg-amber-400' :
                node.type === 'database' ? 'bg-emerald-400' :
                node.type === 'cache' ? 'bg-rose-400' : 'bg-indigo-400'
              }`} />
              <div className="text-xs font-bold text-neutral-100 light:text-neutral-900 font-display">
                {node.title}
              </div>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono-code mt-1 flex items-center justify-between gap-4">
              <span>status: healthy</span>
              <span>12ms</span>
            </div>
          </div>
        ))}

        {/* Simulated Peer Teammate Cursor */}
        {collaboratorActive && (
          <div
            style={{
              transform: `translate3d(${activeCursor.x}px, ${activeCursor.y}px, 0)`,
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute pointer-events-none z-30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-amber-400 drop-shadow">
              <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="#F59E0B" stroke="#000" strokeWidth="1" />
            </svg>
            <span className="ml-3 -mt-1 inline-block px-1.5 py-0.5 rounded bg-amber-500 text-neutral-950 font-semibold text-[10px] whitespace-nowrap shadow">
              {activeCursor.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   3. Aura Wealth & FinTech Interactive Demo
   ------------------------------------------------------------- */
function AuraWealthDemo() {
  const [portfolioValue, setPortfolioValue] = useState(250000);
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'balanced' | 'growth'>('balanced');
  const [isRebalanced, setIsRebalanced] = useState(false);
  const [taxAlphaSaved, setTaxAlphaSaved] = useState(4820);

  const allocations = {
    conservative: { equities: 30, bonds: 55, cash: 10, commodities: 5 },
    balanced: { equities: 60, bonds: 25, cash: 5, commodities: 10 },
    growth: { equities: 80, bonds: 10, cash: 5, commodities: 5 },
  };

  const currentAlloc = allocations[riskProfile];

  const handleRebalance = () => {
    setIsRebalanced(true);
    setTaxAlphaSaved((prev) => prev + Math.floor(portfolioValue * 0.008));
    setTimeout(() => setIsRebalanced(false), 2400);
  };

  return (
    <div className="space-y-5">
      {/* Portfolio Config Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200">
        <div className="space-y-1.5 sm:col-span-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-medium">Portfolio Capital Under Management</span>
            <span className="font-mono-code font-bold text-neutral-100 light:text-neutral-900">
              ${portfolioValue.toLocaleString()} USD
            </span>
          </div>
          <input
            type="range"
            min="25000"
            max="1000000"
            step="25000"
            value={portfolioValue}
            onChange={(e) => setPortfolioValue(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-neutral-400 font-medium">Mandate Strategy</label>
          <div className="flex rounded-lg bg-neutral-950 light:bg-neutral-100 p-1 border border-neutral-800 light:border-neutral-200">
            {(['conservative', 'balanced', 'growth'] as const).map((strat) => (
              <button
                key={strat}
                onClick={() => setRiskProfile(strat)}
                className={`flex-1 py-1 text-[11px] font-semibold capitalize rounded transition-all ${
                  riskProfile === strat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 light:hover:text-neutral-900'
                }`}
              >
                {strat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Breakdown Visual Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400">Global Equities</div>
          <div className="text-lg font-bold font-mono-code text-indigo-400 light:text-indigo-600 tabular-nums">
            {currentAlloc.equities}%
          </div>
          <div className="text-xs text-neutral-400 font-mono-code mt-0.5">
            ${((portfolioValue * currentAlloc.equities) / 100).toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400">Fixed Income (Bonds)</div>
          <div className="text-lg font-bold font-mono-code text-sky-400 tabular-nums">
            {currentAlloc.bonds}%
          </div>
          <div className="text-xs text-neutral-400 font-mono-code mt-0.5">
            ${((portfolioValue * currentAlloc.bonds) / 100).toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400">Commodities / Gold</div>
          <div className="text-lg font-bold font-mono-code text-amber-400 tabular-nums">
            {currentAlloc.commodities}%
          </div>
          <div className="text-xs text-neutral-400 font-mono-code mt-0.5">
            ${((portfolioValue * currentAlloc.commodities) / 100).toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900/80 light:bg-white border border-neutral-800 light:border-neutral-200">
          <div className="text-[11px] text-neutral-400">Liquid Cash Reserves</div>
          <div className="text-lg font-bold font-mono-code text-emerald-400 tabular-nums">
            {currentAlloc.cash}%
          </div>
          <div className="text-xs text-neutral-400 font-mono-code mt-0.5">
            ${((portfolioValue * currentAlloc.cash) / 100).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Algorithmic Engine Trigger */}
      <div className="p-5 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800 light:border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-neutral-100 light:text-neutral-900 font-display flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Automated Tax-Loss Harvesting Alpha</span>
          </div>
          <p className="text-xs text-neutral-400 light:text-neutral-600 mt-1">
            Simulated annual tax optimization alpha generated: <strong className="text-emerald-400 font-mono-code">${taxAlphaSaved.toLocaleString()}</strong>
          </p>
        </div>

        <button
          onClick={handleRebalance}
          disabled={isRebalanced}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all whitespace-nowrap"
        >
          {isRebalanced ? 'Executing Rebalance Orders...' : 'Run Algorithmic Rebalance'}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   4. HyperCore ORM Interactive Demo
   ------------------------------------------------------------- */
function HyperCoreDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState('join');
  const [compiled, setCompiled] = useState(true);

  const templates: Record<string, { query: string; compiledSql: string; timing: string; size: string }> = {
    join: {
      query: `const query = db.from('users')\n  .innerJoin('orders', 'users.id', 'orders.user_id')\n  .where('orders.status', '=', 'completed')\n  .select(['users.id', 'users.email', 'orders.total_cents'])\n  .compile();`,
      compiledSql: `SELECT "users"."id", "users"."email", "orders"."total_cents"\nFROM "users"\nINNER JOIN "orders" ON "users"."id" = "orders"."user_id"\nWHERE "orders"."status" = $1;`,
      timing: '0.18 ms',
      size: '0 bytes (Compiled AST)',
    },
    aggregation: {
      query: `const query = db.from('metrics')\n  .groupBy('service_name')\n  .where('timestamp', '>', new Date(Date.now() - 3600000))\n  .select(['service_name', db.fn.avg('latency_ms').as('avg_latency')])\n  .compile();`,
      compiledSql: `SELECT "service_name", AVG("latency_ms") AS "avg_latency"\nFROM "metrics"\nWHERE "timestamp" > $1\nGROUP BY "service_name";`,
      timing: '0.24 ms',
      size: '0 bytes (Zero-overhead macro)',
    },
  };

  const active = templates[selectedTemplate];

  return (
    <div className="space-y-4">
      {/* Template Selectors */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200">
        <span className="text-xs text-neutral-400 font-medium px-2">Example Query:</span>
        <button
          onClick={() => setSelectedTemplate('join')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
            selectedTemplate === 'join' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Inner Join & Filter
        </button>
        <button
          onClick={() => setSelectedTemplate('aggregation')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
            selectedTemplate === 'aggregation' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Time-Series Aggregation
        </button>
      </div>

      {/* Editor & Compiler Output Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source TypeScript Query */}
        <div className="p-4 rounded-xl bg-neutral-950 light:bg-neutral-900 text-neutral-100 border border-neutral-800 font-mono-code text-xs space-y-2">
          <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans font-semibold">
            TypeScript Type-Safe Source Code
          </div>
          <pre className="text-indigo-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">{active.query}</pre>
        </div>

        {/* Compiled SQL Output */}
        <div className="p-4 rounded-xl bg-neutral-950 light:bg-neutral-900 text-neutral-100 border border-neutral-800 font-mono-code text-xs space-y-2">
          <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans font-semibold flex items-center justify-between">
            <span>Compiled Immutable SQL Statement</span>
            <span className="text-emerald-400 text-[10px]">Verified Safe AST</span>
          </div>
          <pre className="text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">{active.compiledSql}</pre>
        </div>
      </div>

      {/* Benchmark Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800 light:border-neutral-200 text-center">
          <div className="text-[11px] text-neutral-400">Compilation Latency</div>
          <div className="text-sm font-bold font-mono-code text-indigo-400">{active.timing}</div>
        </div>
        <div className="p-3 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800 light:border-neutral-200 text-center">
          <div className="text-[11px] text-neutral-400">Runtime Client Overhead</div>
          <div className="text-sm font-bold font-mono-code text-emerald-400">0 KB (Edge Ready)</div>
        </div>
        <div className="p-3 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800 light:border-neutral-200 text-center">
          <div className="text-[11px] text-neutral-400">Prepared Cache</div>
          <div className="text-sm font-bold font-mono-code text-neutral-200 light:text-neutral-800">100% Hit Rate</div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   5. Pulse Distributed Health Tracker Demo
   ------------------------------------------------------------- */
function PulseVitalsDemo() {
  const [isOnline, setIsOnline] = useState(false);
  const [records, setRecords] = useState([
    { id: '1', type: 'Resting Heart Rate', val: '58 bpm', state: 'Synced', time: '10:14 AM' },
    { id: '2', type: 'Deep Sleep Stage', val: '2h 14m', state: 'Synced', time: '07:30 AM' },
  ]);
  const [newVal, setNewVal] = useState('62');

  const addOfflineRecord = () => {
    const item = {
      id: String(Date.now()),
      type: 'Biometric HRV Log',
      val: `${newVal} ms`,
      state: isOnline ? 'Synced' : 'Buffered Locally (CRDT)',
      time: 'Just now',
    };
    setRecords([item, ...records]);
  };

  const triggerSync = () => {
    setRecords((prev) => prev.map((r) => ({ ...r, state: 'Synced' })));
  };

  return (
    <div className="space-y-4">
      {/* Network Connectivity Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              isOnline
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>Network: {isOnline ? 'Online (Connected)' : 'Offline (Airplane Mode)'}</span>
          </button>

          {!isOnline && (
            <span className="text-xs text-neutral-400">Testing offline CRDT data buffer</span>
          )}
        </div>

        <button
          onClick={triggerSync}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Synchronize Peer State</span>
        </button>
      </div>

      {/* Record Logger */}
      <div className="p-4 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800 light:border-neutral-200 flex items-center gap-3">
        <input
          type="number"
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          placeholder="Value (ms or bpm)"
          className="px-3 py-1.5 text-xs rounded-lg bg-neutral-950 light:bg-neutral-100 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 w-32"
        />
        <button
          onClick={addOfflineRecord}
          className="px-3 py-1.5 rounded-lg bg-neutral-800 light:bg-neutral-200 text-neutral-200 light:text-neutral-800 text-xs font-semibold hover:bg-neutral-700"
        >
          Log Biometric Sample
        </button>
      </div>

      {/* Synchronized State List */}
      <div className="space-y-2">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="p-3 rounded-lg bg-neutral-950/60 light:bg-white border border-neutral-800 light:border-neutral-200 flex items-center justify-between text-xs"
          >
            <div>
              <span className="font-semibold text-neutral-200 light:text-neutral-800">{rec.type}</span>
              <span className="text-neutral-500 ml-2 font-mono-code">{rec.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono-code font-bold text-indigo-400">{rec.val}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code ${
                rec.state === 'Synced' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {rec.state}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Generic Fallback Demo */
function GenericProjectDemo({ project }: { project: Project }) {
  return (
    <div className="space-y-4 p-4 text-center">
      <h3 className="text-lg font-bold font-display">{project.title} Live Sandbox</h3>
      <p className="text-xs text-neutral-400 max-w-md mx-auto">{project.overview}</p>
      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 max-w-lg mx-auto">
        <div className="font-mono-code text-xs text-indigo-400">All systems operational</div>
      </div>
    </div>
  );
}
