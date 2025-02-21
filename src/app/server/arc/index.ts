"use server";
import arcjet, { type ArcjetRuleResult, detectBot, shield, tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 20, // Bucket capacity of 10 tokens
    }),
  ],
});

function isSpoofed(result: ArcjetRuleResult) {
  return (
    // You probably don't want DRY_RUN rules resulting in a denial
    // since they are generally used for evaluation purposes but you
    // could log here.
    result.state !== "DRY_RUN" && result.reason.isBot() && result.reason.isSpoofed()
  );
}

export const ArcjetClient = async (req: Request) => {
  const decision = await aj.protect(req, { requested: 3 }); // Deduct 5 tokens from the bucket
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return { error: "Too Many Requests", reason: decision.reason, status: 429 };
    } else if (decision.reason.isBot()) {
      return { error: "No bots allowed", reason: decision.reason, status: 403 };
    } else {
      return { error: "Forbidden", reason: decision.reason, status: 403 };
    }
  }
  if (decision.results.some(isSpoofed)) {
    return { error: "Forbidden", reason: decision.reason, status: 403 };
  }

  return {
    error: null,
    reason: decision.reason,
    status: 200,
  };
};
