import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { AcceptOrRejectDto } from '../dto/accept-or-reject.dto';
import { CreateGroupAccessRequestDto } from '../dto/create-group-access-request.dto';
import { GroupAccessRequest } from '../entities/group-access-request.entity';
import { Membership } from '../entities/membership.entity';
import { GroupService } from './group.service';
import { MembershipService } from './membership.service';

@Injectable()
export class GroupAccessRequestService {
  constructor(
    @InjectRepository(GroupAccessRequest)
    private readonly AccessRequestRepository: Repository<GroupAccessRequest>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly membershipService: MembershipService,
  ) {}

  async findUserAccessRequest(
    userId: number,
  ): Promise<GroupAccessRequest[] | []> {
    const adminMemberships =
      await this.membershipService.findUserAdminMemberships(userId);
    if (!adminMemberships.length) {
      return [];
    }
    return this.AccessRequestRepository.find({
      where: {
        group: {
          id: In(
            adminMemberships.map(
              (membership: Membership) => membership.group.id,
            ),
          ),
        },
      },
    });
  }

  async create(
    issuedById: number,
    groupId: number,
    data: CreateGroupAccessRequestDto,
  ): Promise<GroupAccessRequest> {
    const issuedBy = await this.userService.findUserById(issuedById);
    const group = await this.groupService.findOne(groupId);
    const oldMember = await this.membershipService.findMember(group, issuedBy);
    if (oldMember)
      throw new HttpException(
        `User with id '${issuedById}' is already member`,
        400,
      );
    const oldRequest = await this.AccessRequestRepository.findOne({
      where: { issuedBy: { id: issuedById }, group: { id: groupId } },
    });
    if (oldRequest)
      throw new HttpException(
        `User with id '${issuedById} already requested to join the group.'`,
        400,
      );
    const groupAcessRequest = await this.AccessRequestRepository.save({
      issuedBy,
      group,
      message: data.message,
    });
    return this.AccessRequestRepository.findOneByOrFail({
      id: groupAcessRequest.id,
    });
  }

  async useAccessRequest(
    accessRequestId: number,
    data: AcceptOrRejectDto,
  ): Promise<void> {
    const accessRequest = await this.AccessRequestRepository.findOneOrFail({
      where: { id: accessRequestId },
    });
    if (data.accept) {
      await this.membershipService.create(
        accessRequest.issuedBy,
        accessRequest.group,
      );
    }
    await this.AccessRequestRepository.delete(accessRequest.id);
    return;
  }
}
