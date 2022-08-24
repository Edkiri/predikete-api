import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { GroupController } from './group.controller';
import { GroupService } from './services/group.service';
import { Group } from './entities/group.entity';
import { MembershipModule } from 'src/membership/membership.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule, MembershipModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
