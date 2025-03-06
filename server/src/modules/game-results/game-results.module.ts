import { Module } from '@nestjs/common';
import { GameResultsService } from './game-results.service';
import { GameResultsController } from './game-results.controller';
import { PrismaModule } from '../../modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GameResultsController],
  providers: [GameResultsService],
  exports: [GameResultsService],
})
export class GameResultsModule {}
