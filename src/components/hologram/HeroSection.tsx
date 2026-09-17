"use client";

import React, { useState } from "react";
import { USER_BIO } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  PhoneCall, 
  GitBranch, 
  ArrowRight, 
  Activity, 
  Radio, 
  Code2, 
  Play, 
  ExternalLink 
} from "lucide-react";

interface HeroSectionProps {
  onExploreSphere: () => void;
  onExploreArchitecture: () => void;
  onOpenAi: () => void;
  onOpenTransmissions: () => void;
}

export default function HeroSection({
  onExploreSphere,
  onExploreArchitecture,
  onOpenAi,
  onOpenTransmissions
}: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  return (
    <section className="relative overflow-hidden py-12 lg:py-20 border-b border-cyan-500/20 holo-grid-bg">
      {/* Background Volumetric Ambient Glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Copywriting & System Specs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Clearance Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/40 shadow-sm shadow-cyan-500/20 text-xs font-mono text-cyan-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-400 font-semibold">// CLEARANCE LEVEL 05</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-200">HOLOGRAPHIC ARCHITECTURE 2026</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-mono leading-none">
                <span className="block text-slate-100">OMNI-SPHERE</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent holo-glow-cyan">
                  HOLOGRAPHIC CORE
                </span>
              </h1>
              <p className="text-sm sm:text-base font-mono text-cyan-200/90 tracking-wide">
                Architected by <span className="text-white font-bold">{USER_BIO.name}</span> ({USER_BIO.alias})
              </p>
            </div>

            {/* Subtitle / Bio Pitch */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
              Engineering high-concurrency <span className="text-cyan-300 font-mono font-medium">Distributed POS Systems</span>, 
              interactive <span className="text-purple-300 font-mono font-medium">WebGL 3D Holographic Canvas</span>, 
              and edge-native <span className="text-emerald-300 font-mono font-medium">Next.js & PostgreSQL</span> microservices. 
              Bridging mathematical precision with immersive spatial computing.
            </p>

            {/* Live Metrics Ribbons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="holo-panel p-3 rounded-lg border-cyan-500/30">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Experience</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-cyan-300 mt-0.5">{USER_BIO.yearsExperience}</div>
                <div className="text-[10px] text-emerald-400 font-mono">Senior Architect</div>
              </div>

              <div className="holo-panel p-3 rounded-lg border-cyan-500/30">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">TPS Ingestion</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-purple-300 mt-0.5">12.5k TPS</div>
                <div className="text-[10px] text-purple-400 font-mono">Realtime Ledger</div>
              </div>

              <div className="holo-panel p-3 rounded-lg border-cyan-500/30">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Deployed Apps</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-emerald-300 mt-0.5">{USER_BIO.totalDeployedApps}</div>
                <div className="text-[10px] text-emerald-400 font-mono">GitHub & Lovable</div>
              </div>

              <div className="holo-panel p-3 rounded-lg border-cyan-500/30">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">System Uptime</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-cyan-300 mt-0.5">{USER_BIO.systemUptime}</div>
                <div className="text-[10px] text-cyan-400 font-mono">High Availability</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  holoAudio.playNodeSelect();
                  onExploreSphere();
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-mono font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all active:scale-95"
              >
                <Layers className="w-4 h-4" />
                <span>Launch 3D Omni-Sphere</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  holoAudio.playHoloActivate();
                  onOpenAi();
                }}
                className="px-5 py-3 rounded-xl holo-panel-purple text-purple-200 hover:text-white font-mono font-semibold text-xs sm:text-sm border border-purple-500/50 hover:border-purple-400 shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                <span>Consult AETHERIS AI</span>
              </button>

              <button
                onClick={() => {
                  holoAudio.playNodeSelect();
                  onExploreArchitecture();
                }}
                className="px-4 py-3 rounded-xl holo-panel text-slate-300 hover:text-cyan-300 font-mono text-xs sm:text-sm border border-cyan-500/30 flex items-center gap-2 transition-all hover:bg-slate-900/90"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>System Specs</span>
              </button>
            </div>

            {/* Direct Contact & Verified Identity Hub */}
            <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Endpoints:</span>
              </span>

              <a
                href="tel:+959889000889"
                className="hover:text-cyan-300 flex items-center gap-1 bg-slate-900/60 px-2 py-1 rounded border border-slate-800"
              >
                <PhoneCall className="w-3 h-3 text-cyan-400" />
                <span>+95 9 889 000 889</span>
              </a>

              <a
                href="tel:+959666000050"
                className="hover:text-cyan-300 flex items-center gap-1 bg-slate-900/60 px-2 py-1 rounded border border-slate-800"
              >
                <PhoneCall className="w-3 h-3 text-cyan-400" />
                <span>+95 9 666 000 050</span>
              </a>

              <a
                href={USER_BIO.githubMain}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 flex items-center gap-1 bg-slate-900/60 px-2 py-1 rounded border border-slate-800"
              >
                <GitBranch className="w-3 h-3 text-purple-400" />
                <span>@Dev-moe-kyawaung</span>
              </a>
            </div>
          </div>

          {/* Right Column: Holographic Media Showcase & Gravatar Entity */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 bg-slate-950/90 p-3 group">
              
              {/* Corner HUD Brackets */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 z-20 pointer-events-none">
                [+] ARCH-NODE::01
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-400 z-20 pointer-events-none flex items-center gap-1">
                <Activity className="w-3 h-3 animate-pulse" />
                SIGNAL 99.8%
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-500 z-20 pointer-events-none">
                0x7F // GRAVATAR_SYNC
              </div>

              {/* Video / Graphic Display */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900/80 border border-cyan-500/20">
                {isVideoPlaying ? (
                  <video
                    src={USER_BIO.heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                    onError={() => setIsVideoPlaying(false)}
                  />
                ) : (
                  <img
                    src={USER_BIO.avatarUrl}
                    alt={USER_BIO.name}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                )}

                {/* Hologram Grid & Scanline FX */}
                <div className="holo-scanlines absolute inset-0 pointer-events-none opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Floating Gravatar Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={USER_BIO.avatarUrl}
                      alt={USER_BIO.name}
                      className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover"
                    />
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-100 flex items-center gap-1">
                        {USER_BIO.name}
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>
                      <div className="text-[10px] font-mono text-cyan-300">
                        Gravatar: @moekyawaung2026
                      </div>
                    </div>
                  </div>

                  <a
                    href={USER_BIO.gravatarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-[11px] font-mono bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/40 rounded flex items-center gap-1 transition-colors"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Secondary Avatar Nodes Strip */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                {USER_BIO.secondaryAvatars.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-900 group/thumb hover:border-cyan-400 transition-colors"
                  >
                    <img
                      src={imgUrl}
                      alt={`Holo Node ${idx + 1}`}
                      className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono bg-slate-950/80 text-cyan-400 px-1 rounded">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
