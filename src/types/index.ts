// Tipos de dados compartilhados entre componentes
// Centralizar para evitar duplicata
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  // Nome do icone
  icon: string;
  // Marcar combo premium
  highlighted?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  /** Caminho da foto real (ex: "/equipe/diego.jpg"); sem ela, usa o placeholder. */
  photo?: string;
  socials: {
    whatsapp?: string;
    instagram?: string;
  };
}

export interface PlanFeature {
  id: string;
  label: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: PlanFeature[];
  // marcar plano premium
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number; // 1 a 5 estrelas
  /** Avatar real (ex: "/avaliacoes/rodrigo.jpg"); sem ele, usa o placeholder. */
  photo?: string;
}

export interface GalleryItem {
  id: string;
  caption: string;
  /** Caminho da imagem real (ex: "/galeria/fade.jpg"); sem ela, usa o placeholder. */
  imageSrc?: string;
}
