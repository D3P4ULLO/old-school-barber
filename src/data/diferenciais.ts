import type { IconName } from "@/ui/Icon/Icon.tsx";

interface Diferencial {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export const diferenciais: Diferencial[] = [
  {
    id: "atendimento",
    icon: "coffee",
    title: "Atendimento Personalizado",
    description:
      "Cada cliente é recebido com atenção exclusiva, do primeiro café ao último detalhe do corte.",
  },
  {
    id: "barbeiros",
    icon: "clipper",
    title: "Barbeiros experientes",
    description:
      "Profissionais com mais de uma década de ofício, formados na tradição clássica da navalha.",
  },
  {
    id: "produtos",
    icon: "bottle",
    title: "Produtos Premium",
    description:
      "Linhas selecionadas de pomadas, óleos e loções, escolhidas pelo desempenho e pelo aroma.",
  },
  {
    id: "ambiente",
    icon: "armchair",
    title: "Ambiente Vintage exclusivo",
    description:
      "Decoração industrial vintage, couro, madeira e música ao vivo — uma pausa de outra época.",
  },
];
