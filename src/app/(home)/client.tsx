"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const ClientPage = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.hello.queryOptions({ text: "Epsaind" })
  );

  return (
    <div>
      <p>
        Esto es un client component, haciendo una llamada a una api con
        prefetching de la data
      </p>
      <div>{data.greeting}</div>
    </div>
  );
};
