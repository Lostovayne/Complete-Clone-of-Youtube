"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { videoUpdateSchema } from "@/db/schema";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormSectionProps {
  videoId: string;
}

export const FormSection: FC<FormSectionProps> = ({ videoId }) => {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Error loading video data</div>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const FormSectionSkeleton: FC = () => {
  return <div>Loading...</div>;
};

const FormSectionSuspense: FC<FormSectionProps> = ({ videoId }) => {
  const trpc = useTRPC();
  const { data: video } = useSuspenseQuery(trpc.studio.getOne.queryOptions({ id: videoId }));

  const form = useForm<z.infer<typeof videoUpdateSchema>>({
    resolver: zodResolver(videoUpdateSchema),
    defaultValues: video,
  });

  const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Video Details</h1>
        <p className="text-xs text-muted-foreground">Manage your video details</p>
      </div>
      <div className="flex items-center gap-x-2">
        <Button className="" disabled={false}>
          Save
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <TrashIcon className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FormSection;
