import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout";
import { JSX } from "react";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return <StudioLayout>{children}</StudioLayout>;
}
