"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Play, ExternalLink, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Video {
  id: string;
  youtubeId: string;
  duration: string;
  views: string;
}

const videos: Video[] = [
  {
    id: "1",
    youtubeId: "gIIoCYuFdkI",
    duration: "4:20",
    views: "8.1K",
  },
  {
    id: "2",
    youtubeId: "9Dm5KtUsJGg",
    duration: "3:45",
    views: "5.3K",
  },
  {
    id: "3",
    youtubeId: "x-JTpKeGaYc",
    duration: "5:12",
    views: "4.7K",
  },
];

function getYouTubeThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function VideoSection() {
  const t = useTranslations("video");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const videoTitles = t.raw("videos") as Array<{ title: string; duration: string; description: string }>;

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Featured Video — Hero layout, 16:9 */}
        <div className="mb-12">
          <VideoCard
            video={videos[0]}
            title={videoTitles[0]?.title ?? ""}
            isPlaying={playingVideo === videos[0].id}
            onPlay={() =>
              setPlayingVideo(
                playingVideo === videos[0].id ? null : videos[0].id
              )
            }
            t={t}
          />
        </div>

        {/* Video Grid — two smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {videos.slice(1).map((video, idx) => (
            <VideoCard
              key={video.id}
              video={video}
              title={videoTitles[idx + 1]?.title ?? ""}
              isPlaying={playingVideo === video.id}
              onPlay={() =>
                setPlayingVideo(playingVideo === video.id ? null : video.id)
              }
              t={t}
              compact
            />
          ))}
        </div>

        {/* YouTube Channel CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-600">
                <svg
                  className="h-7 w-7 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {t("youTubeChannel")}
                </h3>
                <p className="text-slate-400">
                  5.2K {t("subscribers")}
                </p>
              </div>
            </div>
            <a
              href="https://www.youtube.com/@newarebattery"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                {t("subscribe")}
              </Button>
            </a>
          </div>

          {/* Recent Videos thumbnails */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((video, idx) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-800 mb-2">
                  <img
                    src={getYouTubeThumbnail(video.youtubeId)}
                    alt={videoTitles[idx]?.title ?? ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-5 w-5 text-slate-900 ml-0.5" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors line-clamp-2">
                  {videoTitles[idx]?.title ?? ""}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {video.views} {t("views")}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  video,
  title,
  isPlaying,
  onPlay,
  t,
  compact = false,
}: {
  video: Video;
  title: string;
  isPlaying: boolean;
  onPlay: () => void;
  t: ReturnType<typeof useTranslations<"video">>;
  compact?: boolean;
}) {
  return (
    <div className={cn("relative rounded-2xl overflow-hidden bg-slate-900 w-full", compact ? "aspect-video" : "aspect-[16/9]")}>
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          <img
            src={getYouTubeThumbnail(video.youtubeId)}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Play Button */}
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label={t("playVideo")}
          >
            <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-slate-900 ml-1" aria-hidden="true" />
            </div>
          </button>

          {/* Video Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center gap-1.5 text-white/80 text-sm">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {video.duration}
              </span>
              <span className="flex items-center gap-1.5 text-white/80 text-sm">
                <User className="h-4 w-4" aria-hidden="true" />
                {video.views} {t("views")}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {t("watchOnYoutube")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
