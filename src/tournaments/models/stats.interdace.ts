export interface IStats {
  teamName: string;
  played: number;
  wins: number;
  losses: number;
  ties: number;
  goalsScored: number;
  goalsReceived: number;
  points: number;
}

export interface IGroupStageStats {
  name: string;
  stats: IStats[];
}
