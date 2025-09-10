import HeroSection from "@/components/layouts/HomePage/HeroSection";
import SugessionReadingSection from "@/components/layouts/HomePage/SugessionReadingSection";
import TrendingReadingSection from "@/components/layouts/HomePage/TrendingReadingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="body-content space-y-8 mt-8">

      <HeroSection />
      <TrendingReadingSection />
      <SugessionReadingSection />
      
    </div>
  );
}
