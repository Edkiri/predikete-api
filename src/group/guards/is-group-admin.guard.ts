import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { UserService } from 'src/user/user.service';
import { MembershipService } from 'src/membership/membership.service';

@Injectable()
export class IsGroupAdminGuard implements CanActivate {
  constructor(
    private readonly membershipService: MembershipService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user as PayloadToken;
    try {
      const user = await this.userService.findOne(payload.sub);
      const membership = await this.membershipService.findMember(
        request.params.groupId,
        user,
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
