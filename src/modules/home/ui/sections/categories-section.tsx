"use client";
import { FilterCarousel } from "@/components/filter-carousel";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategoriesSectionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<div>Error...</div>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSkeleton = () => {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
};

export const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const trpc = useTRPC();
  const router = useRouter();

  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const categories = data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
      // window.history.pushState({}, "", url.toString());
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  };
  return <FilterCarousel onSelect={onSelect} data={categories} value={categoryId} />;
};
