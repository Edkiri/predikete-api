import { ITeam } from './team.interface';

export interface ITournament {
  name: string;
  image?: string;
  teams: ITeam[];
}
