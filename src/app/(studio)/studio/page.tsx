import { DEFAULT_LIMIT } from "@/constants";
import { StudioView } from "@/modules/studio/view/studio-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

const Page = () => {
  prefetch(trpc.studio.getMany.infiniteQueryOptions({ limit: DEFAULT_LIMIT }));

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Page;
