import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <Button>
      <UserCircleIcon className="h-5 w-5" />
      Sign in
    </Button>
  );
};
