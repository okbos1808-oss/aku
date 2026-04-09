"use client";

import Image, { StaticImageData } from "next/image";

type TeamMember = {
  name: string;
  role: string;
  company: string;
  image: StaticImageData | string; // 🔥 penting (karena dari string path)
};

export default function TeamSection({
  data = [],
}: {
  data?: TeamMember[];
}) {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-serif text-teal-800 mb-4">
        We Have The Best Team
      </h2>

      <p className="text-gray-500 max-w-3xl mx-auto mb-16">
        We have the best team in Indonesia and Japan with reliable and wonderful
        experiences for years in halal business consulting.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {data.map((member, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden group shadow-md"
          >
            {/* IMAGE */}
            <div className="relative w-full h-[360px]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* INFO */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg py-4 px-3 shadow-lg">
              <h3 className="font-semibold text-blue-900 text-sm">
                {member.name}
              </h3>
              <p className="text-xs text-gray-500 italic">
                {member.role}
              </p>
              <p className="text-xs text-gray-400 italic">
                {member.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}