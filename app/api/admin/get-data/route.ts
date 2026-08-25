import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSiteContent, getProjectsContent, getPostsContent, getTestimoniosContent } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "tutierra-session-valid-token") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const [content, projects, posts, testimonios] = await Promise.all([
    getSiteContent(),
    getProjectsContent(),
    getPostsContent(),
    getTestimoniosContent(),
  ]);

  return NextResponse.json({
    content,
    projects,
    posts,
    testimonios,
  });
}
