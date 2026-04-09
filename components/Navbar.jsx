"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="py-5 relative z-50
  bg-[#070B1F]/80 backdrop-blur-xl
  border-b border-white/10">

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/logo.png"
                  alt="Logo PT Jaya Rizky Alexandra"
                  fill
                  priority
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl md:text-3xl font-bold bg-linear-to-r from-[#1c46cd] via-[#e717c0] to-[#8b5cf6] bg-clip-text text-transparent">
                PT. JAYA RIZKY ALEXANDRA
              </h1>
            </Link>

            {/* MENU DESKTOP */}
            <ul className="hidden md:flex items-center gap-12 font-medium">
              <li><Link href="#beranda">Beranda</Link></li>
              <li><Link href="#tentangkami">Tentang Kami</Link></li>
              <li><Link href="#layanan">Layanan</Link></li>
              <li><Link href="#kontak">Kontak</Link></li>
            </ul>

            {/* HAMBURGER */}
            <button
              className="md:hidden text-3xl"
              onClick={() => setActive(true)}
            >
              <i className="ri-menu-3-line"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setActive(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300
        ${active ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* DRAWER MOBILE (SETENGAH LAYAR) */}
      <aside
        className={`fixed top-0 right-0 h-full 
        w-[60%] max-w-md
        bg-[#0f0f0f] text-white z-50 shadow-2xl
        transform transition-transform duration-300
        ${active ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-end p-6">
          <button onClick={() => setActive(false)}>
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        {/* MENU LIST */}
        <ul className="flex flex-col gap-8 px-8 mt-10 text-lg font-medium">
          <li onClick={() => setActive(false)}>
            <Link href="#beranda">Beranda</Link>
          </li>

          <li className="flex justify-between items-center">
            <Link href="#tentangkami" onClick={() => setActive(false)}>
              Tentang Kami
            </Link>
          
          </li>

          <li onClick={() => setActive(false)}>
            <Link href="#layanan">Layanan</Link>
          </li>

          <li onClick={() => setActive(false)}>
            <Link href="#kontak">Kontak</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
