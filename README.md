# Old School Barber

Landing page de uma barbearia clássica — projeto de **portfólio**. React 19 + TypeScript + Vite, sem back-end.

> Todos os dados de negócio (telefone, e-mail, endereço, perfis sociais, equipe e depoimentos) são **fictícios**. Ficam centralizados em [`src/data/`](src/data/) para serem trocados de uma vez só.

## Rodando

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # tsc -b && vite build
npm run preview  # serve o build de produção
npm run lint     # ESLint
```

## Stack

| Peça | Escolha | Por quê |
|---|---|---|
| Build | Vite 8 | Dev server rápido, build enxuto |
| UI | React 19 | `<title>`/`<meta>` hoistados para o `<head>` sem lib de head |
| Estilos | CSS Modules + custom properties | Sem runtime, escopo por componente, tema num arquivo só |
| Animação | Framer Motion via `LazyMotion` | Carrega só `domAnimation`; `motion` completo é bloqueado por `strict` |
| Formulário | React Hook Form | Validação sem re-render a cada tecla |
| Carrossel | Scroll nativo + `scroll-snap` | Substituiu o Swiper: ~40 KB gzip a menos |

## Estrutura

```
src/
├─ data/          # conteúdo do site (serviços, equipe, planos, depoimentos)
│  ├─ site.ts            # dados do negócio — ponto único de troca
│  └─ structuredData.ts  # JSON-LD (schema.org BarberShop) para SEO local
├─ hooks/         # useCarousel, useLightbox, useFocusTrap, useReveal, useCountUp, useScrollHeader
├─ layout/        # Header, MobileMenu, Footer, WhatsAppButton, StickyMobileCTA
├─ lib/           # bookings.ts — persistência do formulário no localStorage
├─ sections/      # uma pasta por seção da página
├─ styles/        # reset.css, tokens.css (design tokens), global.css
├─ types/         # interfaces compartilhadas
└─ ui/            # Icon, PhotoPlaceholder, PoleDivider
```

Cada componente segue o padrão `Componente.tsx` + `Componente.module.css` + `index.ts`.

## Design tokens

Cores, tipografia, espaçamento e motion vivem em [`src/styles/tokens.css`](src/styles/tokens.css). Dois tokens merecem atenção:

- **`--oxblood-text`** — versão clara do vermelho para **texto**. O `--oxblood-light` tem 2,7:1 de contraste sobre os fundos escuros e reprova na WCAG AA; use-o só em fundos.
- **`--header-h`** — altura do header fixo, consumida pelo `scroll-padding-top` do `html`. Sem isso, todo link de âncora para com o topo da seção escondido atrás do header.

## Decisões que não são óbvias no código

**Hover em cards usa `whileHover` do Framer Motion, não `:hover` no CSS.**
Componentes `m.*` recebem `transform` inline (`transform: none` depois da animação de entrada), que vence qualquer `:hover { transform }` vindo de uma classe. O mesmo vale para o card em destaque dos Planos: o destaque vem de `padding` + `box-shadow`, não de `scale()`.

**O formulário salva no `localStorage`.**
Não há back-end. Em vez de sumir num `console.log`, [`src/lib/bookings.ts`](src/lib/bookings.ts) grava a solicitação no navegador do visitante (chave `osb:agendamentos`), com leitura e escrita em `try/catch` porque aba anônima e cookies bloqueados fazem o `localStorage` lançar. Para plugar uma API, o `salvarAgendamento` em [`Contato.tsx`](src/sections/Contato/Contato.tsx) é o único ponto que muda.

**O `<select>` de serviços é estilizado em duas camadas.**
O popup de um `<select>` é desenhado pelo sistema operacional e ignora CSS de layout. A base é `color-scheme: dark`, que faz o sistema renderizar a lista em tema escuro em qualquer navegador. Por cima, um bloco `@supports (appearance: base-select)` usa `::picker(select)` (Chrome 135+) para estilizar a lista de verdade — fundo, borda, sombra, hover e o chevron via `::picker-icon`.

**A media query de `prefers-reduced-motion` fica fora do `:root`.**
Aninhada dentro dele, o CSS nesting transforma `*` em `:root *` — que exclui o próprio `<html>`, justamente onde mora o `scroll-behavior: smooth`.

## Fotos

Todas as imagens são molduras estilizadas ([`PhotoPlaceholder`](src/ui/PhotoPlaceholder/PhotoPlaceholder.tsx)). Para usar fotos reais:

1. Coloque os arquivos em `public/galeria/` e `public/equipe/`.
2. Preencha `imageSrc` em [`gallery.ts`](src/data/gallery.ts) e `photo` em [`team.ts`](src/data/team.ts).

O componente troca a moldura por uma `<img loading="lazy">` sozinho, com a dimensão já reservada pelo `aspect-ratio` — sem layout shift.

## Antes de publicar para um cliente

- [ ] Trocar [`src/data/site.ts`](src/data/site.ts) inteiro (telefone, e-mail, endereço, redes, horários)
- [ ] Atualizar `site.url` — ele alimenta canonical, Open Graph e JSON-LD
- [ ] Atualizar a URL em `public/robots.txt` e `public/sitemap.xml`
- [ ] Regerar `public/og-image.jpg` (1200×630) com a marca do cliente
- [ ] Trocar `public/favicon.svg` (poste de barbearia) e `public/apple-touch-icon.png` (180×180)
- [ ] Trocar o `MAPS_EMBED_URL` em [`Localizacao.tsx`](src/sections/Localizacao/Localizacao.tsx)
- [ ] Substituir os placeholders por fotos reais
- [ ] Ligar o formulário a um back-end ou serviço de e-mail
