import { ArcjetClient } from "@/app/server/arc";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { error, reason, status } = await ArcjetClient(req);
  if (status === 200) {
    return NextResponse.json({ message: "Hello world" });
  }
  return NextResponse.json({ error, reason, status });
}










