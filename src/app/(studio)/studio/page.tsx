import { HydrateClient, prefetch, trpc } from "@/trpc/server";

const Page = () => {
  prefetch(trpc.studio.getMany.infiniteQueryOptions());

  return (
    <HydrateClient>
      <h1>This is the studio page</h1>
    </HydrateClient>
  );
};

export default Page;
