// "use client";

import { caller, prefetch, trpc } from "@/trpc/server";

export default async function Home() {
  // prefetch(trpc.hello.queryOptions({ text: "Epsaind" }));
  const data = await caller.hello({ text: "Epsaind" });

  return <div>Server components {data?.greeting}</div>;
}
