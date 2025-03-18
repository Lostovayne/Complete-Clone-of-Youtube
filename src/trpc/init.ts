import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

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

// Comprobar si el usuario está autenticado y si no lo es, lanzar una excepción
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  if (!opts.ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not authorized to access this resource" });
  }
  return opts.next({
    ...ctx,
  });
});
