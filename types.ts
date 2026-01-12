export interface Player {
  id: string;
  name: string;
  isGoalkeeper: boolean;
  skill: number; // 0 to 5
}

export interface Team {
  id: 'A' | 'B';
  name: string;
  players: Player[];
  totalSkill: number;
}

export type AppMode = 'BASIC' | 'ADVANCED';
export type AppStep = 'INPUT' | 'SETUP' | 'RESULTS';
