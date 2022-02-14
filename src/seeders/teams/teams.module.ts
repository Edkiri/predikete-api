import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/tournaments/entities/team.entity';
import { TeamsSeederService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamsSeederService],
  exports: [TeamsSeederService],
})
export class TeamsSeederModule {}
