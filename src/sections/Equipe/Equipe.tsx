import { m } from "framer-motion";
import { team } from "@/data/team";
import { useReveal } from "@/hooks/useReveal";
import { PhotoPlaceholder } from "@/ui/PhotoPlaceholder/PhotoPlaceholder";
import styles from "./Equipe.module.css";

export function Equipe() {
  const reveal = useReveal();

  return (
    <section id="equipe" aria-label="Equipe" className="section-pad">
      <div className="container">
        <m.div className={styles.head} {...reveal.container}>
          <m.span className="eyebrow" {...reveal.item}>
            Quem segura a navalha
          </m.span>
          <m.h2 className={styles.title} {...reveal.item}>
            Nossos barbeiros
          </m.h2>
        </m.div>

        <m.div className={styles.grid} {...reveal.container}>
          {team.map((member) => (
            <m.article
              key={member.id}
              className={styles.card}
              {...reveal.item}
            >
              <PhotoPlaceholder
                ratio="3 / 3.4"
                className={styles.photo}
                imageSrc={member.photo}
                alt={`${member.name} — ${member.role}`}
              />
              <h3 className={styles.name}>{member.name}</h3>
              <div className={styles.role}>{member.role}</div>
              <p className={styles.desc}>{member.description}</p>

              <div className={styles.socials}>
                {member.socials.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram de ${member.name}`}
                    className={styles.social}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </a>
                )}
                {member.socials.whatsapp && (
                  <a
                    href={member.socials.whatsapp}
                    aria-label={`WhatsApp de ${member.name}`}
                    className={styles.social}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.5 3.5a11 11 0 00-17 13.4L2 22l5.3-1.4A11 11 0 1020.5 3.5zM12 20a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20z" />
                    </svg>
                  </a>
                )}
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
