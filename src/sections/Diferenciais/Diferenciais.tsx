import { m } from "framer-motion";
import { diferenciais } from "@/data/diferenciais.ts";
import { useReveal } from "@/hooks/useReveal.ts";
import { Icon } from "@/ui/Icon/Icon.tsx";
import styles from "./Diferenciais.module.css";

export function Diferenciais() {
  const reveal = useReveal();

  return (
    <section
      id="diferenciais"
      aria-label="Diferenciais"
      className="section-pad"
    >
      <div className="container">
        <m.div className={styles.head} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            Porque a Old School
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Nossos diferenciais
          </m.h2>
        </m.div>

        <m.div className={styles.grid} {...reveal.container}>
          {diferenciais.map((d) => (
            <m.article
              key={d.id}
              className={styles.card}
              {...reveal.item}
              // Idem Servicos: o :hover do CSS perderia para o transform
              // inline que o Motion deixa no elemento.
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Icon name={d.icon} className={styles.icon} />
              <h3 className={styles.cardTitle}>{d.title}</h3>
              <p className={styles.cardText}>{d.description}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
