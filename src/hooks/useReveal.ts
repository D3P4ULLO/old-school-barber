import { useReducedMotion, type Variants } from "framer-motion";

/* Fornece as props de animação "reveal on scroll" para elentos farmer motion.
Centralizar o padrão usado nas seções: o elemento sone e aparece qiando entra na viewport, uma unica vez.
Por que um hook: evita repetir os mesmos objetos de variants em cada seção e garante que todas respeitem `prefers-reduced-motion` de forma consistente.
*/

export function useReveal() {
  const reduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
    },
  };

  return {
    // Aplique no elemento pai que orquesta a sequência dos filhos
    container: {
      variants: containerVariants,
      initial: reduce ? (false as const) : "hidden",
      whileInView: "show",
      // once: true -> anima só na primeira vez que entra na tela
      // margin negativo -> dispara um pouco antes de estar 100% visivel
      viewport: { once: true, margin: "-10%" },
    },
    // Aplique no elemento filho que aparece
    item: {
      variants: itemVariants,
    },
  };
}
