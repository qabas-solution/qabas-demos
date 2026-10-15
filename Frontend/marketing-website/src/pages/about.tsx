import { AboutPageContent } from "@/features/about";
import { getAboutContent } from "@/features/about";

export default function AboutPage() {
  return <AboutPageContent content={getAboutContent()} />;
}
