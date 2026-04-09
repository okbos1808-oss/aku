"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useCallback } from "react"

const images = [
  "/assets/1.jpg",
  "/assets/2.jpg",
  "/assets/3.jpg",
  "/assets/4.jpg",
  "/assets/5.jpg",
  "/assets/6.jpg",
]

export default function ImageCarousel() {
  const containerRef = useRef(null)
  const [index, setIndex] = useState(0)

  const scrollToIndex = useCallback((i) => {
    if (!containerRef.current) return
    const width = containerRef.current.clientWidth
    containerRef.current.scrollTo({
      left: width * i,
      behavior: "smooth",
    })
  }, [])

  const next = useCallback(() => {
    setIndex((prev) => {
      const i = (prev + 1) % images.length
      scrollToIndex(i)
      return i
    })
  }, [scrollToIndex])

  const prev = useCallback(() => {
    setIndex((prev) => {
      const i = (prev - 1 + images.length) % images.length
      scrollToIndex(i)
      return i
    })
  }, [scrollToIndex])

  useEffect(() => {
    const interval = setInterval(next, 20000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div
      className="
        relative mx-auto
        w-full
        max-w-xs
        sm:max-w-sm
        md:max-w-2xl
        lg:max-w-4xl
      "
    >
      {/* TRACK */}
      <div
        ref={containerRef}
        className="flex overflow-hidden rounded-2xl shadow-xl"
      >
        {images.map((src, i) => (
          <div key={i} className="min-w-full">
       <Image
  src={src}
  alt={`Image ${i + 1}`}
  width={1200}
  height={600}
  className="
    w-full object-cover
    h-45
    sm:h-55
    md:h-80
    lg:h-105
  "
  priority={i === 0}
/>


          </div>
        ))}
      </div>

      {/* BUTTON LEFT */}
      <button
        onClick={prev}
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          bg-black/40 text-white
          w-8 h-8 md:w-10 md:h-10
          rounded-full flex items-center justify-center
          hover:bg-black/60 transition
        "
      >
        ‹
      </button>

      {/* BUTTON RIGHT */}
      <button
        onClick={next}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          bg-black/40 text-white
          w-8 h-8 md:w-10 md:h-10
          rounded-full flex items-center justify-center
          hover:bg-black/60 transition
        "
      >
        ›
      </button>
    </div>
  )
}
