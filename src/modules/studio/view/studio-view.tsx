"use client";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const StudioView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseInfiniteQuery(
    trpc.studio.getMany.infiniteQueryOptions(
      { limit: DEFAULT_LIMIT },
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      }
    )
  );

  console.log({data}); // nul

  // return <VideosSection />;
  return <div>{JSON.stringify(data)}</div>;
};
