import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "tutierra-session-valid-token") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // Revalida recursivamente todas las páginas del sitio
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Caché del sitio revalidada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al revalidar la caché" }, { status: 500 });
  }
}
