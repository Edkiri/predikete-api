import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { PoolService } from '../services';

@Injectable()
export class IsGroupPoolGuard implements CanActivate {
  constructor(private readonly poolService: PoolService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { groupId, poolId } = request.params;
    const pool = await this.poolService.findOneById(poolId);
    try {
      if (pool.groupId !== +groupId) {
        throw new Error();
      }
    } catch (error) {
      throw new BadRequestException(
        `Not found pool with '${poolId}' in group with id ${groupId}`,
      );
    }
    return true;
  }
}
