import { LeaderboardView } from "@/components/leaderboard/LeaderboardView";
import { getTokens } from "@/lib/api";

export default async function LeaderboardPage() {
  const tokens = await getTokens();
  return <LeaderboardView tokens={tokens} />;
}
