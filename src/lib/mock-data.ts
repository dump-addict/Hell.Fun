import type { Leader, Token } from "./types";
import { flamePlaceholder } from "./placeholder";

const NAMES = [
  "VLAD", "COX", "PEPE", "DOGE", "WIF", "BONK",
  "MOG", "HELL", "FIRE", "BURN", "ASH", "FLAME",
] as const;

/** Mapping ticker → URL d'image memecoin réelle (Coingecko CDN).
 *  Si une URL casse, le composant TokenAvatar fait fallback vers flamePlaceholder. */
const TOKEN_IMAGES: Record<string, string> = {
  PEPE: "https://assets.coingecko.com/coins/images/29850/standard/pepe-token.jpeg",
  DOGE: "https://assets.coingecko.com/coins/images/5/standard/dogecoin.png",
  WIF: "https://assets.coingecko.com/coins/images/33566/standard/dogwifhat.jpg",
  BONK: "https://assets.coingecko.com/coins/images/28600/standard/bonk.jpg",
  MOG: "https://assets.coingecko.com/coins/images/31104/standard/MOG_LOGO_200x200.png",
  VLAD: "https://assets.coingecko.com/coins/images/30117/standard/turbo.png",
  COX: "https://assets.coingecko.com/coins/images/33760/standard/image.jpg",
  HELL: "https://assets.coingecko.com/coins/images/35529/standard/1000050750.png",
  FIRE: "https://assets.coingecko.com/coins/images/16746/standard/PNG_image.png",
  BURN: "https://assets.coingecko.com/coins/images/11939/standard/shiba.png",
  ASH: "https://assets.coingecko.com/coins/images/26375/standard/PEPECOIN.png",
  FLAME: "https://assets.coingecko.com/coins/images/31552/standard/MAGA.png",
};

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
    imageUrl: TOKEN_IMAGES[ticker] ?? flamePlaceholder(`token-${i}-${ticker}`),
    creator: {
      name: creatorName,
      // PP des créateurs : réutilise une image memecoin pour avoir un look "réel"
      avatarUrl:
        Object.values(TOKEN_IMAGES)[i % Object.values(TOKEN_IMAGES).length] ??
        flamePlaceholder(`avatar-${i}`),
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

// Images memecoin pour les bannières du carousel (croppées en wide via object-cover)
const LEADER_BANNERS = [
  "https://assets.coingecko.com/coins/images/33760/standard/image.jpg",       // POPCAT
  "https://assets.coingecko.com/coins/images/29850/standard/pepe-token.jpeg", // PEPE
  "https://assets.coingecko.com/coins/images/28600/standard/bonk.jpg",        // BONK
  "https://assets.coingecko.com/coins/images/35529/standard/1000050750.png",  // BRETT
  "https://assets.coingecko.com/coins/images/5/standard/dogecoin.png",        // DOGE
];

export const MOCK_LEADERS: Leader[] = LEADER_NAMES.map((name, i) => ({
  id: `lead_${i}`,
  ticker: ["COX", "VLT", "AKG", "IDO", "MDG"][i] ?? "COX",
  name,
  marketCap: 12_300_000 - i * 1_200_000,
  heroImageUrl: LEADER_BANNERS[i] ?? flamePlaceholder(`leader-${i}-${name}`, { wide: true }),
}));
