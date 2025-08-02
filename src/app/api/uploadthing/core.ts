import { db } from "@/db";
import { users, videos } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ videoId: z.uuid() }))
    .middleware(async ({ input }) => {
      const { userId: clerkUserId } = await auth();

      if (!clerkUserId) throw new UploadThingError("Unauthorized");
      // Id del usuario de Clerk
      const [user] = await db.select().from(users).where(eq(users.clerkId, clerkUserId));
      if (!user) throw new UploadThingError("Unauthorized");
      return { user, ...input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db
        .update(videos)
        .set({
          thumbnailUrl: file.ufsUrl,
        })
        .where(and(eq(videos.id, metadata.videoId), eq(videos.userId, metadata.user.id)));

      return { uploadedBy: metadata.user.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
