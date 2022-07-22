import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { MembershipsService } from '../services/memberships.service';

@Injectable()
export class IsGroupAdminGuard implements CanActivate {
  constructor(private readonly membershipsService: MembershipsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    try {
      const membership = await this.membershipsService.findByUserAndGroup(
        user.sub,
        request.params.groupId,
      );
      if (!Boolean(membership.is_admin)) {
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
