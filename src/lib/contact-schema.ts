import { z } from "zod";

export const contactTypes = [
  { value: "publicar", label: "Publicar atividades" },
  { value: "publicidade", label: "Publicidade" },
  { value: "apoio", label: "Apoio ao projeto" },
] as const;

export type ContactType = (typeof contactTypes)[number]["value"];

export const contactSchema = z.object({
  nome: z.string().trim().min(2, "Indica o teu nome.").max(120),
  email: z.string().trim().email("Indica um email válido.").max(200),
  telemovel: z
    .string()
    .trim()
    .min(9, "Indica um telemóvel válido.")
    .max(20)
    .regex(/^[0-9+\s()-]+$/, "O telemóvel só pode conter números e símbolos habituais."),
  quantidade: z.coerce
    .number({ error: "Indica quantas atividades queres colocar." })
    .int("Usa um número inteiro.")
    .min(0, "A quantidade não pode ser negativa.")
    .max(500, "Indica um número até 500."),
  descricao: z.string().trim().max(4000, "A descrição é demasiado longa.").optional(),
  tipo: z.enum(["publicar", "publicidade", "apoio"], {
    error: "Escolhe o tipo de contacto.",
  }),
  consentimento: z.literal(true, {
    error: "É necessário aceitar a política de privacidade.",
  }),
});

export const contactRequestSchema = contactSchema.extend({
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
