import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
import { TournamentService } from 'src/tournament/tournament.service';
import { Role } from 'src/user/entities/role.enum';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
import {
  matchesData,
  teamsData,
  tournamentData,
} from './tournaments-data/qatar-data';
import { groupStagesData } from './tournaments-data/qatar-data';

@Injectable()
export class SeederService {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly tournamentService: TournamentService,
  ) {}

  async seed() {
    console.log('I am the seed method');
    await this.seedAdminUser();
    await this.seedTournament();
  }

  async seedAdminUser(): Promise<void | null> {
    const oldAdmin = await this.userService.findOneByEmail(
      this.configService.adminUser.email,
    );
    if (oldAdmin) return;
    await this.userService.create(
      {
        email: this.configService.adminUser.email,
        password: this.configService.adminUser.password,
        displayName: this.configService.adminUser.displayName,
      },
      Role.ADMIN,
    );
    console.log('admin user created.');
  }

  async seedTournament(): Promise<void | null> {
    try {
      await this.dataSource.transaction((manager) => {
        return this.tournamentService.withTransaction(manager).create({
          tournament: tournamentData,
          teams: teamsData,
          groupStages: groupStagesData,
          matches: matchesData,
        });
      });
    } catch (error) {
      console.log('An error happend while creating the tournamnet..', error);
      return;
    }
  }
}
