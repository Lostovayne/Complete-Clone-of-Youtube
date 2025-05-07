"use client";

import { ResponsiveModal } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

export const StudioUploadModal = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const create = useMutation(
    trpc.videos.create.mutationOptions({
      onSuccess: () => {
        toast.success("Video Creado con exito");
        queryClient.invalidateQueries({ refetchType: "active" });
      },
      onError: () => {
        toast.error("Error al crear el video");
      },
    })
  );

  return (
    <>
      <ResponsiveModal title="Upload a video" open={!!create.data} onOpenChange={() => create.reset()}>
        <p>This is a Modal Uploader</p>
      </ResponsiveModal>

      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        className="cursor-pointer"
        disabled={create.isPending}
      >
        {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
        Create
      </Button>
    </>
  );
};
