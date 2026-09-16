import { useState } from "react";
import { m } from "framer-motion";
import { useForm } from "react-hook-form";
import { services } from "@/data/services";
import { useReveal } from "@/hooks/useReveal";
import { salvarAgendamento } from "@/lib/bookings";
import styles from "./Contato.module.css";

// Formato dos dados do formulario - tipar dá autocomplete e segurança;
interface BookingForm {
  nome: string;
  telefone: string;
  servico: string;
  mensagem: string;
}

export function Contato() {
  const reveal = useReveal();
  const [enviado, setEnviado] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingForm>();

  // Site de portfólio, sem back-end: a solicitação é gravada no localStorage
  // do visitante em vez de sumir num console.log. Para plugar uma API de
  // verdade, troque `salvarAgendamento` por um fetch aqui.
  const onSubmit = async (data: BookingForm) => {
    salvarAgendamento({
      nome: data.nome,
      telefone: data.telefone,
      servico: data.servico,
      mensagem: data.mensagem ?? "",
    });
    setEnviado(true);
    reset();
  };

  return (
    <section id="contato" aria-label="Contato" className="section-pad">
      <div className="container">
        <m.div className={styles.wrap} {...reveal.container}>
          <m.div className={styles.intro} {...reveal.item}>
            <span className="eyebrow">Vamos marcar?</span>
            <h2 className={styles.title}>Solicite seu horário</h2>
            <p className={styles.sub}>
              Responderemos em até 1 hora útil para confirmar o melhor horário
              para você.
            </p>
          </m.div>

          {/* noValidate: desliga a validação nativa do navegador para usarmos a
              do React Hook Form (mensagens consistentes e estilizadas). */}
          <m.form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            {...reveal.container}
          >
            <div className={styles.field}>
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                autoComplete="name"
                placeholder="Seu nome completo"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "erro-nome" : undefined}
                {...register("nome", {
                  required: "Informe seu nome",
                  minLength: { value: 2, message: "Nome muito curto" },
                })}
              />
              {errors.nome && (
                <span id="erro-nome" className={styles.error}>
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 90000-0000"
                aria-invalid={!!errors.telefone}
                aria-describedby={errors.telefone ? "erro-telefone" : undefined}
                {...register("telefone", {
                  required: "Informe seu telefone",
                  pattern: {
                    // aceita formatos comuns: com/sem parênteses, hífen e espaços
                    value: /^[\d\s()+-]{8,}$/,
                    message: "Telefone inválido",
                  },
                })}
              />
              {errors.telefone && (
                <span id="erro-telefone" className={styles.error}>
                  {errors.telefone.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="servico">Serviço</label>
              <select
                id="servico"
                aria-invalid={!!errors.servico}
                aria-describedby={errors.servico ? "erro-servico" : undefined}
                defaultValue=""
                {...register("servico", { required: "Selecione um serviço" })}
              >
                <option value="" disabled>
                  Selecione um serviço
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.servico && (
                <span id="erro-servico" className={styles.error}>
                  {errors.servico.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                rows={3}
                placeholder="Alguma preferência de horário ou barbeiro?"
                {...register("mensagem")}
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--glow btn--block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Agendar horário"}
            </button>

            {/* Região viva permanente: o leitor de tela anuncia a confirmação
                quando ela aparece. Se o elemento só existisse depois do envio,
                parte dos leitores não anunciaria a mudança. */}
            <div aria-live="polite">
              {enviado && (
                <p className={styles.success}>
                  Solicitação registrada. Entraremos em contato em breve!
                </p>
              )}
            </div>
          </m.form>
        </m.div>
      </div>
    </section>
  );
}
