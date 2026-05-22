"use client";

import { AlertCircle, ImagePlus, X } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface MediaSpec {
  /** Taille max en MB */
  maxSizeMb?: number;
  /** Types MIME acceptés (ex: ["image/jpeg", "image/png", "image/gif"]) */
  acceptTypes?: string[];
  /** Largeur min en px */
  minWidth?: number;
  /** Hauteur min en px */
  minHeight?: number;
  /** Ratio attendu (largeur/hauteur). Ex: 1 pour carré, 3 pour 3:1 */
  expectedRatio?: number;
  /** Tolérance sur le ratio (par défaut 0.05 = 5%) */
  ratioTolerance?: number;
}

interface ImageDropzoneProps {
  /** Ratio d'aspect CSS (ex: "1" pour carré, "3" pour 3:1) */
  aspect?: string;
  label?: string;
  className?: string;
  spec?: MediaSpec;
}

export function ImageDropzone({
  aspect = "1",
  label = "Upload image",
  className,
  spec,
}: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSet = useCallback(
    async (file: File | null) => {
      if (!file) return;
      setError(null);

      // 1. Type
      if (spec?.acceptTypes && spec.acceptTypes.length > 0) {
        if (!spec.acceptTypes.includes(file.type)) {
          setError(`Unsupported file type. Accepted: ${spec.acceptTypes.map((t) => t.split("/")[1]).join(", ")}.`);
          return;
        }
      } else if (!file.type.startsWith("image/")) {
        setError("Only image files are accepted.");
        return;
      }

      // 2. Size
      if (spec?.maxSizeMb) {
        const sizeMb = file.size / (1024 * 1024);
        if (sizeMb > spec.maxSizeMb) {
          setError(`File too large (${sizeMb.toFixed(1)} MB). Max ${spec.maxSizeMb} MB.`);
          return;
        }
      }

      // 3. Dimensions (pour les images uniquement)
      const url = URL.createObjectURL(file);
      if (file.type.startsWith("image/") && (spec?.minWidth || spec?.minHeight || spec?.expectedRatio)) {
        const dims = await getImageDimensions(url);
        if (spec.minWidth && dims.width < spec.minWidth) {
          setError(`Image too small (${dims.width}px wide). Min ${spec.minWidth}px.`);
          URL.revokeObjectURL(url);
          return;
        }
        if (spec.minHeight && dims.height < spec.minHeight) {
          setError(`Image too short (${dims.height}px tall). Min ${spec.minHeight}px.`);
          URL.revokeObjectURL(url);
          return;
        }
        if (spec.expectedRatio) {
          const ratio = dims.width / dims.height;
          const tolerance = spec.ratioTolerance ?? 0.05;
          if (Math.abs(ratio - spec.expectedRatio) / spec.expectedRatio > tolerance) {
            setError(
              `Wrong aspect ratio (${dims.width}×${dims.height}). Expected ${formatRatio(spec.expectedRatio)}.`,
            );
            URL.revokeObjectURL(url);
            return;
          }
        }
      }

      setPreview(url);
    },
    [spec],
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void validateAndSet(e.dataTransfer.files?.[0] ?? null);
        }}
        className={cn(
          "relative group w-full bg-[#0D0D14] border border-[#262631] rounded-[12px] cursor-pointer overflow-hidden",
          "flex items-center justify-center transition-all",
          dragOver && "border-orange",
          error && "border-red-500/60",
        )}
        style={{ aspectRatio: aspect }}
      >
        <input
          type="file"
          accept={spec?.acceptTypes?.join(",") ?? "image/*"}
          className="hidden"
          onChange={(e) => void validateAndSet(e.target.files?.[0] ?? null)}
        />

        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setPreview(null);
                setError(null);
              }}
              className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center bg-section/95 backdrop-blur shadow-inset rounded-[8px] text-white hover:text-orange transition-colors"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted group-hover:text-orange transition-colors">
            <ImagePlus className="h-8 w-8" strokeWidth={1.5} />
            <span className="text-xs font-bold">{label}</span>
          </div>
        )}
      </label>

      {error && (
        <div className="flex items-start gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" strokeWidth={2.5} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = url;
  });
}

function formatRatio(r: number): string {
  if (Math.abs(r - 1) < 0.01) return "1:1";
  if (Math.abs(r - 3) < 0.01) return "3:1";
  if (Math.abs(r - 16 / 9) < 0.01) return "16:9";
  if (Math.abs(r - 9 / 16) < 0.01) return "9:16";
  // fallback
  return `${r.toFixed(2)}:1`;
}
