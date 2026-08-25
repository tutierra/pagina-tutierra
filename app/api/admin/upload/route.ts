import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // En Vercel o servidores Serverless, convertimos la imagen directamente a Data URL para evitar restricciones de disco
    if (process.env.VERCEL) {
      const base64 = buffer.toString("base64");
      const mimeType = file.type || "image/png";
      const dataUrl = `data:${mimeType};base64,${base64}`;
      return NextResponse.json({ success: true, url: dataUrl });
    }

    // Entorno local: guardar en la carpeta /public/uploads
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueName = `${Date.now()}-${safeName}`;
      const filePath = path.join(uploadDir, uniqueName);

      fs.writeFileSync(filePath, buffer);

      const publicPath = `/uploads/${uniqueName}`;
      return NextResponse.json({ success: true, url: publicPath });
    } catch (fsError) {
      // Fallback a Data URL si el disco es de solo lectura
      const base64 = buffer.toString("base64");
      const mimeType = file.type || "image/png";
      const dataUrl = `data:${mimeType};base64,${base64}`;
      return NextResponse.json({ success: true, url: dataUrl });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error al procesar la imagen" }, { status: 500 });
  }
}
