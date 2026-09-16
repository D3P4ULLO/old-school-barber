import { m, useReducedMotion, type Variants } from "framer-motion";
import styles from "./Hero.module.css";

// Container
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Cada elemento sobe 24px e aparece
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export function Hero() {
  // Respeita quem desativou animações no sistema: sem reduce, anima. Com Reduce, renderiza direto no estado final

  const reduce = useReducedMotion();

  return (
    <section id="home" aria-label="Início" className={styles.hero}>
      <m.div
        className={`container ${styles.inner}`}
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <m.span className="eyebrow" variants={item}>
          Desde 2012 - São Paulo
        </m.span>

        <m.h1 className={styles.title} variants={item}>
          Old School <span className={styles.accent}>Barber</span>
        </m.h1>

        <m.p className={styles.tagline} variants={item}>
          "Mais do que um corte. Um estilo."
        </m.p>

        <m.div className={styles.actions} variants={item}>
          <a href="#contato" className="btn btn--primary btn--glow">
            Agendar horário
          </a>

          <a href="#servicos" className="btn btn--ghost">
            Conheça nossos serviços
          </a>
        </m.div>
      </m.div>

      {/* Indicador de scroll - decorativo */}
      <div className={styles.scroll} aria-hidden="true">
        <span>ROLE</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
