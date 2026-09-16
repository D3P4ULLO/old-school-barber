import { useCallback, useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

interface UseCarouselOptions {
  /** Intervalo do autoplay em ms. 0 (padrão) desliga. */
  autoPlayMs?: number;
}

/**
 * Controla um carrossel construído com scroll nativo + CSS scroll-snap.
 *
 * Por que não uma biblioteca: o Swiper custava ~40 KB gzip no bundle para
 * exibir 4 depoimentos, e trazia junto um bug conhecido — a navegação parava
 * de funcionar depois de um hot reload, porque o módulo Navigation só se liga
 * aos botões na montagem da instância.
 *
 * Aqui o scroll é do próprio navegador (arrastar, roda do mouse e swipe já
 * funcionam de graça, com acessibilidade e inércia nativas); o hook só
 * cuida das setas, do autoplay e de saber quando chegou nas pontas.
 *
 * O ref do trilho vem de fora, em vez de ser devolvido daqui: assim o objeto
 * de retorno contém só estado e callbacks. Um hook que devolve ref misturado
 * com estado faz o `react-hooks/refs` tratar todo acesso ao objeto como
 * leitura de ref durante o render.
 */
export function useCarousel(
  trackRef: RefObject<HTMLElement | null>,
  { autoPlayMs = 0 }: UseCarouselOptions = {},
) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  // Recalcula em qual ponta estamos, para desabilitar a seta correspondente.
  const syncEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Tolerância de 2px: zoom e larguras fracionadas fazem o scrollLeft
    // parar em 0.5 ou max-0.5 e a seta ficaria eternamente habilitada.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, [trackRef]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    // O número de slides visíveis muda com o breakpoint; o ResizeObserver
    // recalcula as pontas sem precisar ouvir o resize da janela inteira.
    const observer = new ResizeObserver(syncEdges);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", syncEdges);
      observer.disconnect();
    };
  }, [trackRef, syncEdges]);

  const scrollByStep = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;

      // Distância de um slide medida no DOM — já embute o gap do flex.
      const [first, second] = el.children as unknown as HTMLElement[];
      const step =
        first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;

      el.scrollBy({
        left: direction * step,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [trackRef, reduce],
  );

  const next = useCallback(() => scrollByStep(1), [scrollByStep]);
  const prev = useCallback(() => scrollByStep(-1), [scrollByStep]);

  // Autoplay: avança sozinho e volta ao início ao chegar no fim.
  // Desliga se o usuário pediu menos animação ou está interagindo.
  useEffect(() => {
    if (!autoPlayMs || reduce || paused) return;

    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByStep(1);
      }
    }, autoPlayMs);

    return () => clearInterval(id);
  }, [trackRef, autoPlayMs, reduce, paused, scrollByStep]);

  return {
    next,
    prev,
    atStart,
    atEnd,
    /** Ligue no container: pausa o autoplay enquanto há mouse ou foco dentro. */
    pauseHandlers: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocusCapture: () => setPaused(true),
      onBlurCapture: () => setPaused(false),
    },
  };
}
