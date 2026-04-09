"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts: string[] = [
  "USAHA LEGALITAS",
  "SERTIFIKASI HALAL",
  "PERIZINAN BPOM",
  "KONSULTASI USAHA",
];

const HeroText: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#070B1F]">
      {/* Glow Background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-700/20 blur-[120px]" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-36"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white text-left sm:text-center leading-tight">
          BERSAMA KAMI MEMBANTU <br />

          <span className="relative inline-block mt-4 sm:mt-6">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 blur-xl opacity-30" />

            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.6 }}
                className="relative block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent font-bold"
              >
                {texts[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
      </motion.div>
    </section>
  );
};

export default HeroText;