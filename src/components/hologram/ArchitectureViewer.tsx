"use client";

import React, { useState } from "react";
import { ARCHITECTURE_TIERS, ArchitectureNode } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  Cpu, 
  Layers, 
  Database, 
  Sparkles, 
  Activity, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Network, 
  ShieldAlert, 
  Share2 
} from "lucide-react";

interface ArchitectureViewerProps {
  onFocusNodeIn3D: (nodeId: string) => void;
  onAskAiAboutNode: (topic: string) => void;
}

export default function ArchitectureViewer({
  onFocusNodeIn3D,
  onAskAiAboutNode
}: ArchitectureViewerProps) {
  const [selectedTier, setSelectedTier] = useState<ArchitectureNode>(ARCHITECTURE_TIERS[0]);

  const handleSelectTier = (tier: ArchitectureNode) => {
    setSelectedTier(tier);
    holoAudio.playNodeSelect();
    onFocusNodeIn3D(tier.id);
  };

  return (
    <section className="py-12 lg:py-16 border-b border-cyan-500/20 relative holo-dots-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/40">
                System Topology
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Zero Latency Flow
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white tracking-wide">
              FULL ARCHITECTURE DEEP DIVE
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Next.js 16 + React 19 + Three.js WebGL Engine paired with PostgreSQL via Drizzle ORM and high-throughput edge event brokers.
            </p>
          </div>

          <button
            onClick={() => {
              holoAudio.playHoloActivate();
              onAskAiAboutNode("Explain the full system architecture");
            }}
            className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/50 text-xs font-mono flex items-center gap-2 self-start md:self-auto transition-colors shadow-md shadow-purple-500/20"
          >
            <Sparkles className="w-4 h-4 text-purple-300 animate-spin" />
            <span>AI Architecture Walkthrough</span>
          </button>
        </div>

        {/* 5-Tier Interactive Nodes Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Interactive Tier List */}
          <div className="lg:col-span-5 space-y-3">
            {ARCHITECTURE_TIERS.map((tier, idx) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => handleSelectTier(tier)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? "holo-panel-purple border-purple-400/80 shadow-lg shadow-purple-500/20 translate-x-1.5"
                      : "holo-panel border-cyan-500/20 hover:border-cyan-400/50 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected ? "bg-purple-500/30 text-purple-200 border border-purple-400/50" : "bg-cyan-950/60 text-cyan-300 border border-cyan-500/30"
                      }`}>
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-mono font-bold text-white">
                          {tier.name}
                        </div>
                        <div className="text-[10px] font-mono text-cyan-400">
                          {tier.type}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/30">
                      {tier.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-300 line-clamp-2 pl-9">
                    {tier.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Tier Deep Blueprint & Telemetry */}
          <div className="lg:col-span-7">
            <div className="holo-panel p-6 rounded-2xl border border-cyan-400/40 bg-slate-950/90 shadow-2xl space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-cyan-400">
                    Active Architecture Target
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    {selectedTier.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      holoAudio.playNodeHover();
                      onFocusNodeIn3D(selectedTier.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Focus in 3D Canvas</span>
                  </button>

                  <button
                    onClick={() => {
                      holoAudio.playHoloActivate();
                      onAskAiAboutNode(`Explain ${selectedTier.name} in deep architectural detail`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 border border-purple-400/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explain Tier</span>
                  </button>
                </div>
              </div>

              {/* Description & Technical Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Tier Specification
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedTier.description}
                </p>
              </div>

              {/* Integrated Technologies Pills */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Integrated Technologies & Protocols
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTier.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Telemetry & Signal Flow Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Throughput Bandwidth</div>
                  <div className="text-base font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    {selectedTier.throughput}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Mesh Topologies</div>
                  <div className="text-base font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <Network className="w-4 h-4" />
                    {selectedTier.connections.length} Connected Relays
                  </div>
                </div>
              </div>

              {/* Live Signal Pathway Diagram */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-cyan-400">
                  <span>DATA FLOW PIPELINE</span>
                  <span className="text-emerald-400">ACTIVE RELAY</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto py-2">
                  <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[11px] whitespace-nowrap">
                    CLIENT VIEW
                  </span>
                  <span className="text-cyan-400 font-bold">&rarr;</span>
                  <span className="px-2 py-1 rounded bg-purple-950 text-purple-300 border border-purple-500/40 text-[11px] whitespace-nowrap">
                    WEBGL 3D SHADER
                  </span>
                  <span className="text-purple-400 font-bold">&rarr;</span>
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[11px] whitespace-nowrap">
                    POSTGRESQL DRIZZLE
                  </span>
                  <span className="text-emerald-400 font-bold">&rarr;</span>
                  <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[11px] whitespace-nowrap">
                    AETHERIS AI AGENT
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
