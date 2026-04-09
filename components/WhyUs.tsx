"use client";

import { useState } from "react";
import Image from "next/image";
import { whyUsData } from "@/lib/whyUsData";

// 🔹 Definisikan tipe tab
type TabKey = "kontribusi" | "komitmen" | "pengalaman" | "visi";

// 🔹 Tipe struktur data
type WhyUsItem = {
  image: string;
  title: string;
  description: string;
  points: string[];
};

// 🔹 Tabs dengan tipe yang jelas
const tabs: TabKey[] = ["kontribusi", "komitmen", "pengalaman", "visi"];

export default function WhyUs() {
  const [activeTab, setActiveTab] = useState<TabKey>("kontribusi");

  const data: WhyUsItem = whyUsData[activeTab];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      {/* TAB MENU */}
      <div className="flex justify-center gap-8 border-b mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize transition ${
              activeTab === tab
                ? "border-b-2 border-teal-700 text-teal-700 font-semibold"
                : "text-gray-500 hover:text-teal-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-bold text-teal-800 mb-4">
            {data.title}
          </h2>
          <p className="text-gray-600 mb-6">{data.description}</p>

          <ul className="space-y-3">
            {data.points.map((point, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-green-600">✔</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}