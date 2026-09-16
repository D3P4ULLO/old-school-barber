import type { Plan } from "@/types";

export const plans: Plan[] = [
  {
    id: "mensal",
    name: "Mensal",
    price: 89,
    features: [
      { id: "f1", label: "1 corte por mês" },
      { id: "f2", label: "1 barba por mês" },
      { id: "f3", label: "10% off em produtos" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 149,
    featured: true,
    features: [
      { id: "f1", label: "2 cortes por mês" },
      { id: "f2", label: "Barba ilimitada" },
      { id: "f3", label: "Produto premium grátis" },
      { id: "f4", label: "20% off em produtos" },
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 219,
    features: [
      { id: "f1", label: "Cortes e barba ilimitados" },
      { id: "f2", label: "Atendimento prioritário" },
      { id: "f3", label: "Bebida de cortesia" },
      { id: "f4", label: "30% off em produtos" },
    ],
  },
];
