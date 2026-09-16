import { useRef } from "react";
import { m } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { useReveal } from "@/hooks/useReveal";
import { useCarousel } from "@/hooks/useCarousel";
import { PhotoPlaceholder } from "@/ui/PhotoPlaceholder";
import styles from "./Avaliacoes.module.css";

export function Avaliacoes() {
  const reveal = useReveal();
  // Carrossel em scroll nativo + scroll-snap. Substituiu o Swiper, que pesava
  // ~40 KB gzip para 4 depoimentos e perdia a navegação depois de um hot reload.
  const trackRef = useRef<HTMLUListElement>(null);
  const carousel = useCarousel(trackRef, { autoPlayMs: 5000 });

  return (
    <section id="avaliacoes" aria-label="Avaliações" className="section-pad">
      <div className="container">
        <m.div className={styles.head} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            O que nossos clientes dizem
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Avaliações
          </m.h2>
        </m.div>

        {/* aria-roledescription + os botões abaixo descrevem o carrossel para
            leitores de tela; o trilho é focável por teclado (tabIndex 0) para
            quem navega sem mouse conseguir rolá-lo com as setas. */}
        <div
          role="group"
          aria-roledescription="carrossel"
          aria-label="Depoimentos de clientes"
          {...carousel.pauseHandlers}
        >
          <ul
            className={styles.track}
            ref={trackRef}
            tabIndex={0}
            aria-label="Lista de depoimentos"
          >
            {testimonials.map((t, i) => (
              <li
                key={t.id}
                className={styles.slide}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${testimonials.length}`}
              >
                <article className={styles.card}>
                  {/* role="img" é obrigatório aqui: aria-label é proibido em
                      um <div> sem papel definido, e o leitor de tela ignoraria
                      o rótulo, anunciando só as estrelas como texto solto. */}
                  <div
                    className={styles.stars}
                    role="img"
                    aria-label={`Avaliação: ${t.rating} de 5 estrelas`}
                  >
                    <span aria-hidden="true">{"★".repeat(t.rating)}</span>
                  </div>
                  <p className={styles.quote}>{t.quote}</p>
                  <div className={styles.author}>
                    {/* `alt` vazio de propósito: o nome vem logo ao lado, em
                        texto. Descrever a foto aqui faria o leitor de tela
                        anunciar a mesma pessoa duas vezes. */}
                    <PhotoPlaceholder
                      ratio="1 / 1"
                      imageSrc={t.photo}
                      alt=""
                      className={styles.avatar}
                    />
                    <span className={styles.name}>{t.name}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={carousel.prev}
              disabled={carousel.atStart}
              aria-label="Depoimento anterior"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={carousel.next}
              disabled={carousel.atEnd}
              aria-label="Depoimento seguinte"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
