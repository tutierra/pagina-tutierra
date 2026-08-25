import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { saveProjectsContent } from "@/lib/db";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "tutierra-session-valid-token") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();
    saveProjectsContent(data);

    // Revalida de inmediato el caché de todas las páginas públicas al guardar desde el CMS
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/proyectos", "page");
    revalidatePath("/admin", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al guardar los proyectos:", error);
    return NextResponse.json({ error: "Error al guardar los proyectos" }, { status: 500 });
  }
}
