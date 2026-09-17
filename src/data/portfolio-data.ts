export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Enterprise System" | "WebGL & 3D" | "PWA & Mobile" | "FinTech" | "Media Engine" | "Gaming & Physics";
  status: "Production Ready" | "Active Deployed" | "Holo-Matrix v2.4";
  featured: boolean;
  sphereCoords: [number, number, number]; // 3D spatial node coordinates
  orbitRadius: number;
  orbitSpeed: number;
  nodeColor: string;
  accentGlow: string;
  iconName: string;
  thumbnail: string;
  videoPreview?: string;
  githubUrl: string;
  liveUrl?: string;
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  overview: string;
  challenges: string[];
  architectureLayers: {
    layer: string;
    tech: string[];
    description: string;
  }[];
  technicalHighlights: string[];
  codeBlueprint?: {
    filename: string;
    language: string;
    code: string;
  };
  liveDemos: {
    title: string;
    description: string;
    actionLabel: string;
    url: string;
  }[];
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: "Frontend Core" | "WebGL / 3D Canvas" | "Edge Computing" | "PostgreSQL & Drizzle" | "AI Holographic Agent" | "Realtime Mesh";
  description: string;
  technologies: string[];
  coordinates: [number, number, number];
  connections: string[];
  status: "ONLINE" | "OPTIMAL" | "SYNCHRONIZED";
  throughput: string;
}

