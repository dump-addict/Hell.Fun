/**
 * Couche API — point d'entrée unique pour la donnée.
 *
 * 👉 DEV BACK : c'est ICI que tu intervieins.
 * Remplace les retours mockés par des `fetch()` vers ton backend.
 * Tu n'as RIEN d'autre à toucher dans le front : les composants
 * appellent uniquement ces fonctions.
 *
 * Exemple :
 *
 *   export async function getTokens(): Promise<Token[]> {
 *     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tokens`);
 *     return res.json();
 *   }
 */

import type { Leader, Token } from "./types";
import { MOCK_LEADERS, MOCK_TOKENS } from "./mock-data";

export async function getTokens(): Promise<Token[]> {
  return MOCK_TOKENS;
}

export async function getLeaders(): Promise<Leader[]> {
  return MOCK_LEADERS;
}

export async function getTokenById(id: string): Promise<Token | undefined> {
  return MOCK_TOKENS.find((t) => t.id === id);
}
