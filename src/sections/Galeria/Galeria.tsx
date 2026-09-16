import { m, AnimatePresence } from "framer-motion";
import { gallery } from "@/data/gallery";
import { useReveal } from "@/hooks/useReveal";
import { useLightbox } from "@/hooks/useLightbox";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { PhotoPlaceholder } from "@/ui/PhotoPlaceholder";
import styles from "./Galeria.module.css";

export function Galeria() {
  const reveal = useReveal();
  const lightbox = useLightbox(gallery.length);
  // Prende o Tab dentro do modal e devolve o foco para a miniatura ao fechar.
  const modalRef = useFocusTrap<HTMLDivElement>(lightbox.isOpen);

  // Item atualmente aberto no modal (ou null).
  const current = lightbox.index !== null ? gallery[lightbox.index] : null;

  return (
    <section id="galeria" aria-label="Galeria" className="section-pad">
      <div className="container">
        <m.div className={styles.head} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            Registros da casa
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Galeria
          </m.h2>
        </m.div>

        <m.div className={styles.grid} {...reveal.container}>
          {gallery.map((item, i) => (
            <m.button
              key={item.id}
              type="button"
              className={styles.item}
              {...reveal.item}
              onClick={() => lightbox.open(i)}
              aria-label={`Ampliar foto: ${item.caption}`}
            >
              <PhotoPlaceholder
                caption={item.caption}
                imageSrc={item.imageSrc}
                ratio="1 / 1.1"
              />
              <span className={styles.overlay} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </m.button>
          ))}
        </m.div>
      </div>

      {/* Lightbox / modal */}
      <AnimatePresence>
        {lightbox.isOpen && current && (
          <m.div
            className={styles.lightbox}
            onClick={lightbox.close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto: ${current.caption}`}
            ref={modalRef}
            tabIndex={-1}
          >
            <button
              type="button"
              className={styles.close}
              onClick={lightbox.close}
              aria-label="Fechar"
            >
              Fechar
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* stopPropagation: clicar no conteúdo não fecha (só no fundo) */}
            <div
              className={styles.lightboxInner}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={`${styles.nav} ${styles.navPrev}`}
                onClick={lightbox.prev}
                aria-label="Foto anterior"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>

              {/* As fotos da casa vão de 2/3 a quase quadrado: qualquer proporção
                  fixa aqui ou recorta a imagem ou deixa metade da moldura vazia.
                  Com `auto` o quadro acompanha a foto. Sem foto, volta a um
                  retângulo fixo para o placeholder não colapsar. */}
              <PhotoPlaceholder
                caption={current.caption}
                imageSrc={current.imageSrc}
                ratio={current.imageSrc ? "auto" : "4 / 3"}
                className={styles.lightboxPhoto}
              />

              <button
                type="button"
                className={`${styles.nav} ${styles.navNext}`}
                onClick={lightbox.next}
                aria-label="Próxima foto"
              >
                <svg
                  width="22"
                  height="22"
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
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
