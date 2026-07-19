"use client";

import { useEffect, useRef } from "react";

const COOLDOWN_MS = 900;
const SECTION_SELECTOR = "main > section, main > div > section, footer";
const SKIP_TARGETS = "textarea, select, input";
const EDGE_TOLERANCE = 1;

export default function ScrollJacker() {
  const locked = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    function getSections() {
      return Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
    }

    function isSkipTarget(target: EventTarget | null) {
      return target instanceof Element && target.closest(SKIP_TARGETS);
    }

    function currentIndex(sections: HTMLElement[]) {
      const y = window.scrollY;
      let idx = 0;
      let minDist = Infinity;
      sections.forEach((s, i) => {
        const dist = Math.abs(s.offsetTop - y);
        if (dist < minDist) {
          minDist = dist;
          idx = i;
        }
      });
      return idx;
    }

    function goTo(index: number) {
      const sections = getSections();
      const clamped = Math.max(0, Math.min(sections.length - 1, index));
      const target = sections[clamped];
      if (!target) return;
      locked.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        locked.current = false;
      }, COOLDOWN_MS);
    }

    function canScrollWithin(section: HTMLElement | undefined, direction: 1 | -1) {
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      if (direction > 0) return rect.bottom - window.innerHeight > EDGE_TOLERANCE;
      return rect.top < -EDGE_TOLERANCE;
    }

    function onWheel(e: WheelEvent) {
      if (isSkipTarget(e.target)) return;
      if (Math.abs(e.deltaY) < 2) return;
      if (locked.current) {
        e.preventDefault();
        return;
      }
      const sections = getSections();
      const direction = e.deltaY > 0 ? 1 : -1;
      if (canScrollWithin(sections[currentIndex(sections)], direction)) return;
      e.preventDefault();
      goTo(currentIndex(sections) + direction);
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (isSkipTarget(e.target)) return;
      if (locked.current) {
        e.preventDefault();
        return;
      }
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < 2) return;
      const sections = getSections();
      const direction = deltaY > 0 ? 1 : -1;
      if (canScrollWithin(sections[currentIndex(sections)], direction)) return;
      e.preventDefault();
    }

    function onTouchEnd(e: TouchEvent) {
      if (isSkipTarget(e.target)) return;
      if (locked.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 40) return;
      const sections = getSections();
      const direction = deltaY > 0 ? 1 : -1;
      if (canScrollWithin(sections[currentIndex(sections)], direction)) return;
      goTo(currentIndex(sections) + direction);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
