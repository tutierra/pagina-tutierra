import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { saveSiteContent } from "@/lib/db";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "tutierra-session-valid-token") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Sincroniza contactData en todas las claves comunes (contact, footer, company_info)
    const contactData = data.contact || data.footer || data.company_info || {};
    const fullPayload = {
      ...data,
      contact: contactData,
      footer: contactData,
      company_info: contactData,
    };

    await saveSiteContent(fullPayload);

    // Revalida de inmediato la ruta raíz con 'layout' y todas las páginas públicas
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/proyectos", "page");
    revalidatePath("/proyectos/[slug]", "page");
    revalidatePath("/nosotros", "page");
    revalidatePath("/blog", "page");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/testimonios", "page");
    revalidatePath("/refiere-y-gana", "page");
    revalidatePath("/contactanos", "page");
    revalidatePath("/admin", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al guardar el contenido:", error);
    return NextResponse.json({ error: "Error al guardar el contenido" }, { status: 500 });
  }
}
