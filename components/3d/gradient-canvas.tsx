"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useCanvasOptimization } from "./optimization";

const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false }
);

export default function GradientCanvas() {
  const isActive = useCanvasOptimization(1.8);

  return (
    <div
      className="fixed inset-0 -z-50 w-full h-full pointer-events-none overflow-hidden"
      style={{
        background: "#000000",
        contentVisibility: "auto",
        containIntrinsicSize: "100vh",
      }}
    >
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 1.5] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
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
    </div>
  );
}
