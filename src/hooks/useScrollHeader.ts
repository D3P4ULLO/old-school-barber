import { useEffect, useState } from "react";

/**
 * Retorna `true` quando a página foi rolada além de `threshold` pixels.
 * Usado pelo Header para trocar de estilo (transparente -> sólido) no scroll.
 *
 * Por que um hook separado: isola a lógica de scroll do JSX do Header,
 * deixando o componente focado só na renderização. Também fica reutilizável
 * (ex: se quisermos mostrar/esconder o botão flutuante com a mesma regra).
 *
 * @param threshold quantidade de pixels de scroll para ativar (padrão: 40)
 */
export function useScrollHeader(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Checa uma vez na montagem — cobre o caso de a página já carregar
    // com scroll (ex: reload no meio da página).
    handleScroll();

    // passive: true melhora a performance do scroll (o browser não espera
    // o handler para decidir se rola a página).
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
