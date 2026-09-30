export const CATEGORIAS = [
  { value: "exposicoes", title: "Exposições" },
  { value: "literatura", title: "Literatura" },
  { value: "cinema", title: "Cinema" },
  { value: "festivais", title: "Festivais" },
  { value: "musica", title: "Música" },
  { value: "infantil", title: "Infantil" },
  { value: "workshops", title: "Workshops" },
  { value: "rotas", title: "Rotas" },
  { value: "teatro", title: "Teatro" },
  { value: "festas", title: "Festas" },
] as const;

export type Categoria = (typeof CATEGORIAS)[number]["value"];

export const categoriaLabels: Record<Categoria, string> = Object.fromEntries(
  CATEGORIAS.map((item) => [item.value, item.title]),
) as Record<Categoria, string>;

export function isCategoria(value: string): value is Categoria {
  return CATEGORIAS.some((item) => item.value === value);
}
