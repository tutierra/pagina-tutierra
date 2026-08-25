// Spin Carousel — Originkit
// Originkit preset `custom-style` — props baked into the default export.
"use client"

import * as React from "react"
import { useRef, useEffect, useCallback, useMemo, useState } from "react"
import { animate } from "framer-motion"

type Motion = {
    type?: "spring" | "tween" | "keyframes" | "inertia"
    duration?: number
    ease?: [number, number, number, number] | string
    delay?: number
    stiffness?: number
    damping?: number
    mass?: number
    bounce?: number
    restSpeed?: number
    restDelta?: number
}

const DEFAULT_TRANSITION: Motion = {
    type: "tween",
    ease: [0.33, 1, 0.68, 1],
    mass: 1,
    damping: 60,
    duration: 1.0,
    stiffness: 800,
}

const FLICK_SCALE = 0.5
const CLICK_SLOP = 6

const SCALE_NEAR = 1.18
const SCALE_FALLOFF = 0.65
const scaleAtRatio = (ratio: number) => SCALE_NEAR - ratio * SCALE_FALLOFF

const FIT_MARGIN = 0.96
const CARD_BASE = 220

const DEFAULT_IMAGES: string[] = [
    "/images/testimonios/cliente-01.jpg",
    "/images/testimonios/cliente-01.jpg",
    "/images/testimonios/cliente-01.jpg",
    "/images/testimonios/cliente-01.jpg",
    "/images/testimonios/cliente-01.jpg",
]

const DEFAULT_ITEMS: string[] = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1690587673708-d6ba8a1579a5?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=900&auto=format&fit=crop&q=60",
]

export interface RadialCardCarouselProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
    items?: string[]
    background?: string
    scale?: number
    aspect?: number
    rounded?: number
    speed?: number
    transition?: Motion
    style?: React.CSSProperties
    onActiveIndexChange?: (index: number) => void
}

