import MuxUploader from "@mux/mux-uploader-react";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: VoidFunction;
}

export const StudioUploader = ({ endpoint, onSuccess }: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader endpoint={endpoint} onSuccess={onSuccess} />
    </div>
  );
};
