"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { shortenAddress, timeAgo } from "@/lib/utils";
import { flamePlaceholder } from "@/lib/placeholder";

interface Comment {
  id: string;
  user: string;
  body: string;
  at: Date;
}

const MOCK: Comment[] = [
  {
    id: "c1",
    user: "5LiAfBjwx8vkZUbCYJ9JmL3KvP8eHv3MnRsX1q5tVxBNxxxx",
    body: "🔥 Just aped in. This one's going parabolic 🚀",
    at: new Date(Date.now() - 60_000 * 5),
  },
  {
    id: "c2",
    user: "MsFprqLZ3xCYDhJk5N9vTbWqXrHsP4mEnRsX1q5tBNBDxxxx",
    body: "Devs based, community vibing. LFG.",
    at: new Date(Date.now() - 60_000 * 22),
  },
  {
    id: "c3",
    user: "xLcfDeQqYBmKnP2RsT8wUvJxHsAvGcRsX1q5tVxBNpkFrxxxx",
    body: "Banger token. Already 78% to bonding curve completion 🥵",
    at: new Date(Date.now() - 60_000 * 47),
  },
];

export function TokenComments() {
  const [comments, setComments] = useState<Comment[]>(MOCK);
  const [draft, setDraft] = useState("");

  function post() {
    if (!draft.trim()) return;
    setComments([
      {
        id: `c${comments.length + 1}`,
        user: "YOUxxx...YOUR",
        body: draft.trim(),
        at: new Date(),
      },
      ...comments,
    ]);
    setDraft("");
  }

  return (
    <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-4">
      <h2 className="text-sm font-bold text-white">Replies ({comments.length})</h2>

      {/* Composer */}
      <div className="flex items-end gap-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={1}
          placeholder="Drop a reply..."
          className="flex-1 bg-[#0D0D14] border border-[#262631] rounded-[10px] px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-orange/60 resize-none transition-colors"
        />
        <button
          type="button"
          onClick={post}
          disabled={!draft.trim()}
          className="h-11 w-11 flex items-center justify-center rounded-[10px] bg-orange shadow-glow text-white hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          aria-label="Send"
        >
          <Send className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Liste */}
      <div className="flex flex-col gap-3">
        {comments.map((c) => (
          <article key={c.id} className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flamePlaceholder(c.user)}
              alt=""
              className="h-9 w-9 rounded-[8px] shrink-0 object-cover bg-[#0D0D14]"
            />
            <div className="flex-1 min-w-0 bg-[#0D0D14] shadow-inset rounded-[12px] p-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-bold text-orange">{shortenAddress(c.user)}</span>
                <span className="text-[11px] text-muted">{timeAgo(c.at)}</span>
              </div>
              <p className="text-sm text-white mt-1.5 break-words">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
