import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { PoolService } from '../services';

@Injectable()
export class IsPoolOwnerGuard implements CanActivate {
  constructor(private readonly poolService: PoolService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.user as PayloadToken;
    const { poolId } = request.params;
    const pool = await this.poolService.findOneById(+poolId);
    try {
      if (pool.owner.id !== payload.sub) {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException(
        `You do not have permissions to perform this action.`,
      );
    }
    return true;
  }
}
