import { useState } from "react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { MobileMenu } from "@/layout/MobileMenu/MobileMenu.tsx";
import styles from "./Header.module.css";

/** Itens do menu — href aponta para o id de cada seção no App.tsx.
    Ficam aqui porque o Header é o "dono" da navegação; o MobileMenu
    apenas recebe esta lista via props. */
const navLinks = [
  { href: "#home", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#equipe", label: "Equipe" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const scrolled = useScrollHeader();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.row}`}>
        {/* Sem aria-label: o texto visível ("OSB Old School Barber") já é um
            bom nome acessível, e um rótulo diferente dele quebra a WCAG 2.5.3
            (o nome acessível precisa conter o texto visível). */}
        <a href="#home" className={styles.logo}>
          <span className={styles.seal}>OSB</span>
          Old School <span className={styles.logoAccent}>Barber</span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contato" className={`btn btn--primary btn--glow btn--sm ${styles.cta}`}>
          Agendar horário
        </a>

        {/* Botão hambúrguer — só aparece no mobile (controlado via CSS).
            aria-expanded e aria-controls informam leitores de tela sobre
            o estado e o alvo do botão. */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={menuOpen ? styles.burgerLineTop : ""} />
          <span className={menuOpen ? styles.burgerLineMid : ""} />
          <span className={menuOpen ? styles.burgerLineBot : ""} />
        </button>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        links={navLinks}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}
