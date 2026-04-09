"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setActive(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-10 right-10
        bg-slate-800 text-white w-12 h-12 rounded-full
        flex items-center justify-center
        hover:bg-slate-700 cursor-pointer transition-all duration-300
        ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      ↑
    </button>
  );
}