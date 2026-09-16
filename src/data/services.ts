import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "corte-classico",
    name: "Corte Clássico",
    description:
      "Tesoura e máquina, acabamento na navalha e finalização com produtos premium.",
    price: 60,
    icon: "scissors",
  },
  {
    id: "barba-terapia",
    name: "Barba Terapia",
    description:
      "Toalha quente, navalha e óleo finalizador para uma barba desenhada com precisão.",
    price: 50,
    icon: "razor",
  },
  {
    id: "combo-corte-barba",
    name: "Combo Corte + Barba",
    description:
      "O clássico completo: corte na régua e barba alinhada em um único horário.",
    price: 100,
    icon: "pole",
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    description:
      "Disfarce de falhas e uniformização de tom para barba e cabelo com efeito natural.",
    price: 45,
    icon: "tone",
  },
  {
    id: "design-sobrancelha",
    name: "Design de Sobrancelha",
    description:
      "Alinhamento na navalha para uma expressão mais limpa, sem perder a naturalidade.",
    price: 30,
    icon: "eyebrow",
  },
  {
    id: "combo-premium",
    name: "Combo Premium",
    description:
      "Corte, barba, pigmentação e sobrancelha — a experiência completa Old School.",
    price: 150,
    icon: "crown",
    highlighted: true,
  },
];
