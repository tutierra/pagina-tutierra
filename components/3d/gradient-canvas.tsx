"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useCanvasOptimization } from "./optimization";

const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false }
);

// Gradiente CSS de marca (mismos tonos que el shader). Se usa siempre como base
// y como reemplazo completo en móvil/dispositivos de baja potencia, donde
// compilar el shader WebGL bloqueaba el hilo principal y congelaba TODA la
// animación (nav, carruseles, reveals).
const CSS_GRADIENT =
  "radial-gradient(120% 90% at 78% 18%, #1B3D2F 0%, #0c2318 32%, #071009 62%, #05100b 100%)";

function useHeavyGfxAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    const smallScreen = window.innerWidth < 1024;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const fewCores =
      typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    // Solo corre el shader WebGL en equipos de escritorio con recursos.
    setAllowed(!coarse && !smallScreen && !lowMem && !fewCores && !reduced);
  }, []);
  return allowed;
}

export default function GradientCanvas() {
  const isActive = useCanvasOptimization(1.8);
  const heavyOk = useHeavyGfxAllowed();

  return (
    <div
      className="fixed inset-0 -z-50 h-full w-full overflow-hidden pointer-events-none"
      style={{
        background: CSS_GRADIENT,
        contentVisibility: "auto",
        containIntrinsicSize: "100vh",
      }}
    >
      {heavyOk && (
        <Canvas
          camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 1.5] }}
          gl={{ antialias: true, alpha: false, powerPreference: "default" }}
          dpr={[1, 1.8]}
          frameloop={isActive ? "always" : "demand"}
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          <Suspense fallback={null}>
            <ShaderGradient
              {...({
                control: "props",
                animate: isActive ? "on" : "off",
                axesHelper: "off",
                brightness: 0.35,
                cAzimuthAngle: 250,
                cDistance: 1.5,
                cPolarAngle: 140,
                cameraZoom: 12.5,
                color1: "#1B3D2F",
                color2: "#080C0A",
                color3: "#000000",
                destination: "onCanvas",
                embedMode: "off",
                envPreset: "city",
                fov: 45,
                gizmoHelper: "hide",
                grain: "off",
                lightType: "3d",
                pixelDensity: 1,
                positionX: 0,
                positionY: 0,
                positionZ: 0,
                range: "disabled",
                rangeEnd: 40,
                rangeStart: 0,
                reflection: 0.5,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 140,
                shader: "defaults",
                type: "sphere",
                uAmplitude: 7,
                uDensity: 0.8,
                uFrequency: 5.5,
                uSpeed: 0.3,
                uStrength: 0.4,
                uTime: 0,
                wireframe: false,
              } as any)}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
