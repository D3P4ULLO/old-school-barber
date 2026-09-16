/**
 * Persistência das solicitações de agendamento no próprio navegador.
 *
 * Este é um site de PORTFÓLIO: não existe back-end para receber o formulário.
 * Em vez de fingir um envio (o código anterior só dava console.log e mostrava
 * "Recebemos sua solicitação"), a solicitação fica salva no localStorage —
 * o fluxo fica honesto, demonstrável e some quando o visitante limpa o
 * navegador. Ao plugar uma API de verdade, `salvarAgendamento` é o único
 * ponto que muda.
 */

const STORAGE_KEY = "osb:agendamentos";

export interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  mensagem: string;
  /** ISO 8601 */
  criadoEm: string;
}

/**
 * Toda leitura/escrita é protegida: em aba anônima, com cookies bloqueados ou
 * com a cota estourada, o localStorage lança exceção. Falhar aqui não pode
 * derrubar a página — no pior caso a demo só não persiste.
 */
export function lerAgendamentos(): Agendamento[] {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    if (!bruto) return [];
    const dados: unknown = JSON.parse(bruto);
    return Array.isArray(dados) ? (dados as Agendamento[]) : [];
  } catch {
    return [];
  }
}

/** Salva e devolve a lista atualizada (vazia se o navegador bloquear). */
export function salvarAgendamento(
  dados: Omit<Agendamento, "id" | "criadoEm">,
): Agendamento[] {
  const registro: Agendamento = {
    ...dados,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };

  const lista = [...lerAgendamentos(), registro];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  } catch {
    // Sem persistência disponível — segue com a lista em memória.
  }
  return lista;
}
