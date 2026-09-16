import type { TeamMember } from "@/types";

/**
 * Equipe fictícia (site de portfólio). Os perfis usam o sufixo `.demo` para
 * não apontar para contas reais de terceiros — troque ao usar num cliente.
 *
 * As fotos vivem em `public/equipe/`, em kebab-case sem acento. O
 * PhotoPlaceholder troca a moldura pela <img> quando `photo` está preenchido.
 */
export const team: TeamMember[] = [
  {
    id: "diego-ramos",
    photo: "/equipe/diego.jpg",
    name: 'Diego "Old School" Ramos',
    role: "Fundador & Master Barber",
    description:
      "Especialista em cortes clássicos e navalha, 15 anos de ofício.",
    socials: { instagram: "https://www.instagram.com/diego.oldschool.demo" },
  },
  {
    id: "marcos-silva",
    photo: "/equipe/marcos.jpg",
    name: "Marcos Silva",
    role: "Especialista em Barba",
    description: "Referência em barboterapia e desenho de barba na navalha.",
    socials: { instagram: "https://www.instagram.com/marcos.barba.demo" },
  },
  {
    id: "rafael-torres",
    photo: "/equipe/rafael.jpg",
    name: "Rafael Torres",
    role: "Cortes Modernos & Fade",
    description:
      "Fades degradê e tendências urbanas com acabamento old school.",
    socials: { instagram: "https://www.instagram.com/rafael.fade.demo" },
  },
  {
    id: "bruno-alves",
    photo: "/equipe/bruno.jpg",
    name: "Bruno Alves",
    role: "Pigmentação & Design",
    description: "Precisão em pigmentação e design de sobrancelha.",
    socials: { instagram: "https://www.instagram.com/bruno.design.demo" },
  },
];
