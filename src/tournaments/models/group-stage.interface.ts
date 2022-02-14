import { ITeam } from './team.interface';
import { ITournament } from './tournament.interface';

export interface IGroupStage {
  tournament?: ITournament;
  name: string;
  teams: ITeam[];
}
