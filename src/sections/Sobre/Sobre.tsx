import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { stats } from "@/data/stats";
import { useReveal } from "@/hooks/useReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { PhotoPlaceholder } from "@/ui/PhotoPlaceholder/PhotoPlaceholder";
import styles from "./Sobre.module.css";

/**
 * Foto da seção, em `public/sobre/`. Deixar `undefined` devolve a moldura
 * estilizada ao lugar dela.
 *
 * A moldura é `4 / 5` com recorte `cover`: como o arquivo atual é 2/3 (mais
 * alongado), a imagem preenche a largura e perde ~16% da altura. O
 * `object-position` em Sobre.module.css tira esse corte de baixo (a capa preta)
 * em vez de repartir entre topo e base, preservando os dois rostos.
 */
const FOTO_SOBRE: string | undefined = "/sobre/barbeiro-em-acao.jpg";

// Subcomponente de uma estatística. Existe separado porque cada número precisa da SUA chamada de useCountUp — e hooks não podem ser chamados dentro de
// um .map(). Cada <StatItem /> é um componente próprio, então cada um tem seu hook legalmente.

interface StatItemProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  active: boolean;
}

function StatItem({
  value,
  decimals,
  prefix,
  suffix,
  label,
  active,
}: StatItemProps) {
  const display = useCountUp(value, { active, decimals });

  return (
    <div className={styles.stat}>
      <div className={styles.num}>
        {prefix}
        {display}
        {suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export function Sobre() {
  const reveal = useReveal();

  // Dispara a contagem quando a linha de stats entra na tela.
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section
      id="sobre"
      aria-label="Sobre a barbearia"
      className="section-pad"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className={`container ${styles.grid}`}>
        <m.div className={styles.photoWrap} {...reveal.container}>
          <m.div {...reveal.item} style={{ width: "100%" }}>
            <PhotoPlaceholder
              caption="Foto — Barbeiro em ação"
              imageSrc={FOTO_SOBRE}
              alt="Barbeiro da Old School Barber em atendimento"
              ratio="4 / 5"
            />
          </m.div>
        </m.div>

        <m.div className={styles.text} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            Nossa história
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Tradição que se corta à mão
          </m.h2>
          <m.p className={styles.paragraph} {...reveal.item}>
            Em 2012, o mestre barbeiro Diego Ramos abriu as portas de um pequeno
            salão na Consolação com uma cadeira, uma navalha e a convicção de
            que barbearia é ofício, não moda passageira.
          </m.p>
          <m.p className={styles.paragraph} {...reveal.item}>
            Doze anos depois, a Old School Barber se tornou point de gerações de
            pai e filho, motociclistas, atletas e quem simplesmente aprecia um
            corte bem feito — sempre com música, café e conversa de qualidade.
          </m.p>

          <div className={styles.statsRow} ref={statsRef}>
            {stats.map((s) => (
              <StatItem
                key={s.id}
                value={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                label={s.label}
                active={statsInView}
              />
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
