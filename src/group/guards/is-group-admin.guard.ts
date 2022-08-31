import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { MembershipService } from 'src/group/services/membership.service';
import { GroupService } from '../services';

@Injectable()
export class IsGroupAdminGuard implements CanActivate {
  constructor(
    private readonly membershipService: MembershipService,
    private readonly groupService: GroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user as PayloadToken;
    await this.groupService.findOne(request.params.groupId);
    try {
      const membership = await this.membershipService.findMember(
        request.params.groupId,
        payload.sub,
      );
      if (!Boolean(membership.isAdmin)) {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException(
        'You do not have permissions to perform this action',
      );
    }
    return true;
  }
}
