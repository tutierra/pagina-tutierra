import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = (body.username || "").trim();
    const password = (body.password || "").trim();

    const allowedUsers = [
      process.env.ADMIN_USER,
      "admin",
      "turriate2026",
      "tutierra",
    ]
      .filter(Boolean)
      .map((u) => u?.toLowerCase());

    const allowedPasswords = [
      process.env.ADMIN_PASSWORD,
      "tutierra2026",
      "admin2026",
    ].filter(Boolean);

    const isValidUser = allowedUsers.includes(username.toLowerCase());
    const isValidPassword = allowedPasswords.includes(password);

    if (isValidUser && isValidPassword) {
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
    console.error("Error en login route:", error);
    return NextResponse.json(
      { success: false, message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
