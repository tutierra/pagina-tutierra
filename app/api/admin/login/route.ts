import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = "turriate2026";
const ADMIN_PASSWORD = "tutierra2026";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if ((username === ADMIN_USER || username === "admin") && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_token", "tutierra-session-valid-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Usuario o contraseña incorrectos" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