export const USER_BIO = {
  name: "Moe Kyaw Aung",
  alias: "MKA • Holographic Architect",
  title: "Senior Full-Stack Architect & 3D Spatial Computing Engineer",
  location: "Yangon / Global Remote Hub",
  gravatarUrl: "https://gravatar.com/moekyawaung2026",
  avatarUrl: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  secondaryAvatars: [
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778747388/image-1_1_khsx9s.png",
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp",
    "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_3_zqrhhr.webp"
  ],
  heroVideo: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779052711/Javier_Black-Dark-Ring.mp4",
  ambientVideo: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779031596/Javier_Pardina_10_wttux4.mp4",
  phones: ["+95 9 889 000 889", "+95 9 666 000 050"],
  email: "contact@moekyawaung.dev",
  githubMain: "https://github.com/Dev-moe-kyawaung/",
  githubTech: "https://github.com/moekyawaung-tech/",
  githubCyber: "https://github.com/Moekyawaung-cyber/",
  yearsExperience: "8+ Years",
  totalDeployedApps: "45+",
  systemUptime: "99.98%",
  shortBio: "Senior Software Architect with deep expertise in Next.js Full-Stack ecosystems, WebGL/Three.js spatial interfaces, high-concurrency POS engines, and edge-native PWAs.",
  fullBio: `Moe Kyaw Aung (MKA) is an avant-garde software architect specializing in next-generation spatial computing interfaces, high-performance web systems, and full-stack PostgreSQL architectures. With extensive experience deploying commercial POS engines, streaming video architectures, real-time social dashboards, and WebGL experiences, he blends structural engineering with cinematic visual design.`,
  coreSkills: [
    { category: "Frontend & Spatial 3D", skills: ["Next.js App Router", "React 19", "Three.js / WebGL", "GSAP & Framer Motion", "Tailwind CSS v4", "TypeScript"] },
    { category: "Backend & Systems", skills: ["Node.js / Bun", "PostgreSQL", "Drizzle ORM", "Redis Caching", "GraphQL & REST", "Microservices"] },
    { category: "Architecture & DevOps", skills: ["PWA / Service Workers", "Docker & Kubernetes", "HLS/DASH Streaming", "Distributed POS State", "CI/CD Automations"] },
    { category: "AI & Holography", skills: ["Spatial Agentics", "LLM Prompt Engineering", "Vector Embeddings", "Audio Waveform Synthesis", "Shader GLSL"] }
  ],
  githubEcosystem: [
    { title: "Dev Main Hub", url: "https://github.com/Dev-moe-kyawaung/", stars: "120+" },
    { title: "Tech Repositories", url: "https://github.com/moekyawaung-tech/", stars: "340+" },
    { title: "Cyber Security & Lists", url: "https://github.com/Moekyawaung-cyber/", stars: "90+" },
    { title: "MKA Code Lab", url: "https://moekyaw-developer.github.io/", stars: "75+" },
    { title: "Tech Cloud Port", url: "https://moekyawaung-tech.github.io/", stars: "110+" },
    { title: "Senior App Network", url: "https://moekyawaung-senior.github.io/", stars: "85+" }
  ],
  lovableApps: [
    { name: "Happy CV Creator", url: "https://happy-cv-creator.lovable.app", tag: "AI Resume Engine" },
    { name: "Moe Kyaw Aung Bio App", url: "https://moekyawaungmybio.lovable.app/", tag: "Interactive Bio" },
    { name: "The CV Palette", url: "https://the-cv-palette.lovable.app", tag: "Visual Styler" },
    { name: "MKA URL Shortener & Hub", url: "https://moekyaw-url.lovable.app", tag: "Edge Redirects" },
    { name: "CV Beacon Live", url: "https://cv-beacon.lovable.app/", tag: "Talent Showcase" },
    { name: "Pixel Perfect Snap", url: "https://pixel-perfect-snap-39.lovable.app", tag: "Creative Tool" },
    { name: "Joy Codify Life", url: "https://joy-codify-life.lovable.app/", tag: "Lifestyle Web" }
  ]
};

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "proj-pos-ultimate",
    slug: "pos-ultimate-pro-max",
    title: "POS Ultimate Pro Max Suite",
    tagline: "Enterprise Distributed Point-of-Sale System with Offline-First Sync & Hardware Bridge",
    category: "Enterprise System",
    status: "Production Ready",
    featured: true,
    sphereCoords: [3.2, 1.2, 0.8],
    orbitRadius: 3.5,
    orbitSpeed: 0.008,
    nodeColor: "#00f3ff",
    accentGlow: "rgba(0, 243, 255, 0.8)",
    iconName: "Store",
    thumbnail: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png",
    videoPreview: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779052704/Javier_Pardina_10_ay7iai.mp4",
    githubUrl: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    liveUrl: "https://moekyawaung.github.io/",
    metrics: [
      { label: "Transactions/Sec", value: "12,500 TPS", change: "+42% latency drop" },
      { label: "Offline Cache", value: "IndexedDB + SQLite", change: "Zero Data Loss" },
      { label: "Sync Latency", value: "< 45ms", change: "Conflict-Free CRDT" },
      { label: "Active Terminals", value: "350+ Stores", change: "Global Deploy" }
    ],
    overview: "POS Ultimate Pro Max is a mission-critical multi-tenant retail management system architected to survive intermittent connectivity in enterprise stores while managing inventory matrices, barcode scanning, thermal printers, and real-time revenue analytics.",
    challenges: [
      "Handling thousands of concurrent checkout operations during network outages without creating double-spend or race conditions.",
      "Direct WebSocket and WebUSB hardware bridging for ESC/POS receipt printing and cash drawer triggers across heterogeneous operating systems.",
      "Multi-store stock synchronization across multiple geographic locations with sub-second reconciliations."
    ],
    architectureLayers: [
      {
        layer: "Client & Peripheral Bridge",
        tech: ["Next.js PWA", "WebUSB API", "WebSerial", "Zustand State Engine", "Tailwind CSS"],
        description: "Zero-latency UI with instant keyboard shortcuts, touch-optimized kiosk mode, and direct hardware printer driver integration."
      },
      {
        layer: "Resilience & Offline Layer",
        tech: ["Service Workers", "IndexedDB", "RxDB / CRDTs", "Background Sync"],
        description: "Local transaction queuing with optimistic updates and automatic bidirectional sync upon reconnect."
      },
      {
        layer: "Backend & Data Integrity",
        tech: ["PostgreSQL", "Drizzle ORM", "Redis Streams", "Node.js Microservices"],
        description: "ACID-compliant relational ledger with partitioning for audit trails, tax calculations, and real-time accounting."
      }
    ],
    technicalHighlights: [
      "Conflict-Free Replicated Data Types (CRDTs) to guarantee zero loss on simultaneous inventory writes.",
      "Hardware thermal printer thermal buffer parser with custom barcode & QR generation.",
      "Role-based quantum access controls (Cashier, Floor Supervisor, Auditor, Master Admin)."
    ],
    codeBlueprint: {
      filename: "pos-sync-engine.ts",
      language: "typescript",
      code: `// Offline-first CRDT Syncer with PostgreSQL Drizzle Ledger
export async function reconcileTerminalBatch(
  terminalId: string,
  orders: OfflineOrderReceipt[]
): Promise<SyncReceipt> {
  return await db.transaction(async (tx) => {
    const processedIds: string[] = [];
    for (const order of orders) {
      const existing = await tx.query.salesLedger.findFirst({
        where: eq(salesLedger.clientUUID, order.clientUUID)
      });
      if (!existing) {
        await tx.insert(salesLedger).values({ ...order, syncedAt: new Date() });
        await updateInventoryAtomic(tx, order.lineItems);
        processedIds.push(order.clientUUID);
      }
    }
    return { status: "SYNCHRONIZED", count: processedIds.length, timestamp: Date.now() };
  });
}`
    },
    liveDemos: [
      { title: "POS Ultimate Repository", description: "View the complete source code on GitHub", actionLabel: "GitHub Repo", url: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max" },
      { title: "Advance POS Suite", description: "Explore the advanced variant for restaurant and multi-channel retail", actionLabel: "View Advanced POS", url: "https://github.com/moekyawaung-tech/Advance-POS-Version" }
    ]
  },
  {
    id: "proj-video-player",
    slug: "video-player-engine",
    title: "Next-Gen WebGL Video Stream Engine",
    tagline: "Ultra-Low Latency Adaptive Streaming Engine with Real-Time GLSL Shaders & Spatial Audio",
    category: "Media Engine",
    status: "Active Deployed",
    featured: true,
    sphereCoords: [-2.8, 2.1, -1.4],
    orbitRadius: 3.7,
    orbitSpeed: -0.007,
    nodeColor: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.8)",
    iconName: "Video",
    thumbnail: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795859/copilot_image_1778794430377_n7xlmz.png",
    videoPreview: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779031566/Javier_Pardina_11_r5y8no.mp4",
    githubUrl: "https://github.com/moekyawaung-tech/video-player",
    liveUrl: "https://moekyawaung-developer.github.io/",
    metrics: [
      { label: "Startup Time", value: "180ms", change: "4x faster than vanilla" },
      { label: "Buffer Underrun", value: "0.02%", change: "Adaptive HLS Chunking" },
      { label: "Framerate", value: "60 FPS WebGL", change: "Hardware Accelerated" },
      { label: "Audio Spatial", value: "3D B-Format", change: "Web Audio Convolver" }
    ],
    overview: "A custom WebGL video rendering pipeline designed for modern cinematic presentations, dynamic aspect-ratio adaptation, real-time post-processing shaders (grain, bloom, color grading), and Web Audio API spatialization.",
    challenges: [
      "Rendering multi-layered 4K video textures inside Three.js scenes without frame jitter or memory leaks.",
      "Implementing custom chunk lookahead algorithms for smooth adaptive bitrate switching under fluctuating bandwidth."
    ],
    architectureLayers: [
      {
        layer: "Video Decoder & HLS Pipeline",
        tech: ["HLS.js / Dash.js", "WebCodecs API", "WebAssembly Decoder"],
        description: "Direct stream demuxing with dynamic buffer sliding windows and bitrate heuristic models."
      },
      {
        layer: "Shader & WebGL Canvas Pipeline",
        tech: ["Three.js", "Custom GLSL Shaders", "OffscreenCanvas"],
        description: "Hardware-accelerated visual transforms, chromatic aberration, holographic scanlines, and real-time color lut textures."
      }
    ],
    technicalHighlights: [
      "Custom GLSL fragment shader for holographic scanlines and edge glow.",
      "OffscreenCanvas worker rendering to prevent main thread blocking during intensive calculations."
    ],
    codeBlueprint: {
      filename: "hologram-video-shader.glsl",
      language: "glsl",
      code: `uniform sampler2D uVideoTexture;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  // Scanline perturbation
  float scanline = sin(uv.y * 800.0 + uTime * 4.0) * 0.04;
  vec4 color = texture2D(uVideoTexture, vec2(uv.x + scanline * 0.02, uv.y));
  
  // Hologram tint & chromatic aberration
  float r = texture2D(uVideoTexture, uv + vec2(0.003, 0.0)).r;
  float g = color.g * 1.15;
  float b = texture2D(uVideoTexture, uv - vec2(0.003, 0.0)).b * 1.4;
  
  gl_FragColor = vec4(r, g, b, color.a * 0.95);
}`
    },
    liveDemos: [
      { title: "Video Player Source", description: "Inspect repository and player controllers", actionLabel: "Open GitHub", url: "https://github.com/moekyawaung-tech/video-player" }
    ]
  },
  {
    id: "proj-social-dashboard",
    slug: "social-dashboard-matrix",
    title: "Omni-Channel Social Analytics Matrix",
    tagline: "High-Throughput Real-Time Telemetry & Audience Sentiment Command Center",
    category: "Enterprise System",
    status: "Active Deployed",
    featured: true,
    sphereCoords: [1.8, -2.4, 2.2],
    orbitRadius: 3.6,
    orbitSpeed: 0.011,
    nodeColor: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.8)",
    iconName: "Activity",
    thumbnail: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778794626112_ega7kk.png",
    videoPreview: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779052708/AUDI_-_Javier_Pardina_1_gavyon.mp4",
    githubUrl: "https://github.com/moekyawaung-tech/social-dashboard",
    liveUrl: "https://moekyawaungvivov30pro-design.github.io/",
    metrics: [
      { label: "Data Ingestion", value: "48K Events/sec", change: "Kafka + Redis" },
      { label: "Query Speed", value: "12ms", change: "PostgreSQL TimeScale" },
      { label: "Live Widgets", value: "32 Realtime Graphs", change: "Server-Sent Events" }
    ],
    overview: "A glassmorphic executive command center visualizing live audience sentiment, social channel throughput, conversion funnels, and automated campaign alerts across multiple social networks.",
    challenges: [
      "Aggregating streaming feeds from multiple APIs with distinct rate limits into a unified real-time dashboard.",
      "Optimizing React 19 render cycles for smooth 60fps graph updates without re-rendering unaffected dashboard panels."
    ],
    architectureLayers: [
      {
        layer: "UI & Visualization Layer",
        tech: ["Next.js App Router", "ECharts / D3", "Tailwind CSS", "Framer Motion"],
        description: "Responsive dark holographic panels with dynamic color temperature based on sentiment score."
      },
      {
        layer: "Real-time Gateway",
        tech: ["WebSockets", "Server-Sent Events", "Redis Pub/Sub"],
        description: "Low-overhead push updates to active client sessions with automatic reconnect and channel multiplexing."
      }
    ],
    technicalHighlights: [
      "Dynamic delta updates with zero DOM thrashing.",
      "Custom metric aggregations across YouTube, X/Twitter, TikTok, and Instagram."
    ],
    codeBlueprint: {
      filename: "sentiment-pipeline.ts",
      language: "typescript",
      code: `export async function ingestSocialPayload(event: RawSocialEvent) {
  const sentimentScore = calculateVaderScore(event.text);
  const normalizedEvent = {
    id: crypto.randomUUID(),
    platform: event.platform,
    engagement: event.likes + event.shares * 2,
    sentiment: sentimentScore,
    timestamp: new Date()
  };
  await redis.publish("channel:social_stream", JSON.stringify(normalizedEvent));
  await db.insert(socialStreamLogs).values(normalizedEvent);
}`
    },
    liveDemos: [
      { title: "Dashboard Repository", description: "Explore the live source on GitHub", actionLabel: "View Source", url: "https://github.com/moekyawaung-tech/social-dashboard" }
    ]
  },
  {
    id: "proj-pwa-app",
    slug: "pwa-hybrid-ecosystem",
    title: "Offline-First PWA Cloud Suite",
    tagline: "Progressive Web Application with Background Sync, Push Notifications & Native Device Bridge",
    category: "PWA & Mobile",
    status: "Production Ready",
    featured: true,
    sphereCoords: [-3.4, -1.0, 1.2],
    orbitRadius: 3.8,
    orbitSpeed: -0.009,
    nodeColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.8)",
    iconName: "Smartphone",
    thumbnail: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795000722_eo96gj.png",
    githubUrl: "https://github.com/moekyawaung-tech/pwa-app",
    liveUrl: "https://moekyaw-url.lovable.app",
    metrics: [
      { label: "Lighthouse Score", value: "100 / 100", change: "Perfect PWA Audit" },
      { label: "Bundle Size", value: "< 42 KB", change: "Tree-shaken & Brotli" },
      { label: "Cold Start", value: "0.3s", change: "Aggressive Service Worker Cache" }
    ],
    overview: "An offline-first progressive web architecture delivering native-app fluidity, bidirectional background synchronization, push alerts, and biometric authentication directly in mobile browsers.",
    challenges: [
      "Coordinating background sync tasks across iOS WebKit and Android Chromium with varying background execution budgets.",
      "Managing local IndexedDB migrations smoothly across client app updates."
    ],
    architectureLayers: [
      {
        layer: "Service Worker Engine",
        tech: ["Workbox", "Cache API", "Background Sync API"],
        description: "Stale-While-Revalidate caching strategy with fallback offline pages and network telemetry."
      }
    ],
    technicalHighlights: [
      "Web Push Notification integration with encryption payload.",
      "Biometric WebAuthn passkey authentication support."
    ],
    liveDemos: [
      { title: "PWA Repository", description: "Explore offline architecture", actionLabel: "GitHub Repo", url: "https://github.com/moekyawaung-tech/pwa-app" }
    ]
  },
  {
    id: "proj-game-collection",
    slug: "holographic-game-collection",
    title: "WebGL 3D Arcade & Physics Sandbox",
    tagline: "High-Performance Interactive Gaming Suite with Particle Physics & WebGL Shaders",
    category: "Gaming & Physics",
    status: "Active Deployed",
    featured: false,
    sphereCoords: [0.5, 3.2, -2.2],
    orbitRadius: 3.9,
    orbitSpeed: 0.012,
    nodeColor: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.8)",
    iconName: "Gamepad2",
    thumbnail: "https://res.cloudinary.com/dye5qpwii/image/upload/v1779052645/2153-fireworks-composer_gm3e0h.jpg",
    videoPreview: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779052732/Javier_Pardina_2_l1mtud.mp4",
    githubUrl: "https://github.com/moekyawaung-tech/game-collection",
    liveUrl: "https://moekyawaung-developer.github.io/",
    metrics: [
      { label: "Frame Rate", value: "120 FPS", change: "GPU Instanced" },
      { label: "Active Particles", value: "50,000+", change: "GLSL Compute" }
    ],
    overview: "A collection of interactive WebGL arcade games including Snake 3D, physics ragdoll simulations, and casino mathematical state engines built with raw Canvas and Three.js physics.",
    challenges: ["Optimizing 50,000+ interactive collision particles with zero CPU bottleneck."],
    architectureLayers: [
      { layer: "Physics Core", tech: ["Cannon-es / Rapier", "Three.js", "Web Audio"], description: "Hardware-accelerated 3D rigid body physics and spatial audio fx." }
    ],
    technicalHighlights: ["Spatial 3D audio listener placement", "Instanced mesh particle emitters"],
    liveDemos: [
      { title: "Game Engine Repo", description: "View source on GitHub", actionLabel: "Open Repo", url: "https://github.com/moekyawaung-tech/game-collection" },
      { title: "Snake 3D App", description: "Classic reimagined in 3D", actionLabel: "View Snake Game", url: "https://github.com/moekyawaung-tech/Snake-Game-App" }
    ]
  },
  {
    id: "proj-job-portal",
    slug: "talent-nexus-job-portal",
    title: "Global Talent & Career Nexus",
    tagline: "Full-Stack Recruitment Architecture with Automated Resume Parsing & Dynamic Scoring",
    category: "Enterprise System",
    status: "Production Ready",
    featured: false,
    sphereCoords: [-2.1, -2.8, -1.8],
    orbitRadius: 4.0,
    orbitSpeed: -0.006,
    nodeColor: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.8)",
    iconName: "Briefcase",
    thumbnail: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795847/copilot_image_1778795115579_acfm5j.png",
    githubUrl: "https://github.com/moekyawaung-tech/Job-Portal-App",
    liveUrl: "https://happy-cv-creator.lovable.app",
    metrics: [
      { label: "Match Speed", value: "< 25ms", change: "Postgres Vector Search" },
      { label: "Candidate Pipeline", value: "10,000+", change: "Scalable Schema" }
    ],
    overview: "Full-scale recruitment portal with applicant tracking, AI skill matching, automated interview scheduler, and PDF resume generator.",
    challenges: ["Real-time candidate indexing and multi-criteria fuzzy filtering."],
    architectureLayers: [
      { layer: "Full Stack", tech: ["Next.js", "Drizzle ORM", "PostgreSQL", "Tailwind CSS"], description: "Modern responsive portal with candidate analytics and recruiter dashboards." }
    ],
    technicalHighlights: ["Custom PDF generation pipeline", "Vector similarity matching for applicant skills"],
    liveDemos: [
      { title: "Job Portal Code", description: "Explore repository", actionLabel: "GitHub Repo", url: "https://github.com/moekyawaung-tech/Job-Portal-App" },
      { title: "Happy CV Creator", description: "Live AI Resume Creator on Lovable", actionLabel: "Launch Lovable App", url: "https://happy-cv-creator.lovable.app" }
    ]
  },
  {
    id: "proj-stock-crypto",
    slug: "crypto-stock-terminal",
    title: "Quantum Market & Crypto Terminal",
    tagline: "Sub-Millisecond Order Book Visualizer & Algorithmic Trading Analytics",
    category: "FinTech",
    status: "Active Deployed",
    featured: false,
    sphereCoords: [2.5, -1.5, -2.7],
    orbitRadius: 4.1,
    orbitSpeed: 0.010,
    nodeColor: "#14b8a6",
    accentGlow: "rgba(20, 184, 166, 0.8)",
    iconName: "TrendingUp",
    thumbnail: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778795853/copilot_image_1778794781671_kytvkc.png",
    videoPreview: "https://res.cloudinary.com/dye5qpwii/video/upload/v1779031657/COACH_-_Javier_Pardina_gdjsjg.mp4",
    githubUrl: "https://github.com/moekyawaung-tech/thailand-travel",
    liveUrl: "https://the-cv-palette.lovable.app",
    metrics: [
      { label: "Ticker Latency", value: "8ms", change: "Binary WebSocket" },
      { label: "Indicators", value: "45+ Technicals", change: "WASM Math Engine" }
    ],
    overview: "High-frequency crypto and stock terminal rendering real-time order books, depth charts, moving averages, and automated portfolio rebalancing triggers.",
    challenges: ["Streaming 2,000 price ticks/sec without throttling main thread UI animations."],
    architectureLayers: [
      { layer: "Chart Engine", tech: ["Canvas 2D", "WebGL", "WebWorkers"], description: "Custom GPU-accelerated candlestick renderer capable of 1M data points." }
    ],
    technicalHighlights: ["Zero memory-allocation tick parser", "Dynamic depth chart surface mapping"],
    liveDemos: [
      { title: "FinTech Network", description: "Explore trading algorithms", actionLabel: "GitHub Network", url: "https://github.com/moekyawaung-tech/" }
    ]
  }
];

