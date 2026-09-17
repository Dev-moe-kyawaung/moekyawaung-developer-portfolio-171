"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectCaseStudy } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  Layers, 
  Sparkles, 
  Activity, 
  GitBranch, 
  ExternalLink, 
  Flame, 
  Eye, 
  ArrowUpRight, 
  Filter, 
  Cpu, 
  Terminal 
} from "lucide-react";

interface ProjectMatrixProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
  endorsements: Record<string, { pulses: number; views: number; bookmarks: number }>;
}

export default function ProjectMatrix({ onSelectProject, endorsements }: ProjectMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Enterprise System",
    "Media Engine",
    "PWA & Mobile",
    "Gaming & Physics",
    "FinTech"
  ];

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-12 lg:py-16 border-b border-cyan-500/20 relative holo-dots-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/40">
                Orbital Nodes Matrix
              </span>
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {PROJECTS.length} Systems Deployed
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white tracking-wide">
              HOLOGRAPHIC PROJECT NODES
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Each orbital node represents a production-grade architecture complete with multi-tier case studies, live code blueprints, and benchmark telemetry.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-cyan-500/20">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    holoAudio.playNodeHover();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm"
                      : "text-slate-400 hover:text-cyan-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const stats = endorsements[proj.id] || { pulses: 120, views: 1450, bookmarks: 45 };

            return (
              <div
                key={proj.id}
                className="group relative rounded-2xl overflow-hidden holo-panel border border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Top Image Preview & Hologram Badges */}
                <div className="relative aspect-video overflow-hidden bg-slate-900 border-b border-cyan-500/20">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="holo-scanlines absolute inset-0 pointer-events-none opacity-40" />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/85 text-cyan-300 border border-cyan-500/40">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/85 text-emerald-400 border border-emerald-500/40">
                      {proj.status}
                    </span>
                  </div>

                  {/* 3D Coordinates Overlay */}
                  <div className="absolute bottom-2 left-2 text-[9px] font-mono text-cyan-400/80 bg-slate-950/80 px-1.5 py-0.5 rounded">
                    XYZ: [{proj.sphereCoords.join(", ")}]
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {proj.tagline}
                    </p>
                  </div>

                  {/* Primary Metric Pill */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 font-mono text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">{proj.metrics[0].label}</span>
                      <span className="text-cyan-300 font-bold">{proj.metrics[0].value}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">{proj.metrics[1]?.label || "Engine"}</span>
                      <span className="text-purple-300 font-bold">{proj.metrics[1]?.value || "Next.js"}</span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1">
                    {proj.architectureLayers
                      .flatMap((l) => l.tech)
                      .slice(0, 3)
                      .map((tech, tidx) => (
                        <span
                          key={tidx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>

                  {/* Telemetry & Action Footer */}
                  <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Eye className="w-3 h-3" />
                        <span>{stats.views}</span>
                      </span>
                      <span className="flex items-center gap-1 text-purple-400">
                        <Flame className="w-3 h-3" />
                        <span>{stats.pulses}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        holoAudio.playNodeSelect();
                        onSelectProject(proj);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 hover:text-white border border-cyan-400/40 text-xs font-mono font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
