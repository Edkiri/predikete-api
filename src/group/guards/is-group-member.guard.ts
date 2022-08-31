import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { MembershipService } from '../services';

@Injectable()
export class IsGroupMemberGuard implements CanActivate {
  constructor(private readonly membershipService: MembershipService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user as PayloadToken;
    try {
      const membership = await this.membershipService.findMember(
        request.params.groupId,
        payload.sub,
      );
      if (!membership) {
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
