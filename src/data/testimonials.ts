import type { Testimonial } from "@/types";

/**
 * Depoimentos fictícios (site de portfólio), como o resto dos dados de exemplo.
 *
 * Para usar avatares: coloque os arquivos em `public/avaliacoes/` e preencha
 * `photo` — ex: "/avaliacoes/rodrigo.jpg". O avatar é um círculo de 60px com
 * recorte `cover`, então o ideal é um quadrado (~200x200) com o rosto
 * centralizado. Sem `photo`, a moldura estilizada continua no lugar.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    photo: "/avaliacoes/rodrigo-meireles.jpg",
    name: "Rodrigo Meireles",
    quote:
      "Ambiente incrível, parece outra época. O corte ficou impecável e o atendimento foi excelente do início ao fim.",
    rating: 5,
  },
  {
    id: "t2",
    photo: "/avaliacoes/felipe-costa.jpg",
    name: "Felipe Costa",
    quote:
      "Sou cliente há 3 anos e nunca fui mal atendido. A barba terapia é surreal, saio de lá renovado",
    rating: 5,
  },
  {
    id: "t3",
    photo: "/avaliacoes/andre-nogueira.jpg",
    name: "André Nogueira",
    quote:
      "Assinei o plano Premium e não me arrependo. Vale cada centavo, virou parte da minha rotina.",
    rating: 5,
  },
  {
    id: "t4",
    photo: "/avaliacoes/caio-bittencourt.jpg",
    name: "Caio Bittencourt",
    quote:
      "Levei meu filho para cortar o cabelo e ele ficou muito feliz, o atendimento foi excelente.",
    rating: 5,
  },
];
