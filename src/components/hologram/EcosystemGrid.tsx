"use client";

import React from "react";
import { USER_BIO } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  GitBranch, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  Smartphone, 
  Globe, 
  Layers, 
  Star, 
  ShieldCheck, 
  PhoneCall, 
  Play 
} from "lucide-react";

export default function EcosystemGrid() {
  return (
    <section className="py-12 lg:py-16 border-b border-cyan-500/20 relative holo-dots-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/40">
                Network Topology
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                40+ Active Repositories
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white tracking-wide">
              GLOBAL ECOSYSTEM & DEPLOYMENTS
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Production web applications, AI tools, and code repositories architected by Moe Kyaw Aung across GitHub and Lovable PWA ecosystems.
            </p>
          </div>

          <a
            href={USER_BIO.githubMain}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/50 text-xs font-mono flex items-center gap-2 self-start md:self-auto transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            <span>Open GitHub Main Hub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Lovable Apps Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Lovable PWA & AI App Network</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">Instant Launch Targets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {USER_BIO.lovableApps.map((app, idx) => (
              <a
                key={idx}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => holoAudio.playNodeSelect()}
                className="group p-4 rounded-xl holo-panel border border-cyan-500/20 hover:border-cyan-400/60 transition-all hover:-translate-y-1 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                      {app.tag}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {app.name}
                  </h4>
                </div>

                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {app.url.replace("https://", "")}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* GitHub Hub Matrix */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>Core GitHub Architecture Repositories</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">MKA Distributed Hubs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USER_BIO.githubEcosystem.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => holoAudio.playNodeHover()}
                className="group p-4 rounded-xl holo-panel-purple border border-purple-500/20 hover:border-purple-400/60 transition-all hover:-translate-y-1 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-white group-hover:text-purple-300 transition-colors">
                    {repo.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
                    {repo.url.replace("https://", "")}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-yellow-400 bg-slate-950 px-2 py-1 rounded border border-purple-500/30">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  <span>{repo.stars}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
