import { Player, Team } from '../types';

/**
 * Fisher-Yates shuffle algorithm
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Basic Mode: Randomly split players into two teams, 
 * but ensures the first two goalkeepers found in the original list are on opposite teams.
 */
export const splitRandomly = (players: Player[]): [Team, Team] => {
  const goalkeepers = players.filter(p => p.isGoalkeeper);
  const others = players.filter(p => !p.isGoalkeeper);
  
  const teamA: Player[] = [];
  const teamB: Player[] = [];

  // Distribute the first two goalkeepers found in the list order to opposite teams
  if (goalkeepers.length >= 1) teamA.push(goalkeepers[0]);
  if (goalkeepers.length >= 2) teamB.push(goalkeepers[1]);

  // Combine remaining goalkeepers (if any) with other players and shuffle the pool
  const pool = shuffleArray([...goalkeepers.slice(2), ...others]);

  // Distribute the rest of the players to maintain size balance
  pool.forEach((player) => {
    if (teamA.length <= teamB.length) {
      teamA.push(player);
    } else {
      teamB.push(player);
    }
  });

  return [
    {
      id: 'A',
      name: 'Time A',
      players: teamA,
      totalSkill: teamA.reduce((sum, p) => sum + p.skill, 0),
    },
    {
      id: 'B',
      name: 'Time B',
      players: teamB,
      totalSkill: teamB.reduce((sum, p) => sum + p.skill, 0),
    },
  ];
};

/**
 * Advanced Mode: Balance teams based on skill and positions
 */
export const splitBalanced = (players: Player[]): [Team, Team] => {
  const teamA: Player[] = [];
  const teamB: Player[] = [];

  // 1. Separate Goalkeepers
  const goalkeepers = players.filter((p) => p.isGoalkeeper || p.position === 'GOL');
  const fieldPlayers = players.filter((p) => !p.isGoalkeeper && p.position !== 'GOL');

  // 2. Assign Goalkeepers (First 2 randomized GKs)
  const shuffledGks = shuffleArray(goalkeepers);
  if (shuffledGks.length >= 1) teamA.push(shuffledGks[0]);
  if (shuffledGks.length >= 2) teamB.push(shuffledGks[1]);

  // Handle extra GKs as field players
  const extraGks = shuffledGks.slice(2);
  const allFieldPlayers = [...fieldPlayers, ...extraGks];

  // 3. Group field players by position
  const byPosition: Record<string, Player[]> = {
    'DEF': [],
    'LAT': [],
    'MC': [],
    'ATA': [],
    'OTHER': []
  };

  allFieldPlayers.forEach(p => {
    const pos = p.position || 'MC';
    if (byPosition[pos]) {
      byPosition[pos].push(p);
    } else {
      byPosition['OTHER'].push(p);
    }
  });

  // 4. Distribute each position group
  let skillA = teamA.reduce((sum, p) => sum + p.skill, 0);
  let skillB = teamB.reduce((sum, p) => sum + p.skill, 0);

  // Order of distribution to ensure key positions are balanced first
  const posOrder = ['DEF', 'ATA', 'MC', 'LAT', 'OTHER'];

  posOrder.forEach(pos => {
    const group = byPosition[pos].sort((a, b) => b.skill - a.skill);
    
    group.forEach(player => {
      // Try to keep team sizes equal first
      if (teamA.length < teamB.length) {
        teamA.push(player);
        skillA += player.skill;
      } else if (teamB.length < teamA.length) {
        teamB.push(player);
        skillB += player.skill;
      } else {
        // If sizes are equal, balance by skill
        if (skillA <= skillB) {
          teamA.push(player);
          skillA += player.skill;
        } else {
          teamB.push(player);
          skillB += player.skill;
        }
      }
    });
  });

  return [
    {
      id: 'A',
      name: 'Time A',
      players: teamA,
      totalSkill: skillA,
    },
    {
      id: 'B',
      name: 'Time B',
      players: teamB,
      totalSkill: skillB,
    },
  ];
};
