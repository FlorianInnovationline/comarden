import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  /** If empty/undefined, renders a polished placeholder instead of an iframe. */
  videoId?: string;
  title: string;
  className?: string;
  /**
   * Optional eyebrow above the title inside placeholder.
   * Example: "Vidéo"
   */
  eyebrow?: string;
};

export default function YouTubeEmbed({
  videoId,
  title,
  className,
  eyebrow = "Vidéo",
}: YouTubeEmbedProps) {
  const id = videoId?.trim();
  const hasVideo = !!id;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl",
        "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
        className
      )}
    >
      <div className="relative aspect-video w-full">
        {hasVideo ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,213,0,0.18),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.22))]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-xl bg-[#ffd500]/25" />
                  <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#ffd500]" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                    {eyebrow}
                  </div>
                  <div className="mt-1 text-sm sm:text-base font-semibold text-white/90">
                    {title}
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    YouTube — à renseigner
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

