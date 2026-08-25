// Image Gallery — Originkit
// Using component defaults.

// @ts-nocheck
"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

const ZONES = [
    { cx: 18, cy: 18 },
    { cx: 82, cy: 18 },
    { cx: 18, cy: 82 },
    { cx: 82, cy: 82 },
    { cx: 32, cy: 14 },
    { cx: 50, cy: 12 },
    { cx: 68, cy: 14 },
    { cx: 32, cy: 86 },
    { cx: 50, cy: 88 },
    { cx: 68, cy: 86 },
    { cx: 14, cy: 35 },
    { cx: 14, cy: 55 },
    { cx: 14, cy: 72 },
    { cx: 86, cy: 35 },
    { cx: 86, cy: 55 },
    { cx: 86, cy: 72 },
    { cx: 28, cy: 28 },
    { cx: 72, cy: 28 },
    { cx: 28, cy: 72 },
    { cx: 72, cy: 72 },
    { cx: 42, cy: 16 },
    { cx: 58, cy: 16 },
    { cx: 42, cy: 84 },
    { cx: 58, cy: 84 },
    { cx: 16, cy: 45 },
    { cx: 84, cy: 45 },
]

const ASPECT_RATIOS = [
    { w: 200, h: 200 },
    { w: 240, h: 240 },
    { w: 280, h: 280 },
    { w: 160, h: 250 },
    { w: 180, h: 280 },
    { w: 280, h: 165 },
    { w: 340, h: 195 },
    { w: 220, h: 150 },
]

const SPIRAL_PATHS = Array.from({ length: 20 }, () => ({
    startAngle: Math.random() * Math.PI * 2,
    spinDir: Math.random() < 0.5 ? 1 : -1,
    turns: 1.2 + Math.random() * 0.8,
}))

function rand(min, max) {
    return min + Math.random() * (max - min)
}
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function framerEaseToGsap(ease) {
    if (!ease || ease === "linear") return "none"
    if (Array.isArray(ease))
        return `cubic-bezier(${ease[0]},${ease[1]},${ease[2]},${ease[3]})`
    const map = {
        easeIn: "power2.in",
        easeOut: "power2.out",
        easeInOut: "power2.inOut",
        circIn: "circ.in",
        circOut: "circ.out",
        circInOut: "circ.inOut",
        backIn: "back.in",
        backOut: "back.out",
        backInOut: "back.inOut",
        anticipate: "back.inOut(1.7)",
        bounceIn: "bounce.in",
        bounceOut: "bounce.out",
    }
    return map[ease] ?? "power2.out"
}

function extractUrl(item) {
    if (!item) return null
    if (typeof item === "string") return item.trim() || null
    if (typeof item === "object") {
        const url =
            item.src || item.url || item.srcSet?.split?.(" ")?.[0] || null
        return typeof url === "string" ? url.trim() || null : null
    }
    return null
}

