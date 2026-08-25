import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { saveSiteContent } from "@/lib/db";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "tutierra-session-valid-token") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();
    saveSiteContent(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al guardar el contenido" }, { status: 500 });
  }
}
