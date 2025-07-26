import { ResponsiveModal } from "@/components/responsive-dialog";
import { UploadDropzone } from "@/lib/uploadthing";

interface ThumbnailUploadModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThumbnailUploadModal = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailUploadModalProps) => {
  return (
    <ResponsiveModal title="Upload Thumbnail" open={open} onOpenChange={onOpenChange}>
      <UploadDropzone endpoint={"imageUploader"} />
    </ResponsiveModal>
  );
};
