import { Injectable } from '@nestjs/common';
import { TeamsSeederService } from './teams/teams.service';
import { TournamentsSeederService } from './tournaments/tournaments.service';
import { UserSeederService } from './users/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly teamsSeederService: TeamsSeederService,
    private readonly tournamentsSeederSerice: TournamentsSeederService,
    private readonly usersSeederService: UserSeederService,
  ) {}

  async seed() {
    await this.usersSeederService
      .createAdmin()
      .then((completed) => {
        console.log('Successfuly seeding admin...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.log('Failed seeding admin...');
        Promise.reject(error);
      });
    await this.teams()
      .then((completed) => {
        console.log();
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.log('Failed seeding teams...');
        Promise.reject(error);
      });

    await this.tournaments()
      .then((completed) => {
        console.log('Successfuly completed seeding tournaments...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.log('Failed seeding tournaments...');
        Promise.reject(error);
      });
  }

  async teams() {
    return await Promise.all(this.teamsSeederService.create())
      .then((createdTeams) => {
        console.log(`${createdTeams.length} teams has been created`);
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async tournaments() {
    return await Promise.all(this.tournamentsSeederSerice.create())
      .then((createdTournaments) => {
        console.log(
          `${createdTournaments.length} tournaments has been created`,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
