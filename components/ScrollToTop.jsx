"use client"
import { useEffect, useState } from "react"

const ScrollToTop = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className={`fixed bottom-10 right-10
        bg-slate-800 text-white w-12 h-12 rounded-full text-center
        hover:bg-slate-700 cursor-pointer transition-all
        ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <i className="ri-arrow-up-line ri-2x"></i>
    </div>
  )
}

export default ScrollToTop
