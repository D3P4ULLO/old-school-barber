import { m } from "framer-motion";
import { plans } from "@/data/plans";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Planos.module.css";

// Formata o preço em reais (sem centavos), igual padrão dos serviços.
const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

export function Planos() {
  const reveal = useReveal();

  return (
    <section
      id="planos"
      aria-label="Planos"
      className="section-pad"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="container">
        <m.div className={styles.head} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            Faça parte da casa
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Planos de assinatura
          </m.h2>
        </m.div>

        <m.div className={styles.grid} {...reveal.container}>
          {plans.map((plan) => (
            <m.article
              key={plan.id}
              className={`${styles.card} ${plan.featured ? styles.featured : ""}`}
              {...reveal.item}
            >
              {plan.featured && (
                <span className={styles.badge}>Mais escolhido</span>
              )}

              <h3 className={styles.name}>{plan.name}</h3>
              <div className={styles.price}>
                {formatPrice(plan.price)}
                <span>/mês</span>
              </div>

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature.id}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature.label}
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`btn btn--block ${plan.featured ? "btn--primary btn--glow" : "btn--ghost"}`}
              >
                Agendar horário
              </a>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
