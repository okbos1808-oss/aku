import HeroText from "@/components/HeroText";
import ServiceCard from "@/components/ServiceCard";
import ImageCarousel from "@/components/ImageCarousel";
import TeamSection from "@/components/TeamSection";
import DataImage from "@/lib/data1"
import WhyUs from "@/components/WhyUs";

export default function Home() {
  const teamData = [
    {
      name: "Lina Setianingrum",
      role: "CEO and Founder",
      company: "PT. Halal Bersama Indonesia",
      image: DataImage.Proyek9,
    },
    {
      name: "Yui Sakugawa",
      role: "Media",
      company: "and Influencer",
      image: DataImage.Proyek10,
    },
    {
      name: "Koji Kawamoto",
      role: "Food Technology",
      company: "Consultant",
      image: DataImage.Proyek12,
    },
    {
      name: "Lina Budiarti",
      role: "Market Research",
      company: "Specialist",
      image: DataImage.Proyek13,
    },
  ];

  return (
    <div className="max-w-screen-7xl mx-auto py-6 p-4">
      <h1 className="text-2xl">HomePage</h1>

      <div className="text-center text-2xl font-bold text-gray-800 mt-2 mb-2">
        WELCOME JRA CONSULTING
      </div>

      <HeroText />
      <ServiceCard />
   
      <WhyUs/>

      {/* ✅ kirim data ke component */}
      <TeamSection data={teamData} />
    </div>
  );
}