import type { Leader, Token } from "./types";
import { flamePlaceholder } from "./placeholder";

const NAMES = [
  "VLAD", "COX", "PEPE", "DOGE", "WIF", "BONK",
  "MOG", "HELL", "FIRE", "BURN", "ASH", "FLAME",
] as const;

const CREATOR_NAMES = [
  "Vladimir Novakovski",
  "Satoshi Nakamoto",
  "Vitalik Buterin",
  "CZ Binance",
  "Anatoly Yakovenko",
  "Charles Hoskinson",
  "Elon Musk",
  "Arthur Hayes",
] as const;

const LEADER_NAMES = ["SoloCox", "PyroVault", "AshKing", "InfernoDAO", "MoltenDoge"] as const;

function randomAddress(): string {
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
  let out = "";
  for (let i = 0; i < 44; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function makeToken(i: number): Token {
  const ticker = NAMES[i % NAMES.length];
  const creatorName = CREATOR_NAMES[i % CREATOR_NAMES.length];
  const daysAgo = (i % 9) + 1;
  return {
    id: `tok_${i.toString().padStart(3, "0")}`,
    ticker,
    name: creatorName,
    address: randomAddress(),
    description: "GiveBack Coin is a community-driven token built to support charitable causes and reward holders with weekly airdrops.",
    imageUrl: flamePlaceholder(`token-${i}-${ticker}`),
    creator: {
      name: creatorName,
      avatarUrl: flamePlaceholder(`avatar-${i}`),
    },
    socials: {
      twitter: "https://x.com",
      telegram: "https://t.me",
      website: "https://hell.fun",
    },
    marketCap: 53_700 + i * 8_400,
    volume24h: 128_220 + i * 12_300,
    priceChange5m: 0.23,
    priceChange1h: 0.23,
    priceChange6h: 0.23,
    priceChange24h: 176,
    txns24h: 43_232 + i * 700,
    bondingCurveProgress: [78, 63, 45, 23, 89, 12, 67, 38, 91, 8, 54, 71, 29, 84, 16, 60][i] ?? 63,
    holders: 2239 - i * 23,
    replies: 5 + (i % 12),
    createdAt: new Date(Date.now() - daysAgo * 86_400_000),
    isBonded: false,
  };
}

export const MOCK_TOKENS: Token[] = Array.from({ length: 16 }, (_, i) => makeToken(i));

export const MOCK_LEADERS: Leader[] = LEADER_NAMES.map((name, i) => ({
  id: `lead_${i}`,
  ticker: ["COX", "VLT", "AKG", "IDO", "MDG"][i] ?? "COX",
  name,
  marketCap: 12_300_000 - i * 1_200_000,
  heroImageUrl: flamePlaceholder(`leader-${i}-${name}`, { wide: true }),
}));
