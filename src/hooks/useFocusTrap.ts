import { useEffect, useRef } from "react";

const FOCAVEIS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Prende o foco do teclado dentro de um elemento enquanto ele estiver ativo.
 *
 * Por que é necessário: um modal que só aparece visualmente continua deixando
 * o Tab passear pela página atrás dele. Para quem navega por teclado ou usa
 * leitor de tela, o foco "some" — some da tela, não do DOM — e a pessoa fica
 * tabulando por links invisíveis sem entender onde está.
 *
 * Também devolve o foco para o elemento que abriu o modal ao fechar, para a
 * navegação continuar de onde parou.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const containerRef = useRef<T>(null);
  const origemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    // Guarda quem tinha o foco para devolver no fechamento.
    origemRef.current = document.activeElement as HTMLElement | null;

    const focaveis = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCAVEIS)).filter(
        (el) => el.offsetParent !== null,
      );

    // Move o foco para dentro do modal assim que ele abre.
    (focaveis()[0] ?? container).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const itens = focaveis();
      if (itens.length === 0) {
        e.preventDefault();
        return;
      }

      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      const atual = document.activeElement;

      // Circula: Tab no último volta para o primeiro e Shift+Tab faz o inverso.
      if (e.shiftKey && (atual === primeiro || !container.contains(atual))) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && atual === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      origemRef.current?.focus();
    };
  }, [active]);

  return containerRef;
}
