import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <HomeLayout>{children}</HomeLayout>;
}
