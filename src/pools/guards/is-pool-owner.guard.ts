import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { PoolsService } from '../services/pools.service';

@Injectable()
export class IsPoolOwnerGuard implements CanActivate {
  constructor(private readonly poolsService: PoolsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const pool = await this.poolsService.findOne(request.params.poolId);
    if (pool.membership.user.id !== user.sub) {
      throw new UnauthorizedException(
        'You do not have permissions to perform this action',
      );
    }
    return true;
  }
}
