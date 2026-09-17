"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { PROJECTS, ARCHITECTURE_TIERS, ProjectCaseStudy } from "@/data/portfolio-data";
import { holoAudio } from "./AudioSynthesizer";
import { RotateCw, Eye, Sparkles, ZoomIn, ZoomOut, Compass, RefreshCcw, Layers } from "lucide-react";

interface OmniSphereCanvasProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
  selectedProjectId?: string | null;
  activeFocusNode?: string | null;
  className?: string;
}

export default function OmniSphereCanvas({
  onSelectProject,
  selectedProjectId,
  activeFocusNode,
  className = ""
}: OmniSphereCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<ProjectCaseStudy | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [cameraMode, setCameraMode] = useState<"orbit" | "core" | "wide" | "top">("orbit");
  const [canvasReady, setCanvasReady] = useState<boolean>(false);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, 9.5));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const isDraggingRef = useRef<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const nodeMeshesRef = useRef<{ mesh: THREE.Mesh; project: ProjectCaseStudy; glowMesh: THREE.Mesh }[]>([]);
  const laserScannerRef = useRef<THREE.Mesh | null>(null);

  // Handle camera preset view changes
  const switchCameraView = useCallback((mode: "orbit" | "core" | "wide" | "top") => {
    setCameraMode(mode);
    holoAudio.playNodeSelect();
    if (!targetCamPosRef.current) return;

    switch (mode) {
      case "core":
        targetCamPosRef.current.set(0, 0.4, 4.8);
        targetLookAtRef.current.set(0, 0, 0);
        break;
      case "wide":
        targetCamPosRef.current.set(0, 4.0, 14.0);
        targetLookAtRef.current.set(0, 0, 0);
        break;
      case "top":
        targetCamPosRef.current.set(0, 12.0, 0.5);
        targetLookAtRef.current.set(0, 0, 0);
        break;
      case "orbit":
      default:
        targetCamPosRef.current.set(0, 1.5, 9.5);
        targetLookAtRef.current.set(0, 0, 0);
        break;
    }
  }, []);

  // Sync camera when external focus node changes (e.g. from AI assistant)
  useEffect(() => {
    if (!activeFocusNode) return;
    const matchedProject = PROJECTS.find((p) => p.id === activeFocusNode);
    if (matchedProject) {
      const [x, y, z] = matchedProject.sphereCoords;
      targetLookAtRef.current.set(x, y, z);
      targetCamPosRef.current.set(x * 1.6, y * 1.6 + 0.8, z * 1.6 + 2.5);
      holoAudio.playNodeSelect();
      return;
    }

    const matchedTier = ARCHITECTURE_TIERS.find((t) => t.id === activeFocusNode);
    if (matchedTier) {
      const [x, y, z] = matchedTier.coordinates;
      targetLookAtRef.current.set(x, y, z);
      targetCamPosRef.current.set(x * 1.4, y * 1.4 + 1.2, 7.0);
      holoAudio.playNodeSelect();
    }
  }, [activeFocusNode]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 9.5);
    cameraRef.current = camera;

    // 3. Renderer with high-DPI support
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting (Volumetric Holographic Spectrum)
    const ambientLight = new THREE.AmbientLight(0x00f3ff, 0.8);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f3ff, 3, 25);
    cyanPoint.position.set(5, 5, 5);
    scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0xa855f7, 3.5, 25);
    purplePoint.position.set(-5, -4, 4);
    scene.add(purplePoint);

    const emeraldPoint = new THREE.PointLight(0x10b981, 2, 20);
    emeraldPoint.position.set(0, 6, -5);
    scene.add(emeraldPoint);

    // 5. Core Omni-Sphere Group
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;
    scene.add(coreGroup);

    // 5a. Inner Plasma Core (Glowing Icosahedron)
    const innerGeom = new THREE.IcosahedronGeometry(1.2, 3);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCore);

    // 5b. Dense Solid Core Sphere
    const denseCoreGeom = new THREE.SphereGeometry(0.85, 32, 32);
    const denseCoreMat = new THREE.MeshStandardMaterial({
      color: 0x04132b,
      emissive: 0x00f3ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false
    });
    const denseCore = new THREE.Mesh(denseCoreGeom, denseCoreMat);
    coreGroup.add(denseCore);

    // 5c. Mid Concentric Geodesic Sphere
    const midGeom = new THREE.IcosahedronGeometry(2.0, 2);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const midSphere = new THREE.Mesh(midGeom, midMat);
    coreGroup.add(midSphere);

    // 5d. Outer Geometric Grid Sphere
    const outerGeom = new THREE.SphereGeometry(2.8, 24, 16);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const outerSphere = new THREE.Mesh(outerGeom, outerMat);
    coreGroup.add(outerSphere);

    // 6. Multi-Axis Gimbal Holographic Rings
    const ringsGroup = new THREE.Group();
    ringsGroupRef.current = ringsGroup;
    scene.add(ringsGroup);

    const createHoloRing = (radius: number, tube: number, color: number, rotation: [number, number, number]) => {
      const ringGeom = new THREE.TorusGeometry(radius, tube, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.set(...rotation);
      return ring;
    };

    const ring1 = createHoloRing(3.2, 0.02, 0x00f3ff, [Math.PI / 2, 0, 0]);
    const ring2 = createHoloRing(3.6, 0.02, 0xa855f7, [Math.PI / 3, Math.PI / 4, 0]);
    const ring3 = createHoloRing(4.0, 0.015, 0x10b981, [Math.PI / 6, -Math.PI / 3, 0]);
    ringsGroup.add(ring1, ring2, ring3);

    // 7. Volumetric Laser Scanner Plane
    const laserGeom = new THREE.RingGeometry(0.1, 4.2, 64);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const laserScanner = new THREE.Mesh(laserGeom, laserMat);
    laserScanner.rotation.x = Math.PI / 2;
    scene.add(laserScanner);
    laserScannerRef.current = laserScanner;

    // 8. Volumetric Light Column
    const cylinderGeom = new THREE.CylinderGeometry(0.2, 2.5, 10, 32, 1, true);
    const cylinderMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const lightColumn = new THREE.Mesh(cylinderGeom, cylinderMat);
    scene.add(lightColumn);

    // 9. Particle Starfield Nebula (3,500 particles)
    const particleCount = 3500;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x00f3ff),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x10b981),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution
      const radius = 2.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      const clr = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = clr.r;
      particleColors[i * 3 + 1] = clr.g;
      particleColors[i * 3 + 2] = clr.b;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const starfield = new THREE.Points(particleGeom, particleMat);
    scene.add(starfield);

    // 10. Interactive Project Nodes in 3D Space
    const nodesGroup = new THREE.Group();
    nodesGroupRef.current = nodesGroup;
    scene.add(nodesGroup);
    nodeMeshesRef.current = [];

    PROJECTS.forEach((proj) => {
      const nodeSubGroup = new THREE.Group();
      const [x, y, z] = proj.sphereCoords;
      nodeSubGroup.position.set(x, y, z);

      // Node core sphere
      const nodeGeom = new THREE.SphereGeometry(0.24, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.nodeColor),
        emissive: new THREE.Color(proj.nodeColor),
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.userData = { projectId: proj.id, project: proj };
      nodeSubGroup.add(nodeMesh);

      // Node holographic pulsing halo ring
      const haloGeom = new THREE.RingGeometry(0.32, 0.38, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(proj.nodeColor),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const haloMesh = new THREE.Mesh(haloGeom, haloMat);
      haloMesh.lookAt(camera.position);
      nodeSubGroup.add(haloMesh);

      // Laser connector beam from node to core
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(proj.nodeColor),
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-x * 0.7, -y * 0.7, -z * 0.7)
      ]);
      const connectorLine = new THREE.Line(lineGeom, lineMat);
      nodeSubGroup.add(connectorLine);

      nodesGroup.add(nodeSubGroup);
      nodeMeshesRef.current.push({ mesh: nodeMesh, project: proj, glowMesh: haloMesh });
    });

    setCanvasReady(true);

    // 11. Mouse & Touch Interaction Raycasting
    const raycaster = new THREE.Raycaster();
    const mouseNormalized = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseNormalized.x = (clientX / rect.width) * 2 - 1;
      mouseNormalized.y = -(clientY / rect.height) * 2 + 1;

      // Parallax mouse damping
      mousePosRef.current = {
        x: mouseNormalized.x * 0.8,
        y: mouseNormalized.y * 0.8
      };

      if (isDraggingRef.current) {
        const deltaX = e.clientX - prevMousePosRef.current.x;
        const deltaY = e.clientY - prevMousePosRef.current.y;
        if (coreGroupRef.current) {
          coreGroupRef.current.rotation.y += deltaX * 0.005;
          coreGroupRef.current.rotation.x += deltaY * 0.005;
        }
        if (nodesGroupRef.current) {
          nodesGroupRef.current.rotation.y += deltaX * 0.005;
          nodesGroupRef.current.rotation.x += deltaY * 0.005;
        }
        prevMousePosRef.current = { x: e.clientX, y: e.clientY };
        return;
      }

      // Check node hover raycasting
      raycaster.setFromCamera(mouseNormalized, camera);
      const meshesToTest = nodeMeshesRef.current.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matched = nodeMeshesRef.current.find((n) => n.mesh === hit);
        if (matched) {
          if (!hoveredNode || hoveredNode.id !== matched.project.id) {
            setHoveredNode(matched.project);
            holoAudio.playNodeHover();
          }
          container.style.cursor = "pointer";
          return;
        }
      }

      if (hoveredNode) {
        setHoveredNode(null);
      }
      container.style.cursor = "grab";
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: MouseEvent) => {
      const deltaX = Math.abs(e.clientX - prevMousePosRef.current.x);
      const deltaY = Math.abs(e.clientY - prevMousePosRef.current.y);

      // If it was a clean click rather than a drag
      if (deltaX < 5 && deltaY < 5) {
        raycaster.setFromCamera(mouseNormalized, camera);
        const meshesToTest = nodeMeshesRef.current.map((n) => n.mesh);
        const intersects = raycaster.intersectObjects(meshesToTest);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const matched = nodeMeshesRef.current.find((n) => n.mesh === hit);
          if (matched) {
            holoAudio.playNodeSelect();
            onSelectProject(matched.project);
          }
        }
      }

      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.005;
      const curDist = targetCamPosRef.current.length();
      const nextDist = Math.max(3.8, Math.min(18.0, curDist + zoomFactor));
      targetCamPosRef.current.setLength(nextDist);
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    container.addEventListener("wheel", handleWheel, { passive: false });

    // 12. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 13. Animation Loop (60-120fps)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation (lerp)
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.05);
        currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
        cameraRef.current.lookAt(currentLookAtRef.current);
      }

      // Auto rotation of concentric spheres & rings
      if (isAutoRotating) {
        if (coreGroupRef.current) {
          coreGroupRef.current.rotation.y = elapsedTime * 0.12;
          coreGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.08) * 0.1;
        }

        if (ringsGroupRef.current) {
          ring1.rotation.z = elapsedTime * 0.2;
          ring2.rotation.x = elapsedTime * 0.15;
          ring3.rotation.y = -elapsedTime * 0.18;
        }

        if (nodesGroupRef.current) {
          nodesGroupRef.current.rotation.y = elapsedTime * 0.05;
        }
      }

      // Laser Scanner sweeping animation
      if (laserScannerRef.current) {
        laserScannerRef.current.position.y = Math.sin(elapsedTime * 1.5) * 2.8;
      }

      // Pulse and billboard halo meshes to face camera
      if (cameraRef.current) {
        nodeMeshesRef.current.forEach(({ glowMesh, project }, idx) => {
          glowMesh.lookAt(cameraRef.current!.position);
          const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * 0.15;
          glowMesh.scale.set(pulse, pulse, pulse);

          // Highlight if selected
          if (selectedProjectId === project.id) {
            glowMesh.scale.set(pulse * 1.6, pulse * 1.6, pulse * 1.6);
          }
        });
      }

      // Starfield gentle rotation
      if (starfield) {
        starfield.rotation.y = -elapsedTime * 0.015;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      container.removeEventListener("wheel", handleWheel);

      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [onSelectProject, selectedProjectId, isAutoRotating, hoveredNode]);

  return (
    <div className={`relative w-full h-full min-h-[500px] select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Hologram HUD Top-Left Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-xs text-cyan-400 space-y-1">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded border border-cyan-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="tracking-wider">OMNI-SPHERE v3.8</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">120 FPS</span>
          <span className="text-slate-500">|</span>
          <span className="text-purple-400">7 ACTIVE NODES</span>
        </div>
      </div>

      {/* Camera Preset Toolbar & Auto-Rotate Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="flex items-center bg-slate-950/85 backdrop-blur-md p-1 rounded-lg border border-cyan-500/30 shadow-lg">
          <button
            onClick={() => switchCameraView("orbit")}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1.5 transition-all ${
              cameraMode === "orbit"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "text-slate-400 hover:text-cyan-300"
            }`}
            title="Orbit View"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Orbit</span>
          </button>

          <button
            onClick={() => switchCameraView("core")}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1.5 transition-all ${
              cameraMode === "core"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "text-slate-400 hover:text-cyan-300"
            }`}
            title="Core View"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Core</span>
          </button>

          <button
            onClick={() => switchCameraView("wide")}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1.5 transition-all ${
              cameraMode === "wide"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "text-slate-400 hover:text-cyan-300"
            }`}
            title="Deep Wide"
          >
            <ZoomOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wide</span>
          </button>

          <button
            onClick={() => switchCameraView("top")}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1.5 transition-all ${
              cameraMode === "top"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "text-slate-400 hover:text-cyan-300"
            }`}
            title="Zenith View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zenith</span>
          </button>
        </div>

        <button
          onClick={() => {
            setIsAutoRotating(!isAutoRotating);
            holoAudio.playNodeHover();
          }}
          className={`p-2 rounded-lg border backdrop-blur-md transition-all ${
            isAutoRotating
              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
              : "bg-slate-950/80 text-slate-400 border-slate-700"
          }`}
          title={isAutoRotating ? "Pause Auto Rotation" : "Resume Auto Rotation"}
        >
          <RotateCw className={`w-4 h-4 ${isAutoRotating ? "animate-spin text-cyan-400" : ""}`} />
        </button>
      </div>

      {/* Hovered 3D Node Holographic HUD Card */}
      {hoveredNode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto max-w-md w-[90%] sm:w-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="holo-panel p-4 rounded-xl border border-cyan-400/60 shadow-2xl bg-slate-950/90 text-left">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-500/30">
                {hoveredNode.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {hoveredNode.status}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-100 tracking-wide font-mono">
              {hoveredNode.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2 mt-1">
              {hoveredNode.tagline}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-cyan-500/20 pt-2">
              <span className="text-[11px] font-mono text-slate-400">
                Node Target: <span className="text-cyan-300">[{hoveredNode.sphereCoords.join(", ")}]</span>
              </span>
              <button
                onClick={() => onSelectProject(hoveredNode)}
                className="text-xs font-mono text-cyan-300 hover:text-white bg-cyan-500/30 hover:bg-cyan-500/50 px-3 py-1 rounded transition-colors border border-cyan-400/40"
              >
                Inspect Case Study &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hologram Reticle Center Guide */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border border-cyan-500/10 pointer-events-none animate-ping opacity-20" />
      </div>

      {/* Hologram Depth Scanline Filter */}
      <div className="holo-scanlines absolute inset-0 pointer-events-none opacity-40" />
    </div>
  );
}
