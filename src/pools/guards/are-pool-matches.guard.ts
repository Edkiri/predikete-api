import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { PoolMatchDto } from '../dtos/pool-match.dto';
import { PoolMatchesService } from '../services/pools-matches.service';

@Injectable()
export class ArePoolMatchesGuard implements CanActivate {
  constructor(private readonly poolMatchesService: PoolMatchesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const poolMatches: PoolMatchDto[] = request.body.poolMatches;
    const poolId = request.params.poolId;
    for await (const poolMatch of poolMatches) {
      try {
        await this.poolMatchesService.belongsToPool(
          poolId,
          poolMatch.poolMatchId,
        );
      } catch (error) {
        throw new BadRequestException(
          `poolMatchId #${poolMatch.poolMatchId} does not belong to pool #${poolId}`,
        );
      }
    }
    return true;
  }
}
