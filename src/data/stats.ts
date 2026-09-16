interface Stat {
  id: string;
  /** valor final do contador */
  value: number;
  /** casas decimais (ex: 1 para 4.9) */
  decimals?: number;
  /** prefixo antes do número (ex: "+") */
  prefix?: string;
  /** sufixo depois do número (ex: "%") */
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "anos", value: 12, prefix: "+", label: "Anos de tradição" },
  { id: "clientes", value: 5000, prefix: "+", label: "Clientes atendidos" },
  { id: "estrelas", value: 4.9, decimals: 1, label: "Estrelas de avaliação" },
  { id: "satisfacao", value: 98, suffix: "%", label: "De satisfação" },
];