export const ARCHITECTURE_TIERS: ArchitectureNode[] = [
  {
    id: "arch-core-frontend",
    name: "Holographic Presentation Tier",
    type: "Frontend Core",
    description: "Next.js App Router (React 19) paired with Three.js WebGL canvas, GLSL volumetric shaders, and GSAP/Framer Motion kinetic timelines.",
    technologies: ["Next.js App Router", "React 19", "Three.js", "GLSL Shaders", "GSAP", "Framer Motion", "Tailwind CSS v4"],
    coordinates: [0, 0, 0],
    connections: ["arch-edge-api", "arch-webgl-mesh"],
    status: "OPTIMAL",
    throughput: "120 FPS / Sub-second TTFB"
  },
  {
    id: "arch-webgl-mesh",
    name: "Omni-Sphere 3D Spatial Mesh",
    type: "WebGL / 3D Canvas",
    description: "Dynamic concentric 3D wireframe spheres, orbit ring projectors, particle starfields, raycast interaction nodes, and volumetric light cones.",
    technologies: ["Three.js", "OrbitControls", "InstancedBufferGeometry", "ShaderMaterial", "Postprocessing Bloom", "Raycasting"],
    coordinates: [0, 2.5, 0],
    connections: ["arch-core-frontend", "arch-ai-entity"],
    status: "SYNCHRONIZED",
    throughput: "60k Polygons / 60-120Hz"
  },
  {
    id: "arch-edge-api",
    name: "Edge API & Microservice Mesh",
    type: "Edge Computing",
    description: "High-concurrency serverless route handlers managing real-time holographic transmissions, telemetry feeds, and low-latency cache validation.",
    technologies: ["Next.js Route Handlers", "Node.js 22", "Edge Runtime", "WebSocket / SSE", "Redis PubSub"],
    coordinates: [-3, 0, 0],
    connections: ["arch-core-frontend", "arch-db-drizzle"],
    status: "ONLINE",
    throughput: "45,000 Req / min"
  },
  {
    id: "arch-db-drizzle",
    name: "PostgreSQL & Drizzle ORM Data Core",
    type: "PostgreSQL & Drizzle",
    description: "ACID relational schema with Drizzle type safety, transactional audit logging, project endorsements, and holographic transmission archives.",
    technologies: ["PostgreSQL", "Drizzle ORM", "Connection Pooling", "Type-safe Migrations", "pg-crypto"],
    coordinates: [3, 0, 0],
    connections: ["arch-edge-api", "arch-ai-entity"],
    status: "ONLINE",
    throughput: "< 8ms Query Latency"
  },
  {
    id: "arch-ai-entity",
    name: "AETHERIS-01 Hologram AI Nexus",
    type: "AI Holographic Agent",
    description: "Spatial AI conversational hologram agent capable of explaining architecture layers, steering 3D camera coordinates, and answering technical inquiries.",
    technologies: ["Spatial Camera Trigger", "LLM Integration", "Web Speech API", "Waveform Audio Visualizer", "Architecture Parser"],
    coordinates: [0, -2.5, 0],
    connections: ["arch-core-frontend", "arch-db-drizzle", "arch-webgl-mesh"],
    status: "ONLINE",
    throughput: "100% Neural Sync"
  }
];

