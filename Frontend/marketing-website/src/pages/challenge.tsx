import { ChallengePageContent, getChallengeContent } from "@/features/challenge";

export default function ChallengePage() {
  return <ChallengePageContent content={getChallengeContent()} />;
}
