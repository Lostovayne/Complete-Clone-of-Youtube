"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const ClientPage = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(
    trpc.hello.queryOptions({ text: "Epsaind" })
  );

  return <div>{data.greeting}</div>;
};
