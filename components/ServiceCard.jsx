"use client";
import Image from "next/image";
import { useState } from "react";

export default function ServiceCard({ image, title, desc }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative h-80 w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-widthwidth: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* OVERLAY */}
      <div
        className={`
          absolute inset-0
          bg-linear-to-t from-black/80 via-black/50 to-transparent
          backdrop-blur-sm
          flex flex-col justify-end
          px-6 pb-6
          transition-all duration-500
          
          ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }

          group-hover:opacity-100 group-hover:translate-y-0
        `}
      >
        <h3 className="text-lg font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
