import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  // Dispara contagem (ex: quando a seção entra na tela).
  active: boolean;
  // Duração da contagem em ms (padrão: 1800)
  duration?: number;
  // Em casa decimais (ex: 1 para "4.9")
  decimals?: number;
}
// Anima um número de 0 até 'end' quando 'active' for true.
// Usa requestAnimationFrame (não setInterval) com easing: a contagem desacelera no fim, o que parece mais natural que incremento linear.
// A flag 'active' vem de fora (ex: useInView), para contagem começar só quando a seção estiver visivel.
export function useCountUp(
  end: number,
  { active, duration = 1800, decimals = 0 }: UseCountUpOptions,
) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    // Conta uma unica vez, quando ativar.
    if (!active || startedRef.current) return;
    startedRef.current = true;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutQuad: rápido no começo, suave no fim.
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, end, duration]);

  // Formata com as casas decimais perdidas e separador de milhar (ex: 1.234,56), pt-BR.
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
