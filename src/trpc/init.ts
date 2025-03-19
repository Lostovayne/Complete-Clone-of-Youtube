import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";

// Upstash
import { ratelimit } from "@/lib/ratelimit";

export const createTRPCContext = cache(async () => {
  // TODO: Generate a problem for building the app
  const { userId } = await auth();
  return {
    clerkUserId: userId,
  };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
// Add your own context type here
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// Create a Redis instance

// Create a Ratelimit instance

// Comprobar si el usuario está autenticado y si no lo es, lanzar una excepción
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;

  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not authorized to access this resource" });
  }

  // Obtener los datos del usuario desde la base de datos
  const [user] = await db.select().from(users).where(eq(users.clerkId, ctx.clerkUserId)).limit(1);
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not user found in database" });
  }
  // Comprobar si el usuario ha superado el límite de peticiones
  const { success } = await ratelimit.limit(user.id);
  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
