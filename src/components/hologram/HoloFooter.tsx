"use client";

import React from "react";
import { USER_BIO } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  GitBranch, 
  PhoneCall, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Radio 
} from "lucide-react";

export default function HoloFooter() {
  return (
    <footer className="w-full bg-slate-950 border-t border-cyan-500/20 py-12 relative overflow-hidden">
      {/* Ambient background grid */}
      <div className="holo-scanlines absolute inset-0 pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Identity & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-cyan-400/50 bg-slate-900 p-0.5">
                <img
                  src={USER_BIO.avatarUrl}
                  alt={USER_BIO.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h4 className="text-base font-bold font-mono text-white">
                  {USER_BIO.name}
                </h4>
                <p className="text-xs font-mono text-cyan-300">
                  {USER_BIO.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
              Specialized in high-concurrency enterprise POS architectures, WebGL streaming media pipelines, and full-stack PostgreSQL microservices.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-300">
              <a
                href="tel:+959889000889"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:text-cyan-300 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>+95 9 889 000 889</span>
              </a>

              <a
                href="tel:+959666000050"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:text-cyan-300 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>+95 9 666 000 050</span>
              </a>
            </div>
          </div>

          {/* Quick Hub Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-cyan-400 uppercase tracking-wider font-bold">
              // REPOSITORIES
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href={USER_BIO.githubMain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                  <span>@Dev-moe-kyawaung</span>
                </a>
              </li>
              <li>
                <a
                  href={USER_BIO.githubTech}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                  <span>@moekyawaung-tech</span>
                </a>
              </li>
              <li>
                <a
                  href={USER_BIO.githubCyber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                  <span>@Moekyawaung-cyber</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Gravatar & Network */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-purple-400 uppercase tracking-wider font-bold">
              // VERIFIED IDENTITY & GRAVATAR
            </div>
            <p className="text-slate-400 text-xs font-sans">
              Authenticated global profile connected through Gravatar and Lovable PWA networks.
            </p>
            <a
              href={USER_BIO.gravatarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 transition-colors"
            >
              <span>Gravatar: @moekyawaung2026</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Telemetry */}
        <div className="pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 {USER_BIO.name} • Omni-Sphere Holographic Architecture Engine
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Next.js 16 App Router
            </span>
            <span>•</span>
            <span className="text-purple-400">Three.js WebGL</span>
            <span>•</span>
            <span className="text-emerald-400">PostgreSQL + Drizzle</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
