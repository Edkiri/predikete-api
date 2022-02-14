import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from 'src/tournaments/entities/phase.entity';
import { PhasesSeederService } from './phases.service';
import { GroupStagesSeederService } from './group-stages.service';
import { GroupStage } from 'src/tournaments/entities/group-stage.entity';
import { TeamsSeederModule } from '../teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Phase, GroupStage]), TeamsSeederModule],
  providers: [PhasesSeederService, GroupStagesSeederService],
  exports: [PhasesSeederService, GroupStagesSeederService],
})
export class PhasesSeederModule {}