function __OriginkitBase_RadialCardCarousel(props: RadialCardCarouselProps) {
    const {
        items = DEFAULT_ITEMS,
        background = "transparent",
        scale = 200,
        aspect = 160,
        rounded = 20,
        speed = 28,
        transition = DEFAULT_TRANSITION,
        style,
        onActiveIndexChange,
        ...rest
    } = props

    const transitionRef = useRef(transition)
    transitionRef.current = transition

    const outerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const rotationRef = useRef<number>(0)
    const animFrameRef = useRef<number>(0)
    const snapAnim = useRef<{ stop: () => void } | null>(null)
    const isDraggingRef = useRef<boolean>(false)
    const autoPlayTimerRef = useRef<number>(0)
    const lastActiveRef = useRef<number>(0)
    const onActiveIndexChangeRef = useRef(onActiveIndexChange)
    onActiveIndexChangeRef.current = onActiveIndexChange

    const [containerSize, setContainerSize] = useState({ w: 800, h: 600 })

    const dragInfo = useRef({
        startX: 0,
        lastX: 0,
        lastTime: 0,
        velocity: 0,
        moved: 0,
        downIndex: -1,
    })

    const serializedItems = JSON.stringify(items)
    const sources = useMemo(() => {
        const list = (items ?? []).filter(Boolean)
        return list.length > 0 ? list : DEFAULT_IMAGES
    }, [serializedItems])

    const multiplier = useMemo(
        // Ensure at least 15 items total in the wheel circle to look full
        () => (sources.length === 0 ? 0 : Math.max(1, Math.ceil(15 / sources.length))),
        [sources.length]
    )

    const CARDS = useMemo(
        () =>
            Array(multiplier)
                .fill(null)
                .flatMap((_, i) => sources.map((src, j) => ({ src, id: `img-${i}-${j}` }))),
        [sources, multiplier]
    )

    const anglePerCard = CARDS.length > 0 ? 360 / CARDS.length : 0
    const cardW = CARD_BASE
    const cardH = Math.max(1, Math.round((CARD_BASE * aspect) / 100))
    const cardRadius = (Math.min(cardW, cardH) / 2) * (Math.min(100, Math.max(0, rounded)) / 100)

    const radius = useMemo(() => {
        const total = CARDS.length
        if (total <= 1) return cardH * 1.2
        const arcTarget = cardW * 0.65
        const R = arcTarget / (2 * Math.sin(Math.PI / total))
        return Math.max(R, cardH * 1.1)
    }, [CARDS.length, cardW, cardH])

    const fit = useMemo(() => {
        if (containerSize.w === 0 || containerSize.h === 0 || CARDS.length === 0) {
            return { scale: 0.65, dx: 0, dy: 0 }
        }
        let minX = Infinity
        let maxX = -Infinity
        let minY = Infinity
        let maxY = -Infinity
        for (let deg = 0; deg < 360; deg += 2) {
            let normalized = deg
            if (normalized > 180) normalized -= 360
            const s = scaleAtRatio(Math.abs(normalized) / 180)
            const rad = (deg * Math.PI) / 180
            const c = Math.cos(rad)
            const sn = Math.sin(rad)
            for (const x of [-cardW / 2, cardW / 2]) {
                for (const y of [-radius, -radius + cardH]) {
                    const px = x * s
                    const py = y * s
                    const rx = px * c - py * sn
                    const ry = px * sn + py * c
                    if (rx < minX) minX = rx
                    if (rx > maxX) maxX = rx
                    if (ry < minY) minY = ry
                    if (ry > maxY) maxY = ry
                }
            }
        }
        const boxW = maxX - minX
        const boxH = maxY - minY
        const zoom =
            Math.min(containerSize.w / boxW, containerSize.h / boxH) *
            FIT_MARGIN *
            (Math.max(1, scale) / 100)
        return {
            scale: zoom,
            dx: -((minX + maxX) / 2) * zoom,
            dy: -((minY + maxY) / 2) * zoom,
        }
    }, [containerSize, radius, cardW, cardH, CARDS.length, scale])

    useEffect(() => {
        const el = outerRef.current
        if (!el) return
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect
            if (width > 0 && height > 0) setContainerSize({ w: width, h: height })
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const updateCardScales = useCallback(() => {
        const currentRot = rotationRef.current
        cardsRef.current.forEach((card, index) => {
            if (!card) return
            const baseAngle = index * anglePerCard
            const cardAngle = baseAngle + currentRot
            let normalized = cardAngle % 360
            if (normalized > 180) normalized -= 360
            if (normalized < -180) normalized += 360
            const dist = Math.abs(normalized)
            const ratio = dist / 180
            const scale = scaleAtRatio(ratio)
            const opacity = 1 - ratio * 0.55
            const brightness = 1 - ratio * 0.65
            const zIndex = Math.round(1000 - dist)

            card.style.transform = `rotate(${baseAngle}deg) scale(${scale})`
            card.style.opacity = String(opacity)
            card.style.filter = `brightness(${brightness})`
            card.style.zIndex = String(zIndex)
        })

        // Determine active card index
        let minDistance = Infinity
        let closestIndex = 0
        cardsRef.current.forEach((card, index) => {
            if (!card) return
            const baseAngle = index * anglePerCard
            const cardAngle = baseAngle + currentRot
            let normalized = cardAngle % 360
            if (normalized > 180) normalized -= 360
            if (normalized < -180) normalized += 360
            const dist = Math.abs(normalized)
            if (dist < minDistance) {
                minDistance = dist
                closestIndex = index
            }
        })

        if (sources.length > 0) {
            const activeItemIndex = closestIndex % sources.length
            if (activeItemIndex !== lastActiveRef.current) {
                lastActiveRef.current = activeItemIndex
                setTimeout(() => {
                    onActiveIndexChangeRef.current?.(activeItemIndex)
                }, 0)
            }
        }
    }, [anglePerCard, sources])

    const framerEaseToGsapStr = (ease: any) => {
        if (Array.isArray(ease)) return `cubic-bezier(${ease[0]},${ease[1]},${ease[2]},${ease[3]})`
        return ease ?? "easeOut"
    }

    const animateTo = useCallback(
        (target: number, scale = 1) => {
            snapAnim.current?.stop()
            const start = rotationRef.current
            const delta = target - start
            const t = transitionRef.current
            const easeVal = framerEaseToGsapStr(t.ease)

            snapAnim.current = animate(0, 1, {
                duration: t.duration ? t.duration * scale : 1.0,
                ease: easeVal as any,
                onUpdate: (p: number) => {
                    rotationRef.current = start + delta * p
                    if (carouselRef.current) {
                        carouselRef.current.style.transform = `rotate(${rotationRef.current}deg)`
                    }
                    updateCardScales()
                },
            })
        },
        [updateCardScales]
    )

    const navigate = useCallback(
        (direction: number) => {
            if (CARDS.length === 0) return
            cancelAnimationFrame(animFrameRef.current)
            snapAnim.current?.stop()
            const target = rotationRef.current + anglePerCard * direction * -1
            const snapped = Math.round(target / anglePerCard) * anglePerCard
            animateTo(snapped)
        },
        [anglePerCard, animateTo, CARDS.length]
    )

    const goToIndex = useCallback(
        (index: number) => {
            if (CARDS.length === 0) return
            cancelAnimationFrame(animFrameRef.current)
            snapAnim.current?.stop()
            const base = -index * anglePerCard
            const turns = Math.round((rotationRef.current - base) / 360)
            animateTo(base + turns * 360)
        },
        [anglePerCard, animateTo, CARDS.length]
    )

    const handlePointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (CARDS.length === 0) return
            isDraggingRef.current = true
            cancelAnimationFrame(animFrameRef.current)
            snapAnim.current?.stop()
            dragInfo.current.startX = e.clientX
            dragInfo.current.lastX = e.clientX
            dragInfo.current.lastTime = Date.now()
            dragInfo.current.velocity = 0
            dragInfo.current.moved = 0
            const hit = (e.target as HTMLElement | null)?.closest?.("[data-index]")
            dragInfo.current.downIndex = hit ? Number((hit as HTMLElement).dataset.index) : -1

            if (containerRef.current) {
                containerRef.current.setPointerCapture(e.pointerId)
                containerRef.current.style.cursor = "grabbing"
            }
        },
        [CARDS.length]
    )

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!isDraggingRef.current) return
            const currentX = e.clientX
            const deltaX = currentX - dragInfo.current.lastX
            const now = Date.now()
            const dt = now - dragInfo.current.lastTime
            if (dt > 0) {
                dragInfo.current.velocity = deltaX / dt
            }
            dragInfo.current.moved = Math.abs(currentX - dragInfo.current.startX)
            rotationRef.current += deltaX * 0.25
            if (carouselRef.current) {
                carouselRef.current.style.transform = `rotate(${rotationRef.current}deg)`
            }
            updateCardScales()
            dragInfo.current.lastX = currentX
            dragInfo.current.lastTime = now
        },
        [updateCardScales]
    )

    const handlePointerUp = useCallback(
        (e?: React.PointerEvent<HTMLDivElement>) => {
            if (!isDraggingRef.current) return
            isDraggingRef.current = false
            if (containerRef.current) {
                containerRef.current.style.cursor = "grab"
                if (e && e.pointerId !== undefined) {
                    try {
                        containerRef.current.releasePointerCapture(e.pointerId)
                    } catch {}
                }
            }
            if (dragInfo.current.moved < CLICK_SLOP && dragInfo.current.downIndex >= 0) {
                goToIndex(dragInfo.current.downIndex)
                return
            }
            const inertiaFactor = 120
            const projectedDelta = dragInfo.current.velocity * inertiaFactor
            const targetRotation = rotationRef.current + projectedDelta
            const snapped = Math.round(targetRotation / anglePerCard) * anglePerCard
            animateTo(snapped)
        },
        [anglePerCard, animateTo, goToIndex]
    )

    const handleWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
            cancelAnimationFrame(animFrameRef.current)
            snapAnim.current?.stop()
            const delta = e.deltaY * 0.15
            rotationRef.current -= delta
            if (carouselRef.current) {
                carouselRef.current.style.transform = `rotate(${rotationRef.current}deg)`
            }
            updateCardScales()

            window.clearTimeout((handleWheel as any).timeout)
            ;(handleWheel as any).timeout = window.setTimeout(() => {
                const snapped = Math.round(rotationRef.current / anglePerCard) * anglePerCard
                animateTo(snapped, FLICK_SCALE)
            }, 150)
        },
        [anglePerCard, animateTo, updateCardScales]
    )

    useEffect(() => {
        if (CARDS.length === 0) return
        rotationRef.current = 0
        if (carouselRef.current) {
            carouselRef.current.style.transform = "rotate(0deg)"
        }
        updateCardScales()
    }, [anglePerCard, CARDS.length, radius])

    useEffect(() => {
        if (speed === 0 || CARDS.length === 0) return
        const dir = speed < 0 ? -1 : 1
        const autoPlayInterval = (3000 * 50) / Math.abs(speed)
        autoPlayTimerRef.current = window.setInterval(() => {
            if (!isDraggingRef.current) {
                navigate(dir)
            }
        }, autoPlayInterval)
        return () => clearInterval(autoPlayTimerRef.current)
    }, [speed, navigate, CARDS.length])

    useEffect(() => {
        return () => {
            cancelAnimationFrame(animFrameRef.current)
            snapAnim.current?.stop()
        }
    }, [])

    return (
        <div
            {...rest}
            ref={outerRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "visible", // Let cards overflow container boundaries to prevent flattening
                userSelect: "none",
                touchAction: "none",
                backgroundColor: background,
                ...style,
            }}
        >
            <div
                ref={containerRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "grab",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onWheel={handleWheel}
            >
                <div
                    style={{
                        transform: `translate(${fit.dx}px, ${fit.dy}px) scale(${fit.scale})`,
                        transformOrigin: "center",
                    }}
                >
                    <div
                        ref={carouselRef}
                        style={{
                            position: "relative",
                            width: 0,
                            height: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {CARDS.map((card, index) => {
                            const baseAngle = (index / CARDS.length) * 360
                            return (
                                <div
                                    key={card.id}
                                    ref={(el) => {
                                        cardsRef.current[index] = el
                                    }}
                                    data-index={index}
                                    style={{
                                        position: "absolute",
                                        left: -(cardW / 2),
                                        top: -radius,
                                        width: cardW,
                                        height: cardH,
                                        transformOrigin: `50% ${radius}px`,
                                        transform: `rotate(${baseAngle}deg)`,
                                        willChange: "transform, opacity, filter",
                                    }}
                                >
                                    <img
                                        src={card.src}
                                        alt=""
                                        draggable={false}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                            borderRadius: cardRadius,
                                            pointerEvents: "none",
                                            backgroundColor: "#16161e",
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

RadialCardCarousel.displayName = "Radial Image Carousel"

const __originkitPresetProps = {
  "scale": 160,
  "aspect": 160,
  "rounded": 20,
  "speed": 28
};

export default function RadialCardCarousel(props: RadialCardCarouselProps) {
  return <__OriginkitBase_RadialCardCarousel {...(__originkitPresetProps as any)} {...props} />;
}
