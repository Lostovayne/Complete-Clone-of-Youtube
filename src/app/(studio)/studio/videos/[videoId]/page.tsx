import VideoView from "@/modules/studio/ui/views/video-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface VideoPageProps {
  params: Promise<{ videoId: string }>;
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const { videoId } = await params;

  prefetch(trpc.studio.getOne.queryOptions({ id: videoId }));
  prefetch(trpc.categories.getMany.queryOptions())

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};
export default VideoPage;
