import { getSolutionContent, SolutionPageContent } from "@/features/solution";

export default function SolutionPage() {
  return <SolutionPageContent content={getSolutionContent()} />;
}
