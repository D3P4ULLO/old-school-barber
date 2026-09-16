import { useCallback, useEffect, useState } from "react";

// * Controla o estado do lightbox (modal de galeria): qual imagem está aberta,

export function useLightbox(total: number) {
  const [index, setIndex] = useState<number | null>(null);

  const isOpen = index !== null;

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(() => {
    setIndex((cur) => (cur === null ? cur : (cur + 1) % total));
  }, [total]);

  const prev = useCallback(() => {
    setIndex((cur) => (cur === null ? cur : (cur - 1 + total) % total));
  }, [total]);

  // Teclado: Esc fecha, setas navegam. Só ativo enquanto aberto.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close, next, prev]);

  // Trava o scroll do body enquanto o modal está aberto.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { index, isOpen, open, close, next, prev };
}
