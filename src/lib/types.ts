/**
 * Types partagés Hell.fun.
 * Ces interfaces sont le CONTRAT entre le front et le back.
 * Le dev back doit retourner ces structures depuis ses endpoints.
 */

export interface Creator {
  name: string;
  avatarUrl: string;
}

export interface TokenSocials {
  twitter?: string;
  telegram?: string;
  website?: string;
}

export interface Token {
  id: string;
  ticker: string;          // ex: "VLAD"
  name: string;            // nom complet du créateur affiché en sous-titre
  address: string;         // adresse on-chain
  description: string;
  imageUrl: string;        // image principale du token
  creator: Creator;
  socials: TokenSocials;

  marketCap: number;       // USD
  volume24h: number;       // USD
  priceChange5m: number;   // pourcentage (peut être négatif)
  priceChange1h: number;
  priceChange6h: number;
  priceChange24h: number;
  txns24h: number;         // nombre de transactions sur 24h
  bondingCurveProgress: number; // 0-100

  holders: number;
  replies: number;
  createdAt: Date;

  isBonded: boolean;       // true = curve completed, false = in progress
}

export interface Leader {
  id: string;
  ticker: string;
  name: string;            // nom court affiché dans le badge (ex: "SoloCox")
  marketCap: number;
  heroImageUrl: string;    // image hero du carousel
}

export type SortKey = "newPair" | "marketCap" | "volume24h" | "lastTxns" | "lastReply";
export type ViewMode = "grid" | "list";
export type StatusFilter = "inProgress" | "bonded";
