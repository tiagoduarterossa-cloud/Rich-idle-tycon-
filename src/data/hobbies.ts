export interface Hobby {
  id: string;
  name: string;
  icon: string;
  minAge: number;
  maxAge?: number;
  cost?: number;
  careerId?: string;
  effects: { health?: number; happiness?: number; smarts?: number; reputation?: number };
}

// número de anos seguidos a praticar o hobby principal para desbloquear a carreira ligada a ele
export const CAREER_THRESHOLD = 6;

export const HOBBIES: Hobby[] = [
  // infância (desaparecem quando cresces, dão lugar às versões adultas — exceto se for o hobby principal)
  { id: 'desenho', name: 'Desenho', icon: '🎨', minAge: 5, maxAge: 12, careerId: 'desenho', effects: { happiness: 3, smarts: 1 } },
  { id: 'futebol', name: 'Futebol', icon: '⚽', minAge: 6, maxAge: 13, careerId: 'futebol', effects: { health: 3, happiness: 1 } },
  { id: 'natacao', name: 'Natação', icon: '🏊', minAge: 7, maxAge: 13, effects: { health: 3 } },
  { id: 'teatro', name: 'Teatro Escolar', icon: '🎭', minAge: 10, maxAge: 17, careerId: 'teatro', effects: { happiness: 2, reputation: 2 } },

  // atravessam a vida toda, uma vez desbloqueadas
  { id: 'leitura', name: 'Leitura', icon: '📚', minAge: 5, effects: { smarts: 3 } },
  { id: 'musica', name: 'Música', icon: '🎹', minAge: 7, careerId: 'musica', effects: { smarts: 2, happiness: 2 } },
  { id: 'xadrez', name: 'Xadrez', icon: '♟️', minAge: 8, careerId: 'xadrez', effects: { smarts: 3, reputation: 1 } },
  { id: 'videojogos', name: 'Videojogos', icon: '🎮', minAge: 9, careerId: 'videojogos', effects: { happiness: 3 } },
  { id: 'ginasio', name: 'Ginásio', icon: '🏋️', minAge: 14, effects: { health: 4 } },
  { id: 'voluntariado', name: 'Voluntariado', icon: '🤝', minAge: 15, effects: { reputation: 4, happiness: 1 } },
  { id: 'yoga', name: 'Yoga', icon: '🧘', minAge: 16, effects: { health: 2, happiness: 2 } },

  // vida adulta / estilo de vida (com custo)
  { id: 'corrida', name: 'Corrida e Maratonas', icon: '🏃', minAge: 18, effects: { health: 4 } },
  { id: 'meditacao', name: 'Meditação', icon: '🧘‍♂️', minAge: 18, effects: { happiness: 3, health: 1 } },
  { id: 'fotografia', name: 'Fotografia', icon: '📷', minAge: 18, cost: 40, effects: { smarts: 2, happiness: 2 } },
  { id: 'tenis', name: 'Ténis', icon: '🎾', minAge: 18, cost: 80, effects: { health: 3, reputation: 1 } },
  { id: 'culinaria', name: 'Culinária Gourmet', icon: '🍳', minAge: 20, cost: 100, effects: { happiness: 3, smarts: 1 } },
  { id: 'padel', name: 'Padel', icon: '🏓', minAge: 20, cost: 60, effects: { health: 2, happiness: 2 } },
  { id: 'enologia', name: 'Provas de Vinho', icon: '🍷', minAge: 21, cost: 150, effects: { happiness: 2, reputation: 2, smarts: 1 } },
  { id: 'golfe', name: 'Golfe', icon: '⛳', minAge: 21, cost: 200, effects: { health: 2, happiness: 2, reputation: 3 } },
  { id: 'vela', name: 'Vela', icon: '⛵', minAge: 21, cost: 350, effects: { happiness: 3, reputation: 2 } },
  { id: 'pilotagem', name: 'Pilotagem Recreativa', icon: '🛩️', minAge: 25, cost: 500, effects: { smarts: 2, happiness: 3, reputation: 2 } },
  { id: 'relogios', name: 'Colecionismo de Relógios', icon: '⌚', minAge: 25, cost: 600, effects: { reputation: 3, happiness: 2 } },
  { id: 'viagens', name: 'Viagens de Luxo', icon: '✈️', minAge: 25, cost: 900, effects: { happiness: 5, health: 1 } },
  { id: 'filantropia', name: 'Filantropia', icon: '🕊️', minAge: 30, cost: 1200, effects: { reputation: 6, happiness: 3 } },
];
