interface VideoViewProps {
  videoId: string;
}

const VideoView = ({ videoId }: VideoViewProps) => {
  return <div>{videoId}</div>;
};

export default VideoView;
