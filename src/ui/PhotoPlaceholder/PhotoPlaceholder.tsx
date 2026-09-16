import styles from "./PhotoPlaceholder.module.css";

interface PhotoPlaceholderProps {
  /** Legenda mostrada dentro da moldura (ex: "Corte na régua"). */
  caption?: string;
  /**
   * Proporção da moldura (ex: '1 / 1.1', '4 / 5'). Padrão: quadrado.
   * `"auto"` não fixa proporção nenhuma — a moldura passa a acompanhar o
   * tamanho natural da foto. Útil onde o objetivo é exibir a imagem inteira
   * (lightbox), e não uniformizar quadros de uma grade.
   */
  ratio?: string;
  /** Caminho de uma foto real. Sem ele, renderiza a moldura estilizada. */
  imageSrc?: string;
  /** Texto alternativo da foto. Cai para `caption` quando não informado. */
  alt?: string;
  /** Classe extra para ajustes pontuais. */
  className?: string;
}

/**
 * Moldura que ocupa o lugar de uma foto real, mantendo o visual coeso
 * (textura + ícone + legenda) enquanto não há imagens.
 *
 * Quando as fotos chegarem, basta preencher `imageSrc` nos arquivos de dados
 * (`gallery.ts`, `team.ts`): o componente troca a moldura pela <img> sozinho,
 * já com lazy loading e dimensão reservada pelo aspect-ratio — sem layout shift.
 */
export function PhotoPlaceholder({
  caption,
  ratio = "1 / 1",
  imageSrc,
  alt,
  className,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`${styles.photo} ${imageSrc ? styles.hasImage : ""} ${className ?? ""}`}
      style={ratio === "auto" ? undefined : { aspectRatio: ratio }}
    >
      {imageSrc ? (
        <img
          className={styles.img}
          src={imageSrc}
          alt={alt ?? caption ?? ""}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10.5" r="1.5" />
            <path d="M21 15l-5-5-4 4-3-3-4 4" />
          </svg>
          {caption && <span className={styles.caption}>{caption}</span>}
        </>
      )}
    </div>
  );
}
