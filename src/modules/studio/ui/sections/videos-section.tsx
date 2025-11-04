"use client";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEFAULT_LIMIT } from "@/constants";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ErrorBoundary } from "react-error-boundary";

import { Skeleton } from "@/components/ui/skeleton";
import { GlobeIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect } from "react";

export const VideosSection = () => {
  return (
    <Suspense fallback={<VideoSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionSkeleton = () => {
  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="">Views</TableHead>
              <TableHead className="">Comments</TableHead>
              <TableHead className="">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-36" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <GlobeIcon className="size-4 mr-2" />
                    Public
                  </div>
                </TableCell>
                <TableCell>Ready</TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export const VideosSectionSuspense = () => {
  const trpc = useTRPC();
  const {
    data: videos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useSuspenseInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions(
      { limit: DEFAULT_LIMIT },
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      }
    )
  );

  const shouldPoll = videos.pages.some((page) =>
    page.items.some(
      (video) =>
        [video.muxStatus, video.muxTrackStatus].some((status) => status && status !== "ready") ||
        !video.thumbnailUrl ||
        !video.previewUrl ||
        !video.muxPlaybackId
    )
  );

  useEffect(() => {
    if (!shouldPoll) return;
    const intervalId = setInterval(() => {
      void refetch();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [shouldPoll, refetch]);

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="">Views</TableHead>
              <TableHead className="">Comments</TableHead>
              <TableHead className="">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <TableRow key={video.id} className="cursor-pointer">
                  <TableCell>
                    <Link href={`/studio/videos/${video.id}`} prefetch className="block">
                      <div className="flex items-center gap-4">
                        <div className="relative aspect-video w-36 shrink-0">
                          <VideoThumbnail
                            imageUrl={video.thumbnailUrl}
                            previewUrl={video.previewUrl}
                            title={video.title}
                            duration={video.duration || 0}
                          />
                        </div>
                        <div className="flex flex-col overflow-hidden gap-y-1">
                          <span className="text-sm text-muted-foreground line-clamp-1">
                            {video.title}
                          </span>
                          <span className="text-xs line-clamp-1">
                            {video.description || "No description"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {video.visibility === "private" ? (
                        <LockIcon className="size-4 mr-2" />
                      ) : (
                        <GlobeIcon className="size-4 mr-2" />
                      )}
                      {snakeCaseToTitleCase(video.visibility)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm truncate">
                    <div className="flex items-center">
                      {snakeCaseToTitleCase(video.muxStatus || "error loading")}
                    </div>
                  </TableCell>
                  <TableCell>{format(video.createdAt, "d MMM yyyy")}</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Likes</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
