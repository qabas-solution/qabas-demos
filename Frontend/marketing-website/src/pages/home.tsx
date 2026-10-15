import { HomeHero, HomeSections } from "@/features/home/components";
import { getHomeContent } from "@/features/home/services";

export default function HomePage() {
  return <main><HomeHero /><HomeSections content={getHomeContent()} /></main>;
}
