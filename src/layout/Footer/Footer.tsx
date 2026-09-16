import { site, fullAddress } from "@/data/site";
import styles from "./Footer.module.css";

// Links de navegação do rodapé.
const footerNav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  // Ano dinâmico para o rodapé
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* 1ª Coluna - Marca / endereço e sociais */}
          <div>
            <div className={styles.logo}>
              <span className={styles.seal}>OSB</span>
              {site.name}
            </div>
            <p className={styles.address}>
              Tradição, elegância e ofício desde {site.foundingYear} —{" "}
              {fullAddress}.
            </p>
            <div className={styles.socials}>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram da ${site.name}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook da ${site.name}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13 22v-8h3l.5-3.5H13V8.3c0-1 .3-1.7 1.8-1.7H17V3.5c-.9-.1-1.8-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6v2.6H6.5V14H9.8v8H13z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2ª Coluna - Contato.
              h2 (e não h4): o último título da página é um h2, e pular para h4
              quebrava a ordem hierárquica que leitores de tela usam para
              navegar. O tamanho visual vem da classe, não da tag. */}
          <div>
            <h2 className={styles.heading}>Contato</h2>
            <a href={`tel:${site.phone.e164}`} className={styles.link}>
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={styles.link}>
              {site.email}
            </a>
          </div>

          {/* 3ª Coluna - Navegação */}
          <div>
            <h2 className={styles.heading}>Navegação</h2>
            {footerNav.map((item) => (
              <a key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ))}
          </div>

          <div className={styles.bottom}>
            <span>
              © {year} {site.name}. Todos os direitos reservados.
            </span>
            <span>Feito com navalha e café!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
