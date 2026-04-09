"use client";

import DataImage from "@/lib/data";
import Image from "next/image";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Business Matching",
    desc: "Kami menyediakan layanan Business Matching antara pelaku usaha dalam dan luar negeri.",
    image: DataImage.Hero,
  },
  {
    title: "Jasa Penyelia Halal",
    desc: "Penyelia Halal berkompeten, bersertifikat BNSP, dan terdaftar BPJPH.",
    image: DataImage.Proyek1,
  },
  {
    title: "Sertifikat Halal BPJPH",
    desc: "Pendampingan proses sertifikasi halal BPJPH hingga selesai.",
    image: DataImage.Proyek11,
  },
];

export default function AutoServiceBox() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative p-8 bg-white rounded-2xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* IMAGE */}
            <div className="relative w-full h-48 mb-5 overflow-hidden rounded-xl">
              <Image
                src={services[index].image}
                alt={services[index].title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* TEXT */}
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">
              {services[index].title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {services[index].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
