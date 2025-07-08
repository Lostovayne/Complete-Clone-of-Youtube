"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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

  return <div>{JSON.stringify(video)}</div>;
};

export default FormSection;
