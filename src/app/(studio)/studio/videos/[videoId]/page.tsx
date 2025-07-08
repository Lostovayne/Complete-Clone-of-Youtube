import VideoView from "@/modules/studio/ui/view/video-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface VideoPageProps {
  params: Promise<{ videoId: string }>;
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const { videoId } = await params;
  prefetch(trpc.studio.getOne.queryOptions({ id: videoId }));

  return <HydrateClient>
    <VideoView videoId={videoId} />
  </HydrateClient>;
};
export default VideoPage;
