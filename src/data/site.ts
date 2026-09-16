/**
 * Dados do negócio em um lugar só.
 *
 * Consumido pelo Footer, pelo botão de WhatsApp, pela seção de Localização e
 * pelo JSON-LD de SEO — trocar aqui reflete em todos eles de uma vez.
 *
 * ATENÇÃO: este é um site de PORTFÓLIO. Telefone, e-mail e perfis sociais são
 * fictícios de propósito (o handle `.demo` evita apontar para a conta real de
 * outra pessoa). Ao usar para um cliente, troque este arquivo inteiro.
 */

export const site = {
  name: "Old School Barber",
  legalName: "Old School Barber Ltda.",
  tagline: "Mais do que um corte. Um estilo.",
  description:
    "Barbearia premium em São Paulo desde 2012. Cortes clássicos, barba na navalha e ambiente industrial vintage.",
  foundingYear: 2012,

  /** URL canônica de produção. Trocar ao publicar. */
  url: "https://oldschoolbarber.com.br",

  /** Telefone fictício. Formato E.164 para links tel:/wa.me. */
  phone: {
    e164: "+5511955550123",
    /** Só dígitos, como a API do WhatsApp espera. */
    whatsapp: "11 99999-9999",
    display: "(11) 95555-0123",
  },

  email: "contato@oldschoolbarber.com.br",

  address: {
    street: "Rua Augusta, 1023",
    district: "Consolação",
    city: "São Paulo",
    state: "SP",
    postalCode: "01304-001",
    country: "BR",
  },

  /** Coordenadas aproximadas da Rua Augusta, usadas no JSON-LD. */
  geo: { latitude: -23.5544, longitude: -46.6591 },

  /** Perfis fictícios — ver aviso no topo do arquivo. */
  socials: {
    instagram: "https://www.instagram.com/oldschool.barber.demo",
    facebook: "https://www.facebook.com/oldschool.barber.demo",
  },

  /**
   * Horários. `schema` usa a notação do schema.org (Mo, Tu...), consumida
   * pelo JSON-LD; `display` é o que aparece na seção de Localização.
   */
  hours: [
    { display: "Segunda a Sexta", time: "09:00 — 20:00" },
    { display: "Sábado", time: "08:00 — 18:00" },
    { display: "Domingo", time: "Fechado" },
  ],
  hoursSchema: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    { days: ["Saturday"], opens: "08:00", closes: "18:00" },
  ],

  priceRange: "R$ 30 – R$ 219",
} as const;

/** Endereço em uma linha, para o rodapé e o alt do mapa. */
export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}`;

/** Link do WhatsApp com mensagem pré-preenchida. */
export const whatsappHref = `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(
  "Olá! Gostaria de agendar um horário na Old School Barber.",
)}`;
