import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { UserService } from 'src/user/user.service';
import { GroupInvitationService } from '../services/group-invitation.service';

@Injectable()
export class IsInvitedUserGuard implements CanActivate {
  constructor(
    private readonly invitationService: GroupInvitationService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user as PayloadToken;
    try {
      const user = await this.userService.findUserById(payload.sub);
      const invitation = await this.invitationService.findOne(
        request.params.invitationId,
      );
      if (user.id !== invitation.issuedTo.id) {
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
