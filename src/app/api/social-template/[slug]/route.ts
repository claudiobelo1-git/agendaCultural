import { NextResponse } from "next/server";

/**
 * Fase 2 futura (não implementar agora):
 * gerar automaticamente o "Template Post" para Instagram/Facebook a partir
 * de um evento — dia, hora, local, categoria e cartaz — e devolver uma imagem
 * (por exemplo PNG 1080×1080).
 *
 * Esta rota existe só para deixar a estrutura preparada.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  return NextResponse.json(
    {
      error: "Não implementado",
      slug,
      planned:
        "Gerar imagem de template social (dia, hora, local, categoria e cartaz).",
    },
    { status: 501 },
  );
}
