import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== "tutierra-session-valid-token") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL no proporcionada" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Extraer el nombre del archivo de la URL pública de Supabase Storage
      let fileName = url;
      if (url.includes("/tutierra-media/")) {
        fileName = url.split("/tutierra-media/").pop() || "";
      } else if (url.includes("/")) {
        fileName = url.split("/").pop() || "";
      }

      if (fileName) {
        const { error } = await supabase.storage
          .from("tutierra-media")
          .remove([fileName]);

        if (error) {
          console.error("Error al eliminar archivo de Supabase Storage:", error);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en delete-file route:", error);
    return NextResponse.json({ error: "Error al eliminar el archivo" }, { status: 500 });
  }
}
