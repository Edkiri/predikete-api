import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('teams')
export class TeamsController {
  @Public()
  @Get('images/:imageName')
  findProfileImage(@Param('imageName') imageName, @Res() res) {
    return res.sendFile(
      join(process.cwd(), 'uploads/teamsimages/' + imageName),
    );
  }
}
