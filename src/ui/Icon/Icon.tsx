import type { ReactNode } from "react";

interface IconProps {
  name: IconName;
  className?: string;
}

export type IconName =
  | "coffee"
  | "clipper"
  | "bottle"
  | "armchair"
  | "scissors"
  | "razor"
  | "pole"
  | "tone"
  | "eyebrow"
  | "crown";

// Biblioteca de ícones SVG inline do projeto. Centralizar aqui evita espalhar <svg> gigantes pelo JSX das seções e permite trocar um ícone num lugar só. Os nomes batem com o campo `icon` dos dados (services.ts).
// Todos herdam a cor via `currentColor` e o tamanho via CSS (width/height definidos pela classe que o componente-pai passar).

const paths: Record<IconName, ReactNode> = {
  /* Diferenciais — todos do Tabler Icons (MIT).
     Os quatro anteriores eram improvisados e diziam outra coisa: o do
     atendimento era um pin de mapa, o dos barbeiros virava a letra A, o dos
     produtos parecia um documento e o do ambiente era uma casa genérica. */

  // Atendimento: a xícara sai do próprio texto do card ("do primeiro café").
  coffee: (
    <>
      <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
      <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
      <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
      <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5" />
      <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
    </>
  ),
  /* Barbeiros experientes: a máquina de cortar. Preferida à medalha por ser
     ferramenta de ofício, e não prêmio — o card fala de quem segura a
     máquina, não de troféu. Não conflita com Serviços, que usa tesoura e
     navalha mas nenhuma máquina. */
  clipper: (
    <>
      <path d="M8 3v2" />
      <path d="M12 3v2" />
      <path d="M16 3v2" />
      <path d="M8 5h8l-1 4h-6l-1 -4" />
      <path d="M9 12v6a3 3 0 0 0 6 0v-6h-6" />
      <path d="M12 17v1" />
    </>
  ),
  // Produtos: frasco, que cobre pomada, óleo e loção.
  bottle: (
    <>
      <path d="M10 5h4v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v2" />
      <path d="M14 3.5c0 1.626 .507 3.212 1.45 4.537l.05 .07a8.093 8.093 0 0 1 1.5 4.694v6.199a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-6.2c0 -1.682 .524 -3.322 1.5 -4.693l.05 -.07a7.823 7.823 0 0 0 1.45 -4.537" />
      <path d="M7 14.803a2.4 2.4 0 0 0 1 -.803a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 1 -.805" />
    </>
  ),
  /* Ambiente: a poltrona de couro. Considerei o vinil pela "música", mas o
     card fala em música AO VIVO — um disco diria o contrário. E o couro é o
     que o texto cita primeiro. */
  armchair: (
    <>
      <path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2" />
      <path d="M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5" />
      <path d="M6 19v2" />
      <path d="M18 19v2" />
    </>
  ),

  /* Serviços
     `scissors`, `tone` e `crown` vêm do Tabler Icons (MIT), que desenha em
     traço sobre viewBox 24 — mesmo sistema deste componente, então os paths
     entram sem conversão. `razor`, `pole` e `eyebrow` são desenhados
     aqui: nenhuma biblioteca de uso geral tem navalha de barbeiro nem
     sobrancelha.
     Descartado o Bootstrap Icons, que foi a primeira opção considerada: além
     de não ter nada de barbearia, desenha formas preenchidas em viewBox 16 —
     os paths dele renderizariam como contorno da silhueta aqui. */
  scissors: (
    <>
      <path d="M3 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M3 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M8.6 8.6l10.4 10.4" />
      <path d="M8.6 15.4l10.4 -10.4" />
    </>
  ),
  /* Navalha de barbeiro aberta: lâmina em diagonal, cabo e pivô. Desenhada
     aqui porque o `razor` do Tabler é um aparelho de barbear moderno — certo
     como objeto, errado para uma casa que se vende como old school, e a
     descrição do serviço fala em navalha. */
  razor: (
    <>
      <path d="M10.2 13.1l7.4 -7.4a1.9 1.9 0 0 1 2.7 2.7l-7.4 7.4z" />
      <path d="M9.6 13.7l-5.2 5.2" />
      <path d="M3.2 18.1a1.6 1.6 0 1 0 2.3 2.3" />
    </>
  ),
  /* Combo Corte + Barba: o poste de barbearia — o símbolo do serviço
     completo, e o mesmo motivo já usado no favicon e no PoleDivider.

     Duas tentativas anteriores caíram no mesmo muro, o tamanho. Nenhuma
     composição de duas ferramentas sobrevive a 34px: lado a lado os glifos
     ficam sem folga nenhuma (a 60% eles se encostam, e reduzir mais piora),
     e cruzados em X a navalha perde a lâmina e vira a segunda alça de uma
     tesoura — igual à do card ao lado. Um glifo único resolve. */
  pole: (
    <>
      <path d="M8.5 6h7v12h-7z" />
      <path d="M8.5 12l3.5 -3.5" />
      <path d="M8.5 16l7 -7" />
      <path d="M11 17.5l4.5 -4.5" />
      <path d="M7.5 3.5h9" />
      <path d="M7.5 20.5h9" />
    </>
  ),
  /* Pigmentação: gota meio preenchida. O pincel que estava aqui dizia
     "pintura"; a metade cheia diz meio tom, que é o que o serviço faz —
     uniformizar tom e disfarçar falha. */
  tone: (
    <>
      <path d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546" />
      <path d="M12 3v18" />
    </>
  ),
  // Sobrancelha sobre o olho: o arco de cima é o assunto, o olho dá contexto.
  eyebrow: (
    <>
      <path d="M4 8.5c2.4 -2.6 5.2 -3.9 8.4 -3.9c2.6 0 5.1 .9 7.6 2.6" />
      <path d="M4.5 15c2.1 -2.4 4.6 -3.6 7.5 -3.6s5.4 1.2 7.5 3.6c-2.1 2.4 -4.6 3.6 -7.5 3.6s-5.4 -1.2 -7.5 -3.6" />
      <path d="M10.4 15a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0" />
    </>
  ),
  crown: <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4l4 -6" />,
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
