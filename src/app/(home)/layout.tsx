import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";
import { JSX } from "react";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return <HomeLayout>{children}</HomeLayout>;
}
