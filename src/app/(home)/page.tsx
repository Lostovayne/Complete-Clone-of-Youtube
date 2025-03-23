import { HomeView } from "@/modules/home/ui/views/home-view";
import { prefetch, trpc } from "@/trpc/server";

// export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  prefetch(trpc.categories.getMany.queryOptions()); // Toma el Prefetch de la funcion del server para recibir el QueryClient
  // const data = await caller.hello({ text: "Epsaind" }); => Llamada directa del server
  return <HomeView categoryId={categoryId} />;
};

export default Page;
