"use client";

import { useEffect, useState } from "react";

export function useCanvasOptimization(maxPixelRatio: number = 1.5) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      setIsActive(document.visibilityState === "visible");
    };
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  void maxPixelRatio;
  return isActive;
}
