import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PoolService } from './pool.service';

@Controller('pool')
@ApiTags('pool')
export class PoolController {
  constructor(
    private readonly poolService: PoolService, // private readonly poolMatchService: PoolMatchService,
  ) {}
}
