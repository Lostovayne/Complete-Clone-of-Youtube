// "use client";

import { prefetch, trpc } from "@/trpc/server";
import { ClientPage } from "./client";

export default async function Home() {
  prefetch(trpc.hello.queryOptions({ text: "Epsaind" }));
  // const data = await caller.hello({ text: "Epsaind" });
  return <ClientPage />;
}
