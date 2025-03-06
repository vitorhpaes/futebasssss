import { Module } from '@nestjs/common';
import { PlayerSessionsService } from './player-sessions.service';
import { PlayerSessionsController } from './player-sessions.controller';
import { PrismaModule } from '../../modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlayerSessionsController],
  providers: [PlayerSessionsService],
  exports: [PlayerSessionsService],
})
export class PlayerSessionsModule {}
