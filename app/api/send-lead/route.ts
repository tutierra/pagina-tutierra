import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/site-data";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombre, telefono, email, proyecto, mensaje, origen = "Formulario Web Principal" } = data;

    const tag = "lead de pagina importante";
    const destinationEmail = "tutierrab@gmail.com";
    const subject = `[${tag}] Nuevo Lead: ${nombre || email || "Cliente Interesado"}`;

    const contentText = `
=== NUEVO LEAD REGISTRADO ===
Tag: ${tag}
Destino: ${destinationEmail}
Origen: ${origen}

Nombre: ${nombre || "No especificado"}
Teléfono / WhatsApp: ${telefono || "No especificado"}
Correo Electrónico: ${email || "No especificado"}
Proyecto de Interés: ${proyecto || "No especificado"}
Mensaje: ${mensaje || "Sin mensaje adicional"}
Fecha: ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}
=============================
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0d1a15; color: #e2e8f0; margin: 0; padding: 30px 15px; }
    .container { max-width: 580px; margin: 0 auto; background-color: #12241d; border: 1px solid #1f3a2f; border-radius: 16px; padding: 32px; }
    .badge { display: inline-block; background-color: #00d68f; color: #0b1411; font-weight: 700; font-size: 11px; padding: 6px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    h2 { font-size: 22px; font-weight: 300; color: #ffffff; margin-top: 0; margin-bottom: 8px; }
    p.sub { font-size: 13px; color: #94a3b8; margin-top: 0; margin-bottom: 24px; }
    .card { background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; }
    .field { margin-bottom: 14px; }
    .field:last-child { margin-bottom: 0; }
    .label { font-size: 11px; text-transform: uppercase; color: #00d68f; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; }
    .value { font-size: 15px; color: #ffffff; font-weight: 500; word-break: break-word; }
    .footer { font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #1f3a2f; padding-top: 20px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">lead de pagina importante</div>
    <h2>Nuevo Cliente Interesado</h2>
    <p class="sub">Se ha recibido una nueva solicitud desde la página web de Tutierra.</p>
    
    <div class="card">
      <div class="field">
        <div class="label">Origen / Formulario</div>
        <div class="value">${origen}</div>
      </div>
      <div class="field">
        <div class="label">Nombre del Cliente</div>
        <div class="value">${nombre || "No especificado"}</div>
      </div>
      <div class="field">
        <div class="label">Teléfono / WhatsApp</div>
        <div class="value">${telefono || "No especificado"}</div>
      </div>
      <div class="field">
        <div class="label">Correo Electrónico</div>
        <div class="value">${email || "No especificado"}</div>
      </div>
      <div class="field">
        <div class="label">Proyecto de Interés</div>
        <div class="value">${proyecto || "No especificado"}</div>
      </div>
      <div class="field">
        <div class="label">Mensaje</div>
        <div class="value">${mensaje || "Sin mensaje adicional"}</div>
      </div>
    </div>

    <div class="footer">
      Tutierra Grupo Inmobiliario • Notificación Automática de Leads
    </div>
  </div>
</body>
</html>
    `.trim();

    console.log(contentText);

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey.trim()}`,
          },
          body: JSON.stringify({
            from: "Tutierra Leads <onboarding@resend.dev>",
            to: [destinationEmail],
            subject: subject,
            text: contentText,
            html: htmlContent,
          }),
        });

        const resendData = await resendRes.json();
        console.log("Resend API response:", resendData);
      } catch (err) {
        console.error("Error al enviar email vía Resend API:", err);
      }
    } else {
      console.warn("ADVERTENCIA: RESEND_API_KEY no encontrada en .env.local. El lead se registró solo en consola.");
    }

    return NextResponse.json({
      success: true,
      tag: tag,
      destination: destinationEmail,
      hasKey: !!apiKey,
    });
  } catch (error) {
    console.error("Error en /api/send-lead:", error);
    return NextResponse.json({ error: "Error al procesar el lead" }, { status: 500 });
  }
}
