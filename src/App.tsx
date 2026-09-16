import { LazyMotion, domAnimation } from "framer-motion";

import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { WhatsAppButton } from "@/layout/WhatsAppButton";
import { StickyMobileCTA } from "@/layout/StickyMobileCTA";

import { Hero } from "@/sections/Hero";
import { Diferenciais } from "@/sections/Diferenciais";
import { Servicos } from "@/sections/Servicos";
import { Galeria } from "@/sections/Galeria";
import { Sobre } from "@/sections/Sobre";
import { Equipe } from "@/sections/Equipe";
import { Planos } from "@/sections/Planos";
import { Avaliacoes } from "@/sections/Avaliacoes";
import { Localizacao } from "@/sections/Localizacao";
import { Contato } from "@/sections/Contato";

import { PoleDivider } from "@/ui/PoleDivider";
import { site } from "@/data/site";
import { structuredData } from "@/data/structuredData";

const OG_IMAGE = `${site.url}/og-image.jpg`;

function App() {
  return (
    /* LazyMotion + `m` no lugar de `motion`: carrega só as features que o site
       usa (animação, exit, inView, hover, tap, focus) e deixa de fora drag e
       layout animations. `strict` faz o build quebrar se alguém voltar a usar
       o `motion` completo, que anularia a economia. */
    <LazyMotion features={domAnimation} strict>
      {/* React 19 hoista estas tags para o <head> automaticamente. */}
      <title>Old School Barber — Mais do que um corte. Um estilo.</title>
      <meta name="description" content={site.description} />
      <link rel="canonical" href={site.url} />

      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={`${site.name} — ${site.tagline}`} />
      <meta property="og:description" content={site.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site.url} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={`${site.name} — barbearia clássica em ${site.address.city}`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${site.name} — ${site.tagline}`} />
      <meta name="twitter:description" content={site.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <meta name="theme-color" content="#14100d" />

      {/* Dados estruturados: é o que faz a barbearia aparecer com endereço,
          horário e avaliação nos resultados do Google e no Maps. */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="grain-overlay" aria-hidden="true" />

      <Header />

      <main id="conteudo">
        <Hero />
        <Diferenciais />
        <Servicos />
        <Galeria />
        <Sobre />
        <Equipe />
        <Planos />
        <Avaliacoes />
        <Localizacao />
        <Contato />
      </main>

      <PoleDivider />
      <Footer />

      <WhatsAppButton />
      <StickyMobileCTA />
    </LazyMotion>
  );
}

export default App;
