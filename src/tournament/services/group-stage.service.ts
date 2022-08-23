import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupStage } from '../entities/group-stage.entity';
import { Tournament } from '../entities/tournaments.entity';
import { IGroupStage } from '../interfaces/tournament.interface';

@Injectable()
export class GroupStageService {
  constructor(
    @InjectRepository(GroupStage)
    private readonly groupStageRepository: Repository<GroupStage>,
  ) {}

  async createMany(
    data: IGroupStage[],
    tournament: Tournament,
  ): Promise<GroupStage[]> {
    const groupStagePromises = data.map(async (gs: IGroupStage) => {
      const oldGroupStage = await this.groupStageRepository.findOne({
        where: { name: gs.name },
      });
      if (oldGroupStage) return;
      const newGroupStage = this.groupStageRepository.create({ ...gs });
      newGroupStage.tournament = tournament;
      return this.groupStageRepository.save(newGroupStage);
    });
    return Promise.all(groupStagePromises);
  }

  async findOneByName(name: string): Promise<GroupStage | null> {
    if (name) {
      return this.groupStageRepository.findOne({
        where: { name },
      });
    }
    return null;
  }
}
