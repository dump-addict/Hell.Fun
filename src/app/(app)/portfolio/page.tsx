import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { getTokens } from "@/lib/api";

export default async function PortfolioPage() {
  const tokens = await getTokens();
  return <PortfolioView tokens={tokens} />;
}
