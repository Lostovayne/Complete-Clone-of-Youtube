import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { MainSection } from "./main-section";
export const StudioSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Link href={"/"} prefetch>
              <LogOutIcon className="size-5" />
              <span className="text-sm">Exit studio</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  );
};
