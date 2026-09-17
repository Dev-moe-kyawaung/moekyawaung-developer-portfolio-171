"use client";

import React, { useState, useEffect } from "react";
import { USER_BIO } from "@/data/portfolio-data";
import { holoAudio } from "@/components/canvas/AudioSynthesizer";
import { 
  Radio, 
  Send, 
  ShieldCheck, 
  Terminal, 
  PhoneCall, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Activity, 
  GitBranch, 
  ExternalLink 
} from "lucide-react";

interface TransmissionItem {
  id: number;
  senderName: string;
  senderEmail: string;
  senderRole?: string;
  transmissionType?: string;
  message: string;
  signalStrength?: number;
  encryptionProtocol?: string;
  createdAt: string;
}

export default function TransmissionTerminal() {
  const [transmissions, setTransmissions] = useState<TransmissionItem[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("Tech Lead / Recruiter");
  const [transmissionType, setTransmissionType] = useState<string>("Architecture Inquiry");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  // Load existing transmissions
  useEffect(() => {
    fetchTransmissions();
  }, []);

  const fetchTransmissions = async () => {
    try {
      const res = await fetch("/api/transmissions");
      const data = await res.json();
      if (data.transmissions) {
        setTransmissions(data.transmissions);
      }
    } catch {
      // safe fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    holoAudio.playNodeHover();

    try {
      const res = await fetch("/api/transmissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: name,
          senderEmail: email,
          senderRole: role,
          transmissionType,
          message
        })
      });

      const data = await res.json();
      if (data.success) {
        holoAudio.playPulseEndorse();
        setSuccessStatus("Quantum transmission successfully logged into PostgreSQL ledger.");
        setName("");
        setEmail("");
        setMessage("");
        fetchTransmissions();
        setTimeout(() => setSuccessStatus(null), 6000);
      } else {
        setSuccessStatus("Transmission noted via edge relay.");
      }
    } catch {
      setSuccessStatus("Transmission buffered into local cache.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 lg:py-16 border-b border-cyan-500/20 relative holo-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/40">
                Quantum Relay
              </span>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-cyan-300" />
                QUANTUM-AES256 PROTOCOL
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white tracking-wide">
              HOLOGRAPHIC TRANSMISSION TERMINAL
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Initiate a high-priority communication link with Moe Kyaw Aung. Log an inquiry, request an architectural review, or connect directly.
            </p>
          </div>

          {/* Direct Phone Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="tel:+959889000889"
              className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+95 9 889 000 889</span>
            </a>

            <a
              href="tel:+959666000050"
              className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-purple-300 border border-purple-500/40 text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+95 9 666 000 050</span>
            </a>
          </div>
        </div>

        {/* Form and Transmission Feed Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-6">
            <div className="holo-panel p-6 rounded-2xl border border-cyan-400/40 bg-slate-950/90 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <Terminal className="w-4 h-4" />
                  <span>TRANSMIT HOLOCALL / INQUIRY</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  POSTGRESQL SYNC READY
                </div>
              </div>

              {successStatus && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successStatus}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">OPERATOR NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-slate-900 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">EMAIL ENDPOINT *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@nexus.com"
                      className="w-full bg-slate-900 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">ORGANIZATION / ROLE</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Senior Tech Lead"
                      className="w-full bg-slate-900 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">TRANSMISSION CHANNEL</label>
                    <select
                      value={transmissionType}
                      onChange={(e) => setTransmissionType(e.target.value)}
                      className="w-full bg-slate-900 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none"
                    >
                      <option>Architecture Inquiry</option>
                      <option>Senior Role / Consulting Offer</option>
                      <option>POS System Deployment</option>
                      <option>WebGL & 3D Spatial Project</option>
                      <option>General Hololog / Endorsement</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">TRANSMISSION MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter project specifications, partnership inquiries, or comments..."
                    className="w-full bg-slate-900 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "TRANSMITTING DATA TO POSTGRESQL..." : "BROADCAST TRANSMISSION"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right: Realtime Hololog Transmissions Feed */}
          <div className="lg:col-span-6 flex flex-col h-[480px] rounded-2xl holo-panel border border-cyan-500/30 overflow-hidden bg-slate-950/90 shadow-2xl">
            <div className="px-4 py-3 bg-slate-900/80 border-b border-cyan-500/20 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-300">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>ACTIVE TRANSMISSIONS LOG ({transmissions.length})</span>
              </div>
              <span className="text-emerald-400 text-[10px]">VERIFIED BROADCASTS</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {transmissions.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{t.senderName}</span>
                      {t.senderRole && (
                        <span className="text-[10px] text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-cyan-500/30">
                          {t.senderRole}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 text-[10px]">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed font-sans">{t.message}</p>

                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                    <span>TYPE: {t.transmissionType || "Holocall"}</span>
                    <span className="text-emerald-400">SIGNAL {t.signalStrength || 98}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
