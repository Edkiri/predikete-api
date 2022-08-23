import {
  IGroupStage,
  IMatch,
  ITeam,
  ITournament,
} from '../interfaces/tournament.interface';

export class CreateTournamentDto {
  tournament: ITournament;
  teams: ITeam[];
  groupStages: IGroupStage[];
  matches: IMatch[];
}
