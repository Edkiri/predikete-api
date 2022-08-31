import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { AcceptOrRejectDto } from 'src/group/dto/accept-or-reject.dto';
import { CreateGroupAccessRequestDto } from '../dto/create-group-access-request.dto';
import { GroupAccessRequest } from '../entities/group-access-request.entity';
import { Membership } from '../entities/membership.entity';
import { GroupService } from 'src/group/services/group.service';
import { MembershipService } from './membership.service';
import { TransactionFor } from 'nest-transact';
import { ModuleRef } from '@nestjs/core';
import { PoolService } from 'src/pool/services/pool.service';

@Injectable()
export class GroupAccessRequestService extends TransactionFor<GroupAccessRequestService> {
  constructor(
    @InjectRepository(GroupAccessRequest)
    private readonly AccessRequestRepository: Repository<GroupAccessRequest>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly membershipService: MembershipService,
    private readonly poolService: PoolService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

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
    const oldMember = await this.membershipService.findMember(
      groupId,
      issuedById,
    );
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
    const issuedBy = await this.userService.findOne(issuedById);
    const group = await this.groupService.findOne(groupId);
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
  ): Promise<Membership | undefined> {
    const accessRequest = await this.AccessRequestRepository.findOneOrFail({
      where: { id: accessRequestId },
    });
    if (data.accept) {
      const membership = await this.membershipService.create(
        accessRequest.issuedBy.id,
        accessRequest.group.id,
      );
      await this.poolService.create({
        owner: accessRequest.issuedBy,
        group: accessRequest.group,
      });
      const accessRequestsToDelete = await this.AccessRequestRepository.find({
        where: {
          group: { id: accessRequest.group.id },
          issuedBy: { id: accessRequest.issuedBy.id },
        },
      });
      accessRequestsToDelete.map(async (accessRequest) => {
        await this.AccessRequestRepository.delete(accessRequest.id);
      });
      return membership;
    }
    return;
  }
}
