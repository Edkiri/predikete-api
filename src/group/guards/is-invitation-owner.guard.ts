import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { UserService } from 'src/user/user.service';
import { GroupInvitationService } from '../services';

@Injectable()
export class IsInvitedUserGuard implements CanActivate {
  constructor(
    private readonly invitationService: GroupInvitationService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user as PayloadToken;
    const invitation = await this.invitationService.findOne(
      request.params.invitationId,
    );
    try {
      if (payload.sub !== invitation.issuedTo.id) {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException(
        'You do not have permissions to perform this action.',
      );
    }
    return true;
  }
}
