export interface Hobby {
  id: string;
  name: string;
  icon: string;
  minAge: number;
  cost?: number;
  effects: { health?: number; happiness?: number; smarts?: number; reputation?: number };
}

export const HOBBIES: Hobby[] = [
  // infância / adolescência (grátis)
  { id: 'desenho', name: 'Desenho', icon: '🎨', minAge: 5, effects: { happiness: 3, smarts: 1 } },
  { id: 'leitura', name: 'Leitura', icon: '📚', minAge: 5, effects: { smarts: 3 } },
  { id: 'futebol', name: 'Futebol', icon: '⚽', minAge: 6, effects: { health: 3, happiness: 1 } },
  { id: 'musica', name: 'Música', icon: '🎹', minAge: 7, effects: { smarts: 2, happiness: 2 } },
  { id: 'natacao', name: 'Natação', icon: '🏊', minAge: 7, effects: { health: 3 } },
  { id: 'xadrez', name: 'Xadrez', icon: '♟️', minAge: 8, effects: { smarts: 3, reputation: 1 } },
  { id: 'videojogos', name: 'Videojogos', icon: '🎮', minAge: 9, effects: { happiness: 3 } },
  { id: 'teatro', name: 'Teatro', icon: '🎭', minAge: 10, effects: { happiness: 2, reputation: 2 } },
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
