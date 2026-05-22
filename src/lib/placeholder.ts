/**
 * Génère un placeholder SVG en data URI avec gradient feu.
 * Utilisé en attendant les vraies images IPFS/CDN du back.
 */

const PALETTES = [
  ["#FFE52F", "#FF6B1A", "#C73912"],
  ["#FFD23F", "#FF4617", "#7A1F0A"],
  ["#FFA53F", "#FF4617", "#451008"],
  ["#FFE52F", "#FFB627", "#FF4617"],
  ["#FF7A1A", "#C73912", "#1B1B24"],
  ["#FFD23F", "#FF8520", "#C73912"],
  ["#FFE52F", "#FF4617", "#1B1B24"],
  ["#FFB627", "#FF6B1A", "#451008"],
] as const;

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function flamePlaceholder(seed: string, opts: { wide?: boolean } = {}): string {
  const palette = PALETTES[hash(seed) % PALETTES.length];
  const w = opts.wide ? 900 : 400;
  const h = opts.wide ? 400 : 400;
  const cx = 30 + (hash(seed + "x") % 40);
  const cy = 50 + (hash(seed + "y") % 30);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="g" cx="${cx}%" cy="${cy}%" r="70%">
        <stop offset="0%" stop-color="${palette[0]}"/>
        <stop offset="40%" stop-color="${palette[1]}"/>
        <stop offset="100%" stop-color="${palette[2]}"/>
      </radialGradient>
      <radialGradient id="core" cx="${cx}%" cy="${cy}%" r="25%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#1B1B24"/>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect width="${w}" height="${h}" fill="url(#core)"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
