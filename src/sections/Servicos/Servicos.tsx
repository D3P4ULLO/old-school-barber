import { m } from "framer-motion";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { Icon, type IconName } from "@/ui/Icon/Icon";
import styles from "./Servicos.module.css";

// Formatar o preço em reais
const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

export function Servicos() {
  const reveal = useReveal();

  return (
    <section
      id="servicos"
      aria-label="Serviços"
      className="section-pad"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="container">
        <m.div className={styles.head} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            Menu de serviços
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Serviços
          </m.h2>
          <m.p className={styles.sub} {...reveal.item}>
            Da barba clássica ao combo completo — cada serviço com o tempo que
            merece.
          </m.p>
        </m.div>

        <m.div className={styles.grid} {...reveal.container}>
          {services.map((service) => (
            <m.article
              key={service.id}
              className={`${styles.card} ${service.highlighted ? styles.highlighted : ""}`}
              {...reveal.item}
              // O lift precisa vir daqui, e não de um :hover no CSS: o Motion
              // escreve `transform` inline no card e venceria a regra do CSS.
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className={styles.top}>
                <Icon name={service.icon as IconName} className={styles.icon} />
                <div className={styles.price}>
                  <small>a partir de </small>
                  {formatPrice(service.price)}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{service.name}</h3>
              <p className={styles.cardText}>{service.description}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