export default function ImageGallery(props) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        background,
        images,
        imageScale,
        blankArea,
        crowdDensity,
        crowdDelay,
        type,
        direction,
        appear,
        disappear,
    } = props
    const animType = type ?? "straight"
    const spiralDir = direction ?? "both"

    const containerRef = useRef(null)
    const zoneIdxRef = useRef(0)
    const zIndexRef = useRef(1)
    const timerRef = useRef(null)
    const pausedRef = useRef(false)
    const activeCountRef = useRef(0)
    const recentImgsRef = useRef([])
    const imagePoolRef = useRef([])
    const backgroundRef = useRef(background ?? "transparent")
    const imageScaleRef = useRef(imageScale ?? 4.8)
    const blankAreaRef = useRef(blankArea ?? 45)
    const crowdDensityRef = useRef(crowdDensity ?? 10)
    const crowdDelayRef = useRef(crowdDelay ?? 0)
    const typeRef = useRef(animType)
    const dirRef = useRef(spiralDir)
    const appearRef = useRef(appear)
    const disappearRef = useRef(disappear)

    backgroundRef.current = background ?? "transparent"
    imageScaleRef.current = imageScale ?? 4.8
    blankAreaRef.current = blankArea ?? 45
    crowdDensityRef.current = crowdDensity ?? 10
    crowdDelayRef.current = crowdDelay ?? 0
    typeRef.current = animType
    dirRef.current = spiralDir
    appearRef.current = appear
    disappearRef.current = disappear

    const FALLBACK_IMAGES = [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581579438747-1dc8d17fce2c?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80",
    ]
    const userInput = Array.isArray(images)
        ? images.map(extractUrl).filter(Boolean)
        : []
    const userUrls = userInput.length > 0 ? userInput : FALLBACK_IMAGES
    imagePoolRef.current = userUrls

    function getUniqueImage() {
        const pool = imagePoolRef.current
        if (pool.length === 0) return null
        const recent = recentImgsRef.current
        let available = pool.filter((img) => !recent.includes(img))
        if (available.length === 0) {
            recentImgsRef.current = []
            available = pool
        }
        const selected = pick(available)
        recentImgsRef.current.push(selected)
        if (recentImgsRef.current.length > Math.max(3, pool.length - 1))
            recentImgsRef.current.shift()
        return selected
    }

    useEffect(() => {
        recentImgsRef.current = []
    }, [images])
    useEffect(() => {
        userUrls.forEach((src) => {
            const i = new Image()
            i.src = src
        })
    }, [images])

    useEffect(() => {
        let gsapScript = document.getElementById("ma-gsap")
        if (!gsapScript) {
            gsapScript = document.createElement("script")
            gsapScript.id = "ma-gsap"
            gsapScript.src =
                "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
            gsapScript.async = true
            document.head.appendChild(gsapScript)
        }

        function init() {
            const gsap = window.gsap

            function handleVisibilityChange() {
                if (document.hidden) {
                    pausedRef.current = true
                    gsap.globalTimeline.pause()
                    containerRef.current
                        ?.querySelectorAll("[data-tile]")
                        .forEach((el) => el.remove())
                } else {
                    pausedRef.current = false
                    gsap.globalTimeline.resume()
                }
            }
            document.addEventListener(
                "visibilitychange",
                handleVisibilityChange
            )

            function spawnTile() {
                if (pausedRef.current) return
                const container = containerRef.current
                if (!container) return

                const imgSrc = getUniqueImage()
                if (!imgSrc) return

                const zone = ZONES[zoneIdxRef.current % ZONES.length]
                zoneIdxRef.current++

                const shape = pick(ASPECT_RATIOS)

                const containerW = containerRef.current?.offsetWidth || 800
                const containerH = containerRef.current?.offsetHeight || 600

                const userScale =
                    0.125 + ((imageScaleRef.current - 1) / 19) * 4.875
                const maxByWidth = containerW / shape.w
                const maxByHeight = containerH / shape.h
                const effectiveScale = Math.min(
                    userScale,
                    maxByWidth,
                    maxByHeight
                )
                const tileW = Math.round(shape.w * effectiveScale)
                const tileH = Math.round(shape.h * effectiveScale)

                const s0 = rand(0.1, 0.4)
                const s2 = rand(0.7, 1.1)
                const s3 = rand(3.0, 4.5)

                const centerX = containerW / 2
                const centerY = containerH / 2
                const zoneAngle = Math.atan2(zone.cy - 50, zone.cx - 50)
                const angleJitter = rand(-0.25, 0.25)
                const angle = zoneAngle + angleJitter + rand(-0.3, 0.3)

                const isSpiralModeForSpawn = typeRef.current === "spiral"
                const spawnRadius = isSpiralModeForSpawn
                    ? 0
                    : (blankAreaRef.current / 100) *
                      Math.hypot(containerW / 2, containerH / 2)

                const spawnX_px = centerX + Math.cos(angle) * spawnRadius
                const spawnY_px = centerY + Math.sin(angle) * spawnRadius
                const cosA = Math.cos(angle)
                const sinA = Math.sin(angle)

                const el = document.createElement("div")
                el.setAttribute("data-tile", "1")
                el.style.cssText = `
                    position: absolute;
                    width: ${tileW}px;
                    height: ${tileH}px;
                    left: ${spawnX_px}px;
                    top: ${spawnY_px}px;
                    transform-origin: center center;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.1);
                    z-index: ${zIndexRef.current++};
                    pointer-events: none;
                    will-change: transform, opacity;
                    translate: -50% -50%;
                    background: ${backgroundRef.current};
                    opacity: 0;
                `

                const imgEl = document.createElement("img")
                imgEl.alt = ""
                imgEl.loading = "eager"
                imgEl.decoding = "async"
                imgEl.referrerPolicy = "no-referrer"
                imgEl.style.cssText =
                    "width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(10%);"

                el.appendChild(imgEl)
                container.appendChild(el)
                activeCountRef.current++

                function startAnimation() {
                    if (pausedRef.current) {
                        activeCountRef.current--
                        el.remove()
                        return
                    }

                    const appearDir = appearRef.current?.style ?? "inToOut"
                    const disappearDir =
                        disappearRef.current?.style ?? "inToOut"

                    const entryDur = appearRef.current?.ease?.duration ?? 1.0
                    const holdDur = appearRef.current?.ease?.delay ?? 1.5
                    const zoopDur = disappearRef.current?.ease?.duration ?? 0.8
                    const entryEase = framerEaseToGsap(
                        appearRef.current?.ease?.ease ?? "easeOut"
                    )
                    const exitEase = framerEaseToGsap(
                        disappearRef.current?.ease?.ease ?? "easeIn"
                    )

                    const exitSign = disappearDir === "inToOut" ? 1 : -1
                    const exitScale = disappearDir === "inToOut" ? s3 : 0.08
                    const fadeOutPct = disappearRef.current?.fadeOut ?? 100
                    const fadeDur = zoopDur * (fadeOutPct / 100)

                    const entryD = rand(80, 140)
                    const exitD = rand(160, 260)

                    const onDone = () => {
                        gsap.set(el, { opacity: 0 })
                        el.remove()
                        activeCountRef.current--
                    }

                    const isSpiral = typeRef.current === "spiral"

                    if (isSpiral) {
                        const path =
                            SPIRAL_PATHS[
                                Math.floor(Math.random() * SPIRAL_PATHS.length)
                            ]
                        const R =
                            Math.hypot(containerW / 2, containerH / 2) * 1.1
                        const startA = path.startAngle
                        const dirSetting = dirRef.current
                        const spinDir =
                            dirSetting === "clockwise"
                                ? 1
                                : dirSetting === "anticlockwise"
                                  ? -1
                                  : path.spinDir
                        const turns = path.turns

                        const startR = appearDir === "inToOut" ? 0 : R
                        const endR = disappearDir === "inToOut" ? R : 0
                        const midR = R * (blankAreaRef.current / 100)

                        const mid = pick([0.45, 0.5, 0.55])
                        const pathPos = (u: number) => {
                            const r =
                                u <= mid
                                    ? startR + (midR - startR) * (u / mid)
                                    : midR +
                                      (endR - midR) * ((u - mid) / (1 - mid))
                            const a = startA + spinDir * u * turns * Math.PI * 2
                            return [Math.cos(a) * r, Math.sin(a) * r]
                        }

                        const scaleAt = (u: number) =>
                            appearDir === "inToOut" ? s2 * u : s2 * (1 - u)

                        const [sx, sy] = pathPos(0)
                        const tl = gsap.timeline({ onComplete: onDone })
                        tl.set(el, {
                            scale: scaleAt(0),
                            opacity: 0,
                            x: sx,
                            y: sy,
                            rotation: 0,
                        })

                        const totalDur = entryDur + holdDur + zoopDur
                        const appearEnd = entryDur
                        const driftEnd = entryDur + holdDur
                        const big = { t: 0 }
                        tl.to(big, {
                            t: 1,
                            duration: totalDur,
                            ease: "none",
                            onUpdate: () => {
                                const t = big.t
                                const realT = t * totalDur
                                const u = Math.max(
                                    0,
                                    Math.min(
                                        1,
                                        t + Math.sin(t * Math.PI * 2) * 0.12
                                    )
                                )
                                let op: number
                                if (realT < appearEnd) {
                                    op = entryDur > 0 ? realT / entryDur : 1
                                } else if (realT < driftEnd) {
                                    op = 1
                                } else {
                                    const since = realT - driftEnd
                                    op =
                                        fadeDur > 0
                                            ? Math.max(0, 1 - since / fadeDur)
                                            : 0
                                }
                                const [x, y] = pathPos(u)
                                gsap.set(el, {
                                    x,
                                    y,
                                    opacity: op,
                                    scale: scaleAt(u),
                                })
                            },
                        })
                    } else if (appearDir === "inToOut") {
                        const x1 = cosA * entryD
                        const y1 = sinA * entryD
                        const x2 = x1 + exitSign * cosA * exitD
                        const y2 = y1 + exitSign * sinA * exitD
                        const driftF = 0.15
                        const xD = x1 + (x2 - x1) * driftF
                        const yD = y1 + (y2 - y1) * driftF
                        const scaleD = s2 + (exitScale - s2) * driftF

                        const tl = gsap
                            .timeline({ onComplete: onDone })
                            .set(el, {
                                scale: s0,
                                opacity: 1,
                                x: 0,
                                y: 0,
                                rotation: 0,
                            })
                            .to(el, {
                                scale: s2,
                                x: x1,
                                y: y1,
                                duration: entryDur,
                                ease: entryEase,
                            })
                        if (holdDur > 0) {
                            tl.to(el, {
                                scale: scaleD,
                                x: xD,
                                y: yD,
                                duration: holdDur,
                                ease: "none",
                            })
                        }
                        tl.to(el, {
                            scale: exitScale,
                            x: x2,
                            y: y2,
                            duration: zoopDur,
                            ease: exitEase,
                        }).to(
                            el,
                            {
                                opacity: 0,
                                duration: fadeDur,
                                ease: exitEase,
                            },
                            "<"
                        )
                    } else {
                        const startX = cosA * entryD * 2.5
                        const startY = sinA * entryD * 2.5
                        const exitX = exitSign * cosA * exitD
                        const exitY = exitSign * sinA * exitD
                        const driftF = 0.15
                        const xD = (exitX - 0) * driftF
                        const yD = (exitY - 0) * driftF
                        const scaleD = s2 + (exitScale - s2) * driftF

                        const tl = gsap
                            .timeline({ onComplete: onDone })
                            .set(el, {
                                scale: s3,
                                opacity: 0,
                                x: startX,
                                y: startY,
                                rotation: 0,
                            })
                            .to(el, {
                                scale: s2,
                                opacity: 1,
                                x: 0,
                                y: 0,
                                duration: entryDur,
                                ease: entryEase,
                            })
                        if (holdDur > 0) {
                            tl.to(el, {
                                scale: scaleD,
                                x: xD,
                                y: yD,
                                duration: holdDur,
                                ease: "none",
                            })
                        }
                        tl.to(el, {
                            scale: exitScale,
                            x: exitX,
                            y: exitY,
                            duration: zoopDur,
                            ease: exitEase,
                        }).to(
                            el,
                            {
                                opacity: 0,
                                duration: fadeDur,
                                ease: exitEase,
                            },
                            "<"
                        )
                    }
                }

                imgEl.onerror = () => {
                    activeCountRef.current--
                    el.remove()
                }
                imgEl.src = imgSrc

                if (typeof imgEl.decode === "function") {
                    imgEl
                        .decode()
                        .then(startAnimation)
                        .catch(() => {
                            activeCountRef.current--
                            el.remove()
                        })
                } else {
                    imgEl.complete && imgEl.naturalWidth > 0
                        ? startAnimation()
                        : (imgEl.onload = startAnimation)
                }
            }

            let lastSpawn = 0
            let batchCount = 0
            let nextBatchAt = 0
            timerRef.current = setInterval(() => {
                if (pausedRef.current) return
                const target = Math.max(1, Math.round(crowdDensityRef.current))
                const delaySec = Math.max(0, crowdDelayRef.current)
                const now = performance.now()

                if (delaySec === 0) {
                    const entryDur = appearRef.current?.ease?.duration ?? 1.0
                    const holdDur = appearRef.current?.ease?.delay ?? 1.5
                    const zoopDur = disappearRef.current?.ease?.duration ?? 0.8
                    const lifetimeMs = (entryDur + holdDur + zoopDur) * 1000
                    const spawnInterval = Math.max(20, lifetimeMs / target)
                    if (now - lastSpawn >= spawnInterval) {
                        spawnTile()
                        lastSpawn = now
                    }
                    return
                }

                if (now < nextBatchAt) return
                if (batchCount < target) {
                    if (now - lastSpawn >= 50) {
                        spawnTile()
                        batchCount++
                        lastSpawn = now
                        if (batchCount >= target) {
                            nextBatchAt = now + delaySec * 1000
                            batchCount = 0
                        }
                    }
                }
            }, 20)

            gsapScript._visCleanup = () =>
                document.removeEventListener(
                    "visibilitychange",
                    handleVisibilityChange
                )
        }

        if (window.gsap) {
            init()
        } else {
            gsapScript.addEventListener("load", init)
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
            gsapScript._visCleanup?.()
            const w = window as any
            if (w.gsap) {
                try {
                    w.gsap.globalTimeline.clear()
                } catch {}
            }
            containerRef.current
                ?.querySelectorAll("[data-tile]")
                .forEach((el) => el.remove())
            activeCountRef.current = 0
            zoneIdxRef.current = 0
            zIndexRef.current = 1
            recentImgsRef.current = []
        }
    }, [
        images,
        background,
        imageScale,
        blankArea,
        crowdDensity,
        crowdDelay,
        animType,
        spiralDir,
        appear,
        disappear,
    ])

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: background ?? "transparent",
                overflow: "hidden",
            }}
        >
            {/* Dot grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.06,
                    pointerEvents: "none",
                    backgroundImage:
                        "radial-gradient(circle,rgba(255,255,255,0.5) 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
        </div>
    )
}

const COMPONENT_DEFAULTS = {
    images: [
        { src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1581579438747-1dc8d17fce2c?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80" },
        { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop&q=80" },
    ],
    type: "straight",
    direction: "clockwise",
    appear: {
        style: "outToIn",
        ease: {
            type: "tween",
            duration: 1.0,
            delay: 1.5,
            ease: "easeOut",
        },
    },
    disappear: {
        style: "outToIn",
        ease: { type: "tween", duration: 0.8, ease: "easeIn" },
        fadeOut: 100,
    },
    blankArea: 45,
    imageScale: 4.8,
    crowdDensity: 10,
    crowdDelay: 0,
    background: "transparent",
}
