import { m } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/data/site";
import styles from "./Localizacao.module.css";

// Horários e endereço vêm de @/data/site — trocar lá reflete aqui e no JSON-LD.
const horarios = [
  ...site.hours.map((h) => ({ dia: h.display, horario: h.time })),
  { dia: "Endereço", horario: site.address.street },
];

// URL de embed do Google Maps. Como o endereço é fictício, aponta para a Rua
// Augusta genérica. Para trocar pelo endereço real de um cliente:
// Google Maps -> buscar endereço -> Compartilhar -> Incorporar um mapa ->
// copiar o src do iframe e colar aqui.
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Rua+Augusta,+São+Paulo,+SP&output=embed";

export function Localizacao() {
  const reveal = useReveal();

  return (
    <section
      id="localizacao"
      aria-label="Localização"
      className="section-pad"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="container">
        <m.div className={styles.head} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            Nossa localização
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Localização &amp; horários.
          </m.h2>
        </m.div>

        <m.div className={styles.grid} {...reveal.container}>
          <m.div className={styles.mapWrap} {...reveal.item}>
            <iframe
              className={styles.map}
              src={MAPS_EMBED_URL}
              title="Mapa da localização da Old School Barber"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </m.div>

          <m.ul className={styles.hours} {...reveal.item}>
            {horarios.map((h) => (
              <li key={h.dia}>
                <span className={styles.day}>{h.dia}</span>
                <span>{h.horario}</span>
              </li>
            ))}
          </m.ul>
        </m.div>
      </div>
    </section>
  );
}
