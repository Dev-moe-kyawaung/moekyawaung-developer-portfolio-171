import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { aiInteractions } from "@/db/schema";
import { AI_KNOWLEDGE_BASE, PROJECTS, ARCHITECTURE_TIERS, USER_BIO } from "@/data/portfolio-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, sessionId = "holo-session-guest" } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ success: false, error: "Query is required" }, { status: 400 });
    }

    const cleanQuery = query.toLowerCase().trim();
    let matchedResponse = "";
    let spatialFocusNode = "arch-core-frontend";
    let topic = "general";

    // 1. Check knowledge base triggers
    for (const entry of AI_KNOWLEDGE_BASE) {
      if (entry.triggerWords.some((word) => cleanQuery.includes(word))) {
        matchedResponse = entry.response;
        spatialFocusNode = entry.nodeFocus;
        topic = entry.triggerWords[0];
        break;
      }
    }

    // 2. Check project queries
    if (!matchedResponse) {
      for (const proj of PROJECTS) {
        if (
          cleanQuery.includes(proj.slug) ||
          cleanQuery.includes(proj.title.toLowerCase()) ||
          cleanQuery.includes(proj.category.toLowerCase()) ||
          cleanQuery.includes(proj.id)
        ) {
          matchedResponse = `[Spatial Focus: ${proj.title}] - ${proj.overview} Key Metrics: ${proj.metrics
            .map((m) => `${m.label}: ${m.value}`)
            .join(" | ")}. Built using: ${proj.architectureLayers
            .flatMap((l) => l.tech)
            .slice(0, 4)
            .join(", ")}. Explore the multi-layer case study for architectural blueprints!`;
          spatialFocusNode = proj.id;
          topic = proj.id;
          break;
        }
      }
    }

    // 3. Check architecture tiers
    if (!matchedResponse) {
      for (const tier of ARCHITECTURE_TIERS) {
        if (
          cleanQuery.includes(tier.name.toLowerCase()) ||
          cleanQuery.includes(tier.type.toLowerCase())
        ) {
          matchedResponse = `[Omni-Sphere Tier: ${tier.name}] - ${tier.description} Integrated Technologies: ${tier.technologies.join(", ")}. Realtime Throughput: ${tier.throughput}. Status: ${tier.status}.`;
          spatialFocusNode = tier.id;
          topic = tier.id;
          break;
        }
      }
    }

    // 4. Fallback intelligent response
    if (!matchedResponse) {
      if (cleanQuery.includes("github") || cleanQuery.includes("repo") || cleanQuery.includes("code")) {
        matchedResponse = `Moe Kyaw Aung maintains an extensive GitHub presence with over 40+ repositories across @Dev-moe-kyawaung, @moekyawaung-tech, and @Moekyawaung-cyber. Explore the repositories or click any floating node to view source code blueprints.`;
        spatialFocusNode = "arch-edge-api";
      } else if (cleanQuery.includes("lovable") || cleanQuery.includes("pwa")) {
        matchedResponse = `MKA has architected multiple top-tier web applications and AI tools deployed on Lovable and custom PWA hosts, including Happy CV Creator, CV Beacon, and MKA URL Gateway.`;
        spatialFocusNode = "proj-pwa-app";
      } else if (cleanQuery.includes("performance") || cleanQuery.includes("fps") || cleanQuery.includes("speed")) {
        matchedResponse = `The Omni-Sphere architecture is optimized for 120 FPS WebGL rendering, sub-100ms API response times via Next.js App Router, and sub-10ms PostgreSQL queries with Drizzle ORM.`;
        spatialFocusNode = "arch-webgl-mesh";
      } else {
        matchedResponse = `Greetings from AETHERIS-01 Holographic Core. I can explain Moe Kyaw Aung's full-stack architecture, 3D WebGL implementations, Point-of-Sale (POS) systems, streaming video pipelines, or steer the 3D camera to any orbital node. Try asking: 'Explain POS Architecture', 'Show Video Engine', 'What is the Tech Stack?', or 'How to contact Moe Kyaw Aung?'.`;
        spatialFocusNode = "arch-core-frontend";
      }
    }

    // Attempt DB logging
    try {
      await db.insert(aiInteractions).values({
        sessionId,
        userQuery: query,
        aiResponse: matchedResponse,
        topic,
        spatialFocusNode
      });
    } catch {
      // Non-blocking if table is being initialized
    }

    return NextResponse.json({
      success: true,
      query,
      response: matchedResponse,
      spatialFocusNode,
      topic,
      hologramVoiceAvailable: true
    });
  } catch (error) {
    console.error("AI Assistant error:", error);
    return NextResponse.json(
      {
        success: true,
        response: "AETHERIS-01 Hologram Nexus is online. Ask me about Moe Kyaw Aung's architecture, projects, or 3D systems.",
        spatialFocusNode: "arch-core-frontend"
      }
    );
  }
}
