import { DEFAULT_LIMIT } from "@/constants";
import { StudioView } from "@/modules/studio/ui/views/studio-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const Page = () => {
  prefetch(trpc.studio.getMany.infiniteQueryOptions({ limit: DEFAULT_LIMIT }));

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Page;
