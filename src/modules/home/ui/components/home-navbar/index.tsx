import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const HomeNavbar = () => {
  return (
    <nav className=" fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex items-center shrink-0">
          <SidebarTrigger />

          <Link href={"/"}>
            <div className="flex items-center gap-1 p-4">
              <Image src={"/logo.svg"} alt={"Logo"} width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">NewTube</p>
            </div>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>

        <div className="shrink-0 items-center flex gap-4 ">
          <div className="w-26 flex items-center justify-center">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
