import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { ProfilesService } from '../services/profiles.service';

@Injectable()
export class IsProfileOwner implements CanActivate {
  constructor(private readonly profilesService: ProfilesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const profile = await this.profilesService.findOne(request.params.id);
    if (profile.user.id !== user.sub) {
      throw new UnauthorizedException(
        'You do not have permissions to perform this action',
      );
    }
    return true;
  }
}
