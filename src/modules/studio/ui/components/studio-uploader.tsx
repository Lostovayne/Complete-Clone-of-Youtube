import MuxUploader from "@mux/mux-uploader-react";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: VoidFunction;
}

const UPLOADER_ID = "video-uploader";

export const StudioUploader = ({ endpoint, onSuccess }: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader
        endpoint={endpoint}
        onSuccess={onSuccess}
        id={UPLOADER_ID}
        className="hidden group/uploader"
      />
    </div>
  );
};
