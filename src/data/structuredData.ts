import { site } from "./site";
import { services } from "./services";
import { testimonials } from "./testimonials";

/**
 * JSON-LD (schema.org) injetado no <head> pelo App.
 *
 * É o item de SEO com mais retorno para um negócio local: é o que permite ao
 * Google mostrar endereço, horário de funcionamento, faixa de preço, telefone
 * e nota de avaliação direto no resultado de busca e no Maps.
 *
 * `BarberShop` é um tipo oficial do schema.org (herda de LocalBusiness).
 */

const media = Math.round(
  (testimonials.reduce((soma, t) => soma + t.rating, 0) / testimonials.length) * 10,
) / 10;

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  "@id": `${site.url}/#barbearia`,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  slogan: site.tagline,
  url: site.url,
  image: `${site.url}/og-image.jpg`,
  logo: `${site.url}/favicon.svg`,
  telephone: site.phone.e164,
  email: site.email,
  priceRange: site.priceRange,
  foundingDate: String(site.foundingYear),
  currenciesAccepted: "BRL",
  paymentAccepted: "Dinheiro, Cartão de crédito, Cartão de débito, Pix",

  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },

  openingHoursSpecification: site.hoursSchema.map((faixa) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: faixa.days,
    opens: faixa.opens,
    closes: faixa.closes,
  })),

  sameAs: [site.socials.instagram, site.socials.facebook],

  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: media,
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  },

  // Cardápio de serviços com preço — habilita o rich result de serviços.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: services.map((servico) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: servico.name,
        description: servico.description,
      },
      price: servico.price,
      priceCurrency: "BRL",
    })),
  },
};
