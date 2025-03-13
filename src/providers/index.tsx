import { TRPCReactProvider } from "@/trpc/client";
import { HydrateClient } from "@/trpc/server";

export const TRPCProviderClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TRPCReactProvider>
      <HydrateClient>{children}</HydrateClient>
    </TRPCReactProvider>
  );
};
