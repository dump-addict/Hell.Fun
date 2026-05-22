import { HomeView } from "@/components/home/HomeView";
import { getLeaders, getTokens } from "@/lib/api";

export default async function HomePage() {
  const [tokens, leaders] = await Promise.all([getTokens(), getLeaders()]);
  return <HomeView tokens={tokens} leaders={leaders} />;
}
