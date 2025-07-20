import { ResponsiveModal } from "@/components/responsive-dialog";

interface ThumbnailUploadModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
