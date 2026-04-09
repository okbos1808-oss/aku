"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import DataImage from "@/lib/data";

export default function HeroImageWithText() {
  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[80vh] mt-32 text-center">
      
      {/* IMAGE */}
      <Image
        src={DataImage.Hero}
        alt="Hero Image"
        fill
        priority
        className="object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white">
          LET’S JOIN US
        </h1>
      </motion.div>
    </div>
  );
}
