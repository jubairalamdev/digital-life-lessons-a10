import HeroBanner from "@/components/homepage/Banner";
import WhyLifeLessons from "@/components/homepage/Benefits";
import HomeContributors from "@/components/homepage/Contributors";
import HomeFeatured from "@/components/homepage/Featured";
import { TrendingLessonsSection } from "@/components/homepage/TrendingLessonsSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HomeFeatured />
      <WhyLifeLessons />
      <HomeContributors />
      <TrendingLessonsSection />
    </>
  );
}
