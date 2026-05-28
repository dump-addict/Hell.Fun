"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Leader } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { IconButton } from "@/components/ui/IconButton";

interface LeadersCarouselProps {
  leaders: Leader[];
}

export function LeadersCarousel({ leaders }: LeadersCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: false,
    },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  const [, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full -mt-[5px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-white leading-none">Current Leaders</h2>
        <div className="flex gap-[10px]">
          <IconButton
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </IconButton>
          <IconButton
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          </IconButton>
        </div>
      </div>

      {/* Le carousel déborde jusqu'au bord droit (annule le padding 15px du wrapper) */}
      <div className="mt-[10px] -mr-[15px] overflow-hidden" ref={emblaRef}>
        {/* Pattern embla : container avec -ml pour compenser le pl du 1er slide */}
        <div className="flex -ml-[15px]">
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="relative shrink-0 basis-[90%] sm:basis-[60%] md:basis-[45%] lg:basis-[31%] pl-[15px]">
      <div className="relative aspect-[16/9] sm:aspect-[7/3] rounded-[16px] overflow-hidden bg-section">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={leader.heroImageUrl}
        alt={leader.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="absolute left-3 bottom-3 inline-flex items-center h-10 gap-1.5 bg-section shadow-inset rounded-[10px] px-3.5 text-sm font-bold">
        <span className="text-white">{leader.name}</span>
        <span className="text-white">{leader.ticker}</span>
        <span className="text-orange">{formatNumber(leader.marketCap, { compact: true })}</span>
      </div>
      </div>
    </div>
  );
}
