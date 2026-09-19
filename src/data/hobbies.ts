export interface Hobby {
  id: string;
  name: string;
  icon: string;
  minAge: number;
  effects: { health?: number; happiness?: number; smarts?: number; reputation?: number };
}

export const HOBBIES: Hobby[] = [
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
];
