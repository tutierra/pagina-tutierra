import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { savePostsContent } from "@/lib/db";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "tutierra-session-valid-token") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();
    savePostsContent(data);

    revalidatePath("/", "layout");
    revalidatePath("/blog", "page");
    revalidatePath("/admin", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al guardar las publicaciones:", error);
    return NextResponse.json({ error: "Error al guardar las publicaciones" }, { status: 500 });
  }
}
