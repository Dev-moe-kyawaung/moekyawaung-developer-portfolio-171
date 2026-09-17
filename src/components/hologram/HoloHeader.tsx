"use client";

import React, { useState, useEffect } from "react";
import { USER_BIO } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { Volume2, VolumeX, Radio, Sparkles, Terminal, Layers, Cpu, Globe, Phone, ExternalLink } from "lucide-react";

interface HoloHeaderProps {
  activeTab: "sphere" | "architecture" | "ai-nexus" | "projects" | "transmission" | "ecosystem";
  setActiveTab: (tab: "sphere" | "architecture" | "ai-nexus" | "projects" | "transmission" | "ecosystem") => void;
  onOpenAi: () => void;
}

export default function HoloHeader({ activeTab, setActiveTab, onOpenAi }: HoloHeaderProps) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    setIsMuted(holoAudio.getMuted());
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) +
          " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const muted = holoAudio.toggleMute();
    setIsMuted(muted);
  };

  const navItems: { id: "sphere" | "architecture" | "ai-nexus" | "projects" | "transmission" | "ecosystem"; label: string; icon: React.ReactNode }[] = [
    { id: "sphere", label: "3D Omni-Sphere", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "projects", label: "Project Nodes", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "architecture", label: "Architecture Core", icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "ai-nexus", label: "AI Hologram", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "transmission", label: "Transmissions", icon: <Radio className="w-3.5 h-3.5" /> },
    { id: "ecosystem", label: "Ecosystem & Apps", icon: <Terminal className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-cyan-400/50 shadow-lg shadow-cyan-500/20 bg-cyan-950/40 p-0.5">
              <img
                src={USER_BIO.avatarUrl}
                alt={USER_BIO.name}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = USER_BIO.secondaryAvatars[0];
                }}
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm sm:text-base text-cyan-300 tracking-wider">
                OMNI-SPHERE
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 rounded">
                MKA-v3.8
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 truncate max-w-[160px] sm:max-w-xs">
              {USER_BIO.name} • Senior Architect
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-cyan-500/20">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  holoAudio.playNodeSelect();
                  setActiveTab(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                    : "text-slate-400 hover:text-cyan-300 hover:bg-slate-800/40"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right HUD Controls: Audio Synthesizer, Time, Gravatar Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Real-time Quantum Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-cyan-500/20 rounded font-mono text-[11px] text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            {timeString || "00:00:00 UTC"}
          </div>

          {/* Hologram Audio FX Synthesizer Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
              !isMuted
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                : "bg-slate-900/80 text-slate-400 border-slate-700 hover:text-cyan-400"
            }`}
            title={!isMuted ? "Audio Synthesizer: ACTIVE" : "Audio Synthesizer: MUTED (Click to Enable)"}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline text-[10px]">{!isMuted ? "SYNTH ON" : "MUTED"}</span>
          </button>

          {/* Gravatar Profile Trigger */}
          <a
            href={USER_BIO.gravatarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 rounded-lg text-purple-300 hover:text-purple-100 text-xs font-mono transition-all"
          >
            <span>Gravatar</span>
            <ExternalLink className="w-3 h-3 text-purple-400" />
          </a>

          {/* Fast AI Summon Button */}
          <button
            onClick={() => {
              holoAudio.playHoloActivate();
              onOpenAi();
            }}
            className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30 hover:from-cyan-500/50 hover:to-purple-500/50 border border-cyan-400/60 rounded-lg text-cyan-200 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            <span className="hidden sm:inline">AETHERIS AI</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-cyan-500/10 no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                holoAudio.playNodeSelect();
                setActiveTab(item.id);
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1 whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                  : "text-slate-400 hover:text-cyan-300"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
