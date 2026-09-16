import { useEffect } from "react";
import styles from "./MobileMenu.module.css";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLink[];
  onClose: () => void;
}

/* * Menu lateral (drawer) para mobile. É um componente de APRESENTAÇÃO: */
export function MobileMenu({ isOpen, links, onClose }: MobileMenuProps) {
  // Fecha o menu ao apertar Esc — acessibilidade de teclado.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Trava o scroll do body enquanto o menu está aberto, para a página não rolar.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Fundo escurecido; clicar nele fecha o menu */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* `inert` no lugar de `aria-hidden`: o painel fechado continua no DOM,
          deslocado para fora da tela. Com aria-hidden os links seguiam
          focáveis pelo Tab (o foco sumia da tela) — o inert remove o conteúdo
          da navegação por teclado E da árvore de acessibilidade de uma vez. */}
      <nav
        id="mobile-menu"
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        aria-label="Navegação mobile"
        inert={!isOpen}
      >
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.href}>
              {/* onClick fecha o menu ao navegar para a âncora */}
              <a href={link.href} className={styles.link} onClick={onClose}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contato" className={`btn btn--primary btn--glow btn--block ${styles.cta}`} onClick={onClose}>
          Agendar horário
        </a>
      </nav>
    </>
  );
}
