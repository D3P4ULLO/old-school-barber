import styles from "./StickyMobileCTA.module.css";

// Barra fixa no rodapé - visivel apenas no mobile
export function StickyMobileCTA() {
  return (
    <div className={styles.bar}>
      <a href="#contato" className={`btn btn--primary btn--glow ${styles.cta}`}>
        Agendar horário
      </a>
    </div>
  );
}
