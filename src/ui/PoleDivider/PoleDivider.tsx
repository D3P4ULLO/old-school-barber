import styles from "./PoleDivider.module.css";

// Faixa listrada na diagonal que evoca o poste de barbearia (barber pole), usada como separador de seções.
export function PoleDivider() {
  return <div className={styles.pole} aria-hidden="true" />;
}
