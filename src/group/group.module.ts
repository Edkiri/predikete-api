import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { MembershipService } from './membership.service';
import { Group } from './entities/group.entity';
import { Membership } from './entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Membership, User]), UserModule],
  controllers: [GroupController],
  providers: [GroupService, MembershipService],
})
export class GroupModule {}
