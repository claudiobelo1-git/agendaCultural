import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactRequestSchema, contactTypes } from "@/lib/contact-schema";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Demasiados pedidos. Tenta mais tarde.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Pedido inválido." },
      { status: 400 },
    );
  }

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Revisa os campos do formulário.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "O envio de emails ainda não está configurado. Define RESEND_API_KEY, RESEND_FROM_EMAIL e CONTACT_TO_EMAIL.",
      },
      { status: 503 },
    );
  }

  const tipoLabel =
    contactTypes.find((item) => item.value === parsed.data.tipo)?.label ??
    parsed.data.tipo;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `[Elvas Cultura] ${tipoLabel} — ${parsed.data.nome}`,
    text: [
      `Tipo: ${tipoLabel}`,
      `Nome: ${parsed.data.nome}`,
      `Email: ${parsed.data.email}`,
      `Telemóvel: ${parsed.data.telemovel}`,
      `Quantidade de atividades: ${parsed.data.quantidade}`,
      "",
      parsed.data.descricao || "(sem descrição)",
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { ok: false, message: "Não foi possível enviar a mensagem. Tenta mais tarde." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
