export interface ShortTermJob {
  id: string;
  name: string;
  icon: string;
  minAge: number;
  pay: number;
  cost: number;
}

export const SHORT_TERM_JOBS: ShortTermJob[] = [
  { id: 'limonada', name: 'Vender Limonada', icon: '🍋', minAge: 6, pay: 3, cost: 1 },
  { id: 'lavar-carros', name: 'Lavar Carros', icon: '🧽', minAge: 8, pay: 6, cost: 2 },
  { id: 'cortar-relva', name: 'Cortar Relva', icon: '🌿', minAge: 9, pay: 10, cost: 2 },
  { id: 'passear-caes', name: 'Passear Cães', icon: '🐕', minAge: 10, pay: 14, cost: 0 },
  { id: 'entregar-jornais', name: 'Entregar Jornais', icon: '📰', minAge: 12, pay: 20, cost: 3 },
  { id: 'explicacoes', name: 'Dar Explicações', icon: '📐', minAge: 14, pay: 35, cost: 0 },
  { id: 'cafe', name: 'Empregado de Café', icon: '☕', minAge: 15, pay: 55, cost: 0 },
  { id: 'caixa', name: 'Caixa de Supermercado', icon: '🛒', minAge: 16, pay: 80, cost: 0 },
  { id: 'estagio', name: 'Estágio de Verão', icon: '💼', minAge: 17, pay: 130, cost: 0 },
  { id: 'freelancer', name: 'Freelancer Online', icon: '💻', minAge: 17, pay: 150, cost: 0 },
];
