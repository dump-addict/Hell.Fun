"use client";

import { AlertCircle, Clock, Globe, Reply, Send, Users } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ImageDropzone } from "@/components/ui/ImageDropzone";
import { Switch } from "@/components/ui/Switch";

/** Validations format URL pour les liens sociaux */
function validateUrl(value: string, type: "twitter" | "telegram" | "website"): string | null {
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return "Please enter a valid URL (starting with https://).";
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return "URL must start with https://.";
  }
  if (type === "twitter") {
    if (!/^(x|twitter)\.com$/i.test(url.hostname.replace(/^www\./, ""))) {
      return "Please enter a valid Twitter / X URL (x.com or twitter.com).";
    }
    if (!url.pathname || url.pathname === "/" || url.pathname.length < 2) {
      return "Please enter a valid Twitter / X profile URL.";
    }
  }
  if (type === "telegram") {
    if (!/^(t\.me|telegram\.(me|org))$/i.test(url.hostname.replace(/^www\./, ""))) {
      return "Please enter a valid Telegram URL (t.me/...).";
    }
    if (!url.pathname || url.pathname === "/" || url.pathname.length < 2) {
      return "Please enter a valid Telegram link.";
    }
  }
  return null;
}

export function CreateTokenView() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [website, setWebsite] = useState("");
  const [pairUsdc, setPairUsdc] = useState(false);
  const [mayhemMode, setMayhemMode] = useState(false);

  return (
    <div className="flex flex-col gap-[15px]">
      {/* Top row : titre principal à gauche + label PREVIEW à droite (bottom-aligned)
          → le Preview card en dessous démarre au même Y que la 1ère box du form */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[15px] items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Create a new token</h1>
          {/* <p className="text-sm text-muted mt-1">
            Choose carefully — these settings can&apos;t be changed once the token is created.
          </p> */}
        </div>
        <div className="text-xs font-bold text-muted uppercase tracking-wider">
          Preview
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[15px]">
        {/* COLONNE FORM */}
        <div className="flex flex-col gap-[15px]">
          {/* Coin name */}
          <Section title="Coin name">
            <Input
              placeholder="Name your coin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Section>

          {/* Ticker */}
          <Section title="Ticker">
            <Input
              placeholder="e.g. DOGE"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              maxLength={10}
            />
          </Section>

          {/* Description */}
          <Section title="Description" optional>
            <div className="relative">
              <Textarea
                placeholder="Write a short description of your token..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                className="pb-8"
              />
              <div className="absolute bottom-3 right-4 text-xs text-muted font-medium pointer-events-none">
                {description.length} / 500
              </div>
            </div>
          </Section>

          {/* Logo & Banner — section unifiée, cases de même hauteur (1fr_3fr donne aspect parfait) */}
          <Section title="Logo & Banner">
            <div className="grid grid-cols-[1fr_3fr] gap-[15px] items-start">
              {/* Colonne LOGO */}
              <div className="flex flex-col gap-2">
                <ImageDropzone
                  aspect="1"
                  label="Upload logo"
                  spec={{
                    maxSizeMb: 15,
                    acceptTypes: ["image/jpeg", "image/png", "image/gif"],
                    minWidth: 1000,
                    minHeight: 1000,
                    expectedRatio: 1,
                  }}
                />
                <p className="text-[11px] text-muted whitespace-nowrap">
                  1000×1000 · jpg/png/gif · 15 MB
                </p>
              </div>

              {/* Colonne BANNER */}
              <div className="flex flex-col gap-2">
                <ImageDropzone
                  aspect="3"
                  label="Upload banner (optional)"
                  spec={{
                    maxSizeMb: 5,
                    acceptTypes: ["image/jpeg", "image/png", "image/gif"],
                    minWidth: 1500,
                    minHeight: 500,
                    expectedRatio: 3,
                  }}
                />
                <p className="text-[11px] text-muted whitespace-nowrap">
                  1500×500 · jpg/png/gif · 5 MB · permanent after creation
                </p>
              </div>
            </div>
          </Section>

          {/* Social links */}
          <Section title="Social links" optional>
            <div className="flex flex-col gap-[10px]">
              <Field label="Website">
                <ValidatedInput
                  icon={<Globe className="h-4 w-4" strokeWidth={2} />}
                  placeholder="https://yourcoin.com"
                  value={website}
                  onChange={setWebsite}
                  validate={(v) => validateUrl(v, "website")}
                />
              </Field>
              <Field label="X (Twitter)">
                <ValidatedInput
                  icon={<XIcon className="h-3.5 w-3.5" />}
                  placeholder="https://x.com/yourcoin"
                  value={twitter}
                  onChange={setTwitter}
                  validate={(v) => validateUrl(v, "twitter")}
                />
              </Field>
              <Field label="Telegram">
                <ValidatedInput
                  icon={<Send className="h-4 w-4" strokeWidth={2} />}
                  placeholder="https://t.me/yourcoin"
                  value={telegram}
                  onChange={setTelegram}
                  validate={(v) => validateUrl(v, "telegram")}
                />
              </Field>
            </div>
          </Section>

          {/* Options avancées */}
          <Section title="Advanced options" optional>
            <div className="flex flex-col gap-[10px]">
              <OptionRow
                title="Pair with USDC"
                subtitle="Create your coin with USDC liquidity"
                checked={pairUsdc}
                onChange={setPairUsdc}
              />
              <OptionRow
                title="Mayhem mode"
                subtitle="Increased price volatility for 24h after launch"
                checked={mayhemMode}
                onChange={setMayhemMode}
              />
            </div>
          </Section>

          {/* CTA */}
          <div className="flex justify-end gap-[10px] pt-2">
            <button
              type="button"
              className="h-11 px-5 rounded-[10px] bg-section shadow-inset text-white font-bold text-[13px] hover:text-orange transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!name || !ticker}
              className="h-11 px-6 rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Launch token
            </button>
          </div>
        </div>

        {/* COLONNE PREVIEW (label déplacé dans la top row pour aligner avec la 1ère box du form) */}
        <aside className="lg:sticky lg:top-[15px] lg:self-start">
          <Preview
            ticker={ticker || "TICKER"}
            name={name || "Your token name"}
            description={description || "Your description will appear here..."}
          />
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  optional,
  children,
}: {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-section shadow-inset rounded-[16px] p-5">
      <h2 className="text-sm font-bold text-white mb-4">
        {title}
        {optional && <span className="text-muted font-medium ml-2">(optional)</span>}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-muted uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

/** Input avec validation en temps réel + message d'erreur en dessous (style cohérent avec ImageDropzone) */
function ValidatedInput({
  icon,
  placeholder,
  value,
  onChange,
  validate,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => string | null;
}) {
  const error = validate(value);
  return (
    <div className="flex flex-col gap-1.5">
      <Input
        icon={icon}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        containerClassName={error ? "border-red-500/60" : ""}
      />
      {error && (
        <div className="flex items-start gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" strokeWidth={2.5} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

/** Liste de specs (utilisée pour afficher les contraintes d'upload) */
function SpecsList({
  items,
  note,
}: {
  items: { label: string; value: string }[];
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-2 pt-1">
      {items.map((item) => (
        <div key={item.label} className="flex justify-between text-xs">
          <span className="text-muted">{item.label}</span>
          <span className="text-white font-bold">{item.value}</span>
        </div>
      ))}
      {note && <p className="text-xs text-muted mt-2 leading-relaxed">{note}</p>}
    </div>
  );
}

function OptionRow({
  title,
  subtitle,
  checked,
  onChange,
}: {
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-[#0D0D14] shadow-inset rounded-[10px]">
      <div className="min-w-0">
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="text-xs text-muted mt-0.5">{subtitle}</div>
      </div>
      <Switch checked={checked} onChange={onChange} ariaLabel={title} />
    </div>
  );
}

function Preview({
  ticker,
  name,
  description,
}: {
  ticker: string;
  name: string;
  description: string;
}) {
  return (
    <article className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-3">
      <header className="flex gap-3">
        <QuestionAvatar />
        <div className="flex-1 min-w-0 h-14 flex flex-col justify-between">
          <div className="leading-none">
            <span className="text-sm font-bold text-orange uppercase">{ticker}</span>
          </div>
          <p className="text-xs font-bold text-white leading-none truncate">{name}</p>
          <p className="text-[11px] text-muted leading-none line-clamp-1">{description}</p>
        </div>
      </header>

      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-muted">Market Cap</span>
          <span className="text-white font-bold">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Bonding Curve Progress</span>
          <span className="text-orange font-bold">0%</span>
        </div>
        <div className="h-2 rounded-[3px] bg-[#0D0D14] shadow-inset mt-1" />
      </div>

      <footer className="flex items-center justify-between text-muted-2 text-xs pt-1">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          Just now
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" strokeWidth={2} />
          0
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Reply className="h-3.5 w-3.5" strokeWidth={2} />
          0
        </span>
      </footer>
    </article>
  );
}

/**
 * Placeholder "image vide" avec notre DA : fond #0D0D14 creusé + "?" orange.
 */
function QuestionAvatar() {
  return (
    <div className="h-14 w-14 rounded-[10px] bg-[#0D0D14] shadow-inset flex items-center justify-center shrink-0">
      <span className="text-orange text-2xl font-extrabold leading-none">?</span>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
