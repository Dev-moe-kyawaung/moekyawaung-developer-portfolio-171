"use client";

import React, { useState, useEffect } from "react";
import { ProjectCaseStudy } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  Layers,
  Code2,
  Activity,
  ExternalLink,
  GitBranch,
  Copy,
  Check,
  Heart,
  TrendingUp,
  Cpu,
  Database,
  Terminal,
  ShieldCheck,
  Share2,
  Flame
} from "lucide-react";

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  endorsements: Record<string, { pulses: number; views: number; bookmarks: number }>;
  onUpdateEndorsement: (projectId: string, action: "pulse" | "bookmark") => void;
}

export default function CaseStudyModal({
  project,
  onClose,
  endorsements,
  onUpdateEndorsement
}: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "blueprint" | "benchmarks">("overview");
  const [copied, setCopied] = useState<boolean>(false);
  const [hasPulsed, setHasPulsed] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentStats = endorsements[project.id] || { pulses: 145, views: 1890, bookmarks: 42 };

  const handleCopyCode = () => {
    if (project.codeBlueprint) {
      navigator.clipboard.writeText(project.codeBlueprint.code);
      setCopied(true);
      holoAudio.playNodeHover();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePulse = () => {
    setHasPulsed(true);
    holoAudio.playPulseEndorse();
    onUpdateEndorsement(project.id, "pulse");

    // Holographic confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#00f3ff", "#a855f7", "#10b981", "#fbbf24"]
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 overflow-hidden">
        
        {/* Top Hologram Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/30 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {project.status}
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-bold font-mono text-white tracking-wide">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              holoAudio.playNodeSelect();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-cyan-500/20 bg-slate-900/30 overflow-x-auto">
          <button
            onClick={() => {
              holoAudio.playNodeHover();
              setActiveTab("overview");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === "overview"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "text-slate-400 hover:text-cyan-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview & Specs</span>
          </button>

          <button
            onClick={() => {
              holoAudio.playNodeHover();
              setActiveTab("architecture");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === "architecture"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "text-slate-400 hover:text-cyan-300"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture Layers</span>
          </button>

          {project.codeBlueprint && (
            <button
              onClick={() => {
                holoAudio.playNodeHover();
                setActiveTab("blueprint");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === "blueprint"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/50"
                  : "text-slate-400 hover:text-purple-300"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Blueprint</span>
            </button>
          )}

          <button
            onClick={() => {
              holoAudio.playNodeHover();
              setActiveTab("benchmarks");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === "benchmarks"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50"
                : "text-slate-400 hover:text-emerald-300"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Benchmarks & Demos</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Media Preview & Tagline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-900 group">
                    {project.videoPreview && isVideoPlaying ? (
                      <video
                        src={project.videoPreview}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        onError={() => setIsVideoPlaying(false)}
                      />
                    ) : (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="holo-scanlines absolute inset-0 pointer-events-none opacity-40" />
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* Right Metrics Grid */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="holo-panel p-4 rounded-xl border border-cyan-500/30 space-y-3">
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>Telemetry Benchmarks</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                          <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">{m.value}</div>
                          {m.change && (
                            <div className="text-[9px] font-mono text-emerald-400">{m.change}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Card */}
                  <div className="holo-panel-purple p-4 rounded-xl border border-purple-500/30 space-y-2">
                    <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                      Technical Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {project.technicalHighlights.map((hl, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-purple-400 font-mono mt-0.5">▸</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Challenges & Solution Matrix */}
              <div className="holo-panel p-5 rounded-xl border border-cyan-500/20 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Architectural Challenges Overcome
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.challenges.map((ch, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono text-[10px] shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="text-xs text-slate-300">{ch}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE LAYERS */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-slate-400">
                Multi-Tier Holographic Pipeline for <span className="text-cyan-300 font-bold">{project.title}</span>
              </div>

              <div className="space-y-4">
                {project.architectureLayers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="holo-panel p-4 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-mono text-xs font-bold">
                          L{idx + 1}
                        </span>
                        <h4 className="text-sm font-mono font-bold text-white tracking-wide">
                          {layer.layer}
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {layer.tech.map((t, tidx) => (
                          <span
                            key={tidx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-cyan-500/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 pl-8 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CODE BLUEPRINT */}
          {activeTab === "blueprint" && project.codeBlueprint && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>{project.codeBlueprint.filename}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400 uppercase">{project.codeBlueprint.language}</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied Blueprint" : "Copy Code"}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                <pre className="overflow-x-auto leading-relaxed">
                  <code>{project.codeBlueprint.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: BENCHMARKS & LIVE DEMOS */}
          {activeTab === "benchmarks" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.liveDemos.map((demo, idx) => (
                  <div
                    key={idx}
                    className="holo-panel p-4 rounded-xl border border-emerald-500/30 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        {demo.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        {demo.description}
                      </p>
                    </div>

                    <a
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs border border-emerald-500/40 flex items-center justify-between transition-colors"
                    >
                      <span>{demo.actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>

              <div className="holo-panel p-5 rounded-xl border border-cyan-500/20 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Global Repositories & Cloud Endpoints
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2 transition-colors"
                  >
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                    <span>View GitHub Repository</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live App Target</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer with Realtime Pulse Endorsement */}
        <div className="px-6 py-4 border-t border-cyan-500/30 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1 text-cyan-300">
              <Activity className="w-3.5 h-3.5" />
              <span>{currentStats.views} Views</span>
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <Flame className="w-3.5 h-3.5" />
              <span>{currentStats.pulses} Endorsement Pulses</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePulse}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all active:scale-95 ${
                hasPulsed
                  ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/50"
                  : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasPulsed ? "fill-emerald-400 text-emerald-400" : ""}`} />
              <span>{hasPulsed ? "Endorsed (+1 Pulse)" : "Pulse Endorsement"}</span>
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
            >
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
