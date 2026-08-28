import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}
