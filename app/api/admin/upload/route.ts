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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Credenciales de Supabase (NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY) no están configuradas en Vercel." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;

    // Subir directamente al bucket 'tutierra-media' en Supabase Storage sin fs local
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("tutierra-media")
      .upload(fileName, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      console.error("Error al subir archivo a Supabase Storage:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Obtener la URL pública del archivo subido
    const { data: publicUrlData } = supabase.storage
      .from("tutierra-media")
      .getPublicUrl(uploadData.path);

    const publicUrl = publicUrlData.publicUrl;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: error?.message || "Error al procesar la imagen" },
      { status: 500 }
    );
  }
}
