import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
} from "@mux/mux-node/resources/webhooks";
import { NextRequest } from "next/server";
import { mux } from "@/lib/mux";

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET!;

type WebHookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetTrackReadyWebhookEvent;

export const POST = async (request: NextRequest) => {
  if (!SIGNING_SECRET) {
    return new Response("MUX_WEBHOOK_SECRET is not set", { status: 500 });
  }

  const headersPayload = await headers();
  const muxSignature = headersPayload.get("mux-signature");

  if (!muxSignature) {
    return new Response("Mux signature is not set", { status: 500 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  mux.webhooks.verifySignature(
    body,
    {
      "mux-signature": muxSignature,
    },
    SIGNING_SECRET,
  )

  switch (payload.type as WebHookEvent["type"]) {
    case "video.asset.created": {

    }

    case "video.asset.ready": {
      
    }

    case "video.asset.errored": {
      
    }

    case "video.asset.track.ready": {
      
    }

    default: {
      
    }
  }


};
