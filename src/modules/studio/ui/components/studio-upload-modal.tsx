"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

export const StudioUploadModal = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const create = useMutation(
    trpc.videos.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ refetchType: "active" });
      },
    })
  );

  return (
    <Button
      variant={"secondary"}
      onClick={() => create.mutate()}
      className="cursor-pointer"
    >
      <PlusIcon />
      Create
    </Button>
  );
};
