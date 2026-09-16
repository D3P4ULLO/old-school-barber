import type { GalleryItem } from "@/types";

/**
 * As fotos vivem em `public/galeria/` e entram por `imageSrc`. O
 * PhotoPlaceholder troca a moldura pela <img> sozinho, com lazy loading e sem
 * layout shift; item sem `imageSrc` volta a exibir a moldura estilizada.
 *
 * Nomes de arquivo em kebab-case sem acento de propósito: hospedagem Linux
 * diferencia maiúsculas e caractere acentuado vira percent-encoding na URL.
 */
export const gallery: GalleryItem[] = [
  {
    id: "g1",
    caption: "Cadeira clássica de couro",
    imageSrc: "/galeria/cadeira-classica-de-couro.jpg",
  },
  {
    id: "g2",
    caption: "Corte na régua",
    imageSrc: "/galeria/corte-na-regua.jpg",
  },
  {
    id: "g3",
    caption: "Barba na navalha",
    imageSrc: "/galeria/barba-na-navalha.jpg",
  },
  {
    id: "g4",
    caption: "Bancada de produtos",
    imageSrc: "/galeria/bancada-de-produtos.jpg",
  },
  {
    id: "g5",
    caption: "Ambiente industrial",
    imageSrc: "/galeria/ambiente-industrial.jpg",
  },
  {
    id: "g6",
    caption: "Toalha quente",
    imageSrc: "/galeria/toalha-quente.jpg",
  },
  {
    id: "g7",
    caption: "Acabamento fade",
    imageSrc: "/galeria/corte-low-fade.jpg",
  },
  {
    id: "g8",
    caption: "Detalhe da pigmentação",
    imageSrc: "/galeria/pigmentacao.jpg",
  },
];
