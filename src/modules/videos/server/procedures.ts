import { db } from "@/db";
import { videos } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    // Upload videos to Mux
    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId,
        playback_policies: ["public"],
        static_renditions: [
          {
            resolution: "highest",
          },
          {
            resolution: "audio-only",
          },
        ],
        // mp4_support: "standard", // TODO: Property is deprecated
      },
      cors_origin: "*", // TODO: In production this should be restricted to the domain of the app
    });

    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: "Untitled",
      })
      .returning();

    return {
      video: video,
      url: upload.url,
    };
  }),
});
