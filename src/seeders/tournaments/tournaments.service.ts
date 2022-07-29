import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from 'src/tournaments/entities/tournaments.entity';
import { ITournament } from 'src/tournaments/models/tournament.interface';
import { Repository } from 'typeorm';
import { MatchesSeederService } from '../matches/matches.service';
import { tournaments } from './data';
import { GroupStagesSeederService } from '../phases/group-stages.service';
import { PhasesSeederService } from '../phases/phases.service';
import { TeamsSeederService } from '../teams/teams.service';

@Injectable()
export class TournamentsSeederService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepo: Repository<Tournament>,
    private readonly phasesService: PhasesSeederService,
    private readonly groupStagesService: GroupStagesSeederService,
    private readonly matchesService: MatchesSeederService,
    private readonly teamsService: TeamsSeederService,
  ) {}

  create(): Array<Promise<Tournament>> {
    return tournaments.map(async (tournament: ITournament) => {
      return await this.tournamentsRepo
        .findOne({ where: { name: tournament.name } })
        .then(async (dbTournament) => {
          if (dbTournament) {
            return Promise.resolve(null);
          }
          const teams = await this.teamsService.getTeamsByName(
            tournament.teams.map((team) => team.name),
          );
          tournament.teams = teams;
          const newTournament = await this.tournamentsRepo.save(tournament);
          await Promise.all(this.groupStagesService.create(newTournament))
            .then(async (groupStages) => {
              console.log(`${groupStages.length} Groups has been created`);
              await Promise.all(this.phasesService.create(newTournament))
                .then(async (phases) => {
                  console.log(`${phases.length} Final Phases has been created`);
                })
                .catch((error) => Promise.reject(error));
              await Promise.all(this.matchesService.create(newTournament))
                .then((matches) => {
                  console.log(
                    `${matches.length} Group Matches has been created`,
                  );
                  return newTournament;
                })
                .catch((error) => Promise.reject(error));
              await Promise.all(this.matchesService.createFinals(newTournament))
                .then((matches) => {
                  console.log(
                    `${matches.length} Final Matches has been created`,
                  );
                  return newTournament;
                })
                .catch((error) => Promise.reject(error));
            })
            .catch((error) => Promise.reject(error));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