export const AI_KNOWLEDGE_BASE = [
  {
    triggerWords: ["who is", "about", "creator", "moe kyaw aung", "mka", "profile", "background"],
    nodeFocus: "arch-core-frontend",
    response: "Moe Kyaw Aung (MKA) is a Senior Full-Stack Architect & 3D Spatial Computing Engineer with over 8 years of experience building mission-critical POS systems, WebGL streaming video platforms, offline-first PWAs, and enterprise cloud dashboards. He holds over 45+ deployed repositories and apps across GitHub and Lovable ecosystems."
  },
  {
    triggerWords: ["pos", "point of sale", "retail", "offline", "crdt", "cashier"],
    nodeFocus: "proj-pos-ultimate",
    response: "Moe Kyaw Aung's POS Ultimate Pro Max suite utilizes Conflict-Free Replicated Data Types (CRDTs) on IndexedDB to allow complete offline store checkout operations with zero race conditions, syncs to PostgreSQL Drizzle tables upon reconnection, and directly drives thermal ESC/POS printers via WebUSB and WebSerial."
  },
  {
    triggerWords: ["three.js", "3d", "omni-sphere", "webgl", "graphics", "shader"],
    nodeFocus: "arch-webgl-mesh",
    response: "The Omni-Sphere engine runs on Three.js and custom GLSL shaders. It features concentric rotating wireframe spheres, orbit ring nodes mapped to real project case studies, procedural volumetric light beams, and interactive raycasting with depth-of-field transitions."
  },
  {
    triggerWords: ["architecture", "next.js", "stack", "database", "drizzle", "postgresql"],
    nodeFocus: "arch-db-drizzle",
    response: "The entire system is powered by Next.js App Router (React 19) connected to PostgreSQL via Drizzle ORM. Real-time updates, telemetry, and visitor transmissions are stored with strict type-safety and sub-10ms query execution."
  },
  {
    triggerWords: ["video player", "streaming", "hls", "media"],
    nodeFocus: "proj-video-player",
    response: "The WebGL Video Streaming Engine features sub-200ms startup times, adaptive HLS/DASH chunking, spatial 3D audio listener mapping, and custom GLSL post-processing shaders for cinematic holographic display."
  },
  {
    triggerWords: ["contact", "hire", "phone", "email", "reach"],
    nodeFocus: "arch-ai-entity",
    response: "You can initiate a transmission directly through the Holographic Transmission Terminal below, or reach Moe Kyaw Aung via phone at +95 9 889 000 889 or +95 9 666 000 050, Gravatar @moekyawaung2026, or his official GitHub @Dev-moe-kyawaung."
  }
];
