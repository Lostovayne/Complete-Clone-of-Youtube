import { prefetch, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { ClientPage } from "./client";

export default async function Home() {
  // Toma el Prefetch de la funcion del server para recibir el QueryClient
  prefetch(trpc.hello.queryOptions({ text: "Epsaind" }));
  // const data = await caller.hello({ text: "Epsaind" });
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <ClientPage />
      {/* </Suspense> */}
    </ErrorBoundary>
  );
}
