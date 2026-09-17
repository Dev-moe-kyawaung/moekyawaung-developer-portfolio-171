"use client";

import React, { useState, useEffect } from "react";
import HoloHeader from "@/components/hologram/HoloHeader";
import HeroSection from "@/components/hologram/HeroSection";
import OmniSphereCanvas from "@/components/canvas/OmniSphereCanvas";
import ProjectMatrix from "@/components/hologram/ProjectMatrix";
import ArchitectureViewer from "@/components/hologram/ArchitectureViewer";
import AiHologramEntity from "@/components/hologram/AiHologramEntity";
import TransmissionTerminal from "@/components/hologram/TransmissionTerminal";
import EcosystemGrid from "@/components/hologram/EcosystemGrid";
import CaseStudyModal from "@/components/hologram/CaseStudyModal";
import HoloFooter from "@/components/hologram/HoloFooter";
import { PROJECTS, ProjectCaseStudy } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  Globe, 
  Sparkles, 
  Layers, 
  Cpu, 
  Radio, 
  Terminal, 
  Maximize2, 
  ArrowRight, 
  Compass, 
  Code2 
} from "lucide-react";

export default function HolographicPortfolioPage() {
  const [activeTab, setActiveTab] = useState<"sphere" | "architecture" | "ai-nexus" | "projects" | "transmission" | "ecosystem">("sphere");
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [activeFocusNode, setActiveFocusNode] = useState<string | null>(null);
  const [aiInitialQuery, setAiInitialQuery] = useState<string | null>(null);
  const [endorsements, setEndorsements] = useState<Record<string, { pulses: number; views: number; bookmarks: number }>>({});

  // Fetch live endorsements on mount
  useEffect(() => {
    fetchEndorsements();
  }, []);

  const fetchEndorsements = async () => {
    try {
      const res = await fetch("/api/projects/endorse");
      const data = await res.json();
      if (data.data) {
        setEndorsements(data.data);
      }
    } catch {
      // safe fallback
    }
  };

  const handleUpdateEndorsement = async (projectId: string, action: "pulse" | "bookmark") => {
    try {
      setEndorsements((prev) => {
        const current = prev[projectId] || { pulses: 120, views: 1450, bookmarks: 45 };
        return {
          ...prev,
          [projectId]: {
            ...current,
            pulses: action === "pulse" ? current.pulses + 1 : current.pulses,
            bookmarks: action === "bookmark" ? current.bookmarks + 1 : current.bookmarks
          }
        };
      });

      await fetch("/api/projects/endorse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, action })
      });
    } catch {
      // safe fallback
    }
  };

  const handleOpenAiWithQuery = (query: string) => {
    setAiInitialQuery(query);
    setActiveTab("ai-nexus");
  };

  const handleSelectProjectFromCanvas = (proj: ProjectCaseStudy) => {
    setSelectedProject(proj);
    setActiveFocusNode(proj.id);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Hologram Header HUD Navigation */}
      <HoloHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAi={() => setActiveTab("ai-nexus")}
      />

      {/* Hero Section Copywriting & Specs */}
      <HeroSection
        onExploreSphere={() => setActiveTab("sphere")}
        onExploreArchitecture={() => setActiveTab("architecture")}
        onOpenAi={() => setActiveTab("ai-nexus")}
        onOpenTransmissions={() => setActiveTab("transmission")}
      />

      {/* Flagship Interactive 3D Omni-Sphere Canvas Display */}
      {activeTab === "sphere" && (
        <section className="relative w-full py-6 border-b border-cyan-500/20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <h2 className="text-sm sm:text-base font-bold font-mono text-cyan-300 tracking-wider">
                  INTERACTIVE 3D OMNI-SPHERE CANVAS
                </h2>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/30">
                  DRAG TO ROTATE • WHEEL TO ZOOM • CLICK NODES
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    holoAudio.playNodeSelect();
                    setActiveTab("projects");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View Projects Grid</span>
                </button>
              </div>
            </div>

            {/* Canvas Frame Container */}
            <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950/90 shadow-2xl shadow-cyan-500/10">
              <OmniSphereCanvas
                onSelectProject={handleSelectProjectFromCanvas}
                selectedProjectId={selectedProject?.id}
                activeFocusNode={activeFocusNode}
              />
            </div>
          </div>
        </section>
      )}

      {/* Section Content based on Navigation Tab */}
      <div className="flex-1">
        {activeTab === "sphere" && (
          <>
            <ProjectMatrix
              onSelectProject={setSelectedProject}
              endorsements={endorsements}
            />
            <ArchitectureViewer
              onFocusNodeIn3D={(nodeId) => {
                setActiveFocusNode(nodeId);
                setActiveTab("sphere");
              }}
              onAskAiAboutNode={handleOpenAiWithQuery}
            />
            <AiHologramEntity
              onSpatialFocusNode={(nodeId) => {
                setActiveFocusNode(nodeId);
                setActiveTab("sphere");
              }}
              initialQuery={aiInitialQuery}
              onClearInitialQuery={() => setAiInitialQuery(null)}
            />
            <TransmissionTerminal />
            <EcosystemGrid />
          </>
        )}

        {activeTab === "projects" && (
          <ProjectMatrix
            onSelectProject={setSelectedProject}
            endorsements={endorsements}
          />
        )}

        {activeTab === "architecture" && (
          <ArchitectureViewer
            onFocusNodeIn3D={(nodeId) => {
              setActiveFocusNode(nodeId);
              setActiveTab("sphere");
            }}
            onAskAiAboutNode={handleOpenAiWithQuery}
          />
        )}

        {activeTab === "ai-nexus" && (
          <AiHologramEntity
            onSpatialFocusNode={(nodeId) => {
              setActiveFocusNode(nodeId);
              setActiveTab("sphere");
            }}
            initialQuery={aiInitialQuery}
            onClearInitialQuery={() => setAiInitialQuery(null)}
          />
        )}

        {activeTab === "transmission" && <TransmissionTerminal />}

        {activeTab === "ecosystem" && <EcosystemGrid />}
      </div>

      {/* Multi-Layer Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        endorsements={endorsements}
        onUpdateEndorsement={handleUpdateEndorsement}
      />

      {/* Futuristic Hologram Footer */}
      <HoloFooter />
    </main>
  );
}
