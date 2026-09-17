"use client";

import React, { useState, useRef, useEffect } from "react";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Bot, 
  User, 
  Layers, 
  RotateCcw, 
  Cpu, 
  Radio 
} from "lucide-react";

interface AiMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  spatialFocusNode?: string;
}

interface AiHologramEntityProps {
  onSpatialFocusNode: (nodeId: string) => void;
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
}

export default function AiHologramEntity({
  onSpatialFocusNode,
  initialQuery,
  onClearInitialQuery
}: AiHologramEntityProps) {
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: "init-0",
      sender: "ai",
      text: "Greetings. I am AETHERIS-01, the holographic AI entity embedded within Moe Kyaw Aung's Omni-Sphere core. Ask me anything regarding system architecture, POS CRDT sync, WebGL streaming video shaders, Next.js App Router performance, or live apps.",
      timestamp: "00:00:01 UTC",
      spatialFocusNode: "arch-core-frontend"
    }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([40, 65, 85, 30, 95, 70, 50, 80]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle external query from buttons
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  // Oscillate waveform bars when AI is answering
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setWaveformBars([
          Math.floor(20 + Math.random() * 80),
          Math.floor(30 + Math.random() * 70),
          Math.floor(50 + Math.random() * 50),
          Math.floor(20 + Math.random() * 80),
          Math.floor(40 + Math.random() * 60),
          Math.floor(15 + Math.random() * 85),
          Math.floor(35 + Math.random() * 65),
          Math.floor(25 + Math.random() * 75)
        ]);
      }, 100);
    } else {
      setWaveformBars([30, 45, 60, 40, 70, 50, 35, 45]);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.9;
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {
      // safe fallback
    }
  };

  const handleSend = async (queryToSend?: string) => {
    const text = queryToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: AiMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) + " UTC"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);
    holoAudio.playNodeHover();

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text })
      });

      const data = await res.json();
      const aiReplyText = data.response || "Neural response synthesized.";
      const targetNode = data.spatialFocusNode || "arch-core-frontend";

      const aiMsg: AiMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) + " UTC",
        spatialFocusNode: targetNode
      };

      setMessages((prev) => [...prev, aiMsg]);
      holoAudio.playHoloActivate();

      // Trigger 3D Spatial Camera Refocus
      if (targetNode) {
        onSpatialFocusNode(targetNode);
      }

      // Voice synthesis
      speakText(aiReplyText);
    } catch {
      const fallbackMsg: AiMessage = {
        id: "ai-err-" + Date.now(),
        sender: "ai",
        text: "Signal interference detected. Re-routing through local Omni-Sphere cache. Moe Kyaw Aung's architectures remain 100% operational.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }) + " UTC"
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const presetQueries = [
    "Explain POS Offline CRDT Architecture",
    "How does the WebGL Video Engine work?",
    "Describe the Next.js & Drizzle Pipeline",
    "Who is Moe Kyaw Aung & what are his projects?",
    "Show deployed Lovable apps & GitHub hubs"
  ];

  return (
    <section className="py-12 lg:py-16 border-b border-cyan-500/20 relative holo-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-500/40">
                Spatial AI Entity
              </span>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                AETHERIS-01 ONLINE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white tracking-wide">
              HOLOGRAPHIC AI ARCHITECT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Conversational intelligence synced with the 3D Omni-Sphere. Explaining architecture, steering 3D camera coordinates, and answering deep engineering queries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                holoAudio.playNodeHover();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-mono border flex items-center gap-2 transition-all ${
                voiceEnabled
                  ? "bg-purple-500/20 text-purple-300 border-purple-400/50"
                  : "bg-slate-900 text-slate-400 border-slate-700 hover:text-white"
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span>{voiceEnabled ? "Voice: ACTIVE" : "Voice: MUTED"}</span>
            </button>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: "init-reset",
                    sender: "ai",
                    text: "Terminal reset. Ready for next query.",
                    timestamp: new Date().toLocaleTimeString() + " UTC"
                  }
                ]);
                holoAudio.playNodeHover();
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Hologram Visualizer & Entity Avatar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="holo-panel-purple p-6 rounded-2xl border border-purple-500/40 text-center space-y-5 relative overflow-hidden">
              
              {/* Hologram Scanlines */}
              <div className="holo-scanlines absolute inset-0 pointer-events-none opacity-40" />

              {/* Glowing Hologram Sphere / Entity Avatar */}
              <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/60 animate-spin" style={{ animationDuration: "12s" }} />
                <div className="absolute inset-2 rounded-full border border-cyan-400/50 animate-ping opacity-30" />
                
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-900/80 via-cyan-900/60 to-purple-800/80 border border-purple-400/80 flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <Bot className="w-10 h-10 text-cyan-300 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold font-mono text-white">AETHERIS-01</h3>
                <p className="text-xs font-mono text-purple-300">Spatial Architecture Synthesizer</p>
              </div>

              {/* Real-time Frequency Waveform Bars */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>AUDIO FREQUENCY SPECTRUM</span>
                  <span className="text-cyan-400">{isLoading ? "TRANSMITTING..." : "STANDBY"}</span>
                </div>
                <div className="flex items-end justify-center gap-1.5 h-10">
                  {waveformBars.map((height, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${height}%` }}
                      className="w-2 rounded-t bg-gradient-to-t from-cyan-500 to-purple-400 transition-all duration-100"
                    />
                  ))}
                </div>
              </div>

              {/* Status Specs */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-left">
                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">ENGINE</span>
                  <span className="text-cyan-300">Next.js + LLM</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">3D STEERING</span>
                  <span className="text-emerald-400">ENABLED</span>
                </div>
              </div>
            </div>

            {/* Quick Query Preset Chips */}
            <div className="holo-panel p-4 rounded-xl border border-cyan-500/20 space-y-2">
              <div className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                Recommended Spatial Queries
              </div>
              <div className="flex flex-col gap-1.5">
                {presetQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-left text-xs font-mono text-slate-300 hover:text-cyan-300 p-2 rounded bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center justify-between group"
                  >
                    <span className="truncate">{q}</span>
                    <Sparkles className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Conversational Terminal */}
          <div className="lg:col-span-8 flex flex-col h-[520px] rounded-2xl holo-panel border border-cyan-500/30 overflow-hidden bg-slate-950/90 shadow-2xl">
            
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-slate-900/80 border-b border-cyan-500/20 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-300">
                <Terminal className="w-4 h-4" />
                <span>AETHERIS // SPATIAL_CONSOLE_FEED</span>
              </div>
              <span className="text-slate-500 text-[10px]">ENCRYPTED TLS-1.3</span>
            </div>

            {/* Message History Scroller */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isAi ? "justify-start" : "justify-end"}`}
                  >
                    {isAi && (
                      <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-400/50 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm font-sans ${
                        isAi
                          ? "bg-slate-900/90 border border-purple-500/30 text-slate-200 shadow-md shadow-purple-950/40"
                          : "bg-cyan-500/20 border border-cyan-400/50 text-cyan-100 shadow-md shadow-cyan-950/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 font-mono text-[10px] text-slate-400 border-b border-white/5 pb-1">
                        <span className={isAi ? "text-purple-300 font-semibold" : "text-cyan-300 font-semibold"}>
                          {isAi ? "AETHERIS-01" : "OPERATOR"}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {msg.spatialFocusNode && (
                        <div className="pt-1 flex items-center justify-between border-t border-purple-500/20 text-[10px] font-mono text-cyan-400">
                          <span>3D Focus Target: {msg.spatialFocusNode}</span>
                          <button
                            onClick={() => onSpatialFocusNode(msg.spatialFocusNode!)}
                            className="hover:text-white underline flex items-center gap-1"
                          >
                            <Layers className="w-3 h-3" />
                            <span>Steer Camera</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {!isAi && (
                      <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-400/50 flex items-center justify-center text-purple-300 shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-900/90 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-2xl text-xs font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    Synthesizing spatial knowledge matrix...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-cyan-500/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about POS CRDTs, Three.js shaders, Next.js architecture, or apps..."
                  className="flex-1 bg-slate-950 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 font-mono placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />

                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Transmit</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
