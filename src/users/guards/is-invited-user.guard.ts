import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { InvitationsService } from '../services/invitations.service';

@Injectable()
export class IsInvitedUserGuard implements CanActivate {
  constructor(private readonly invitationsService: InvitationsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const invitation = await this.invitationsService.findOne(
      request.params.invitationId,
    );
    if (invitation.issuedTo.id !== user.sub) {
      throw new UnauthorizedException(
        'You do not have permissions to perform this action',
      );
    }
    return true;
  }
}
