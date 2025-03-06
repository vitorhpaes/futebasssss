import { Module } from '@nestjs/common';
import { PlayerFavoritesService } from './player-favorites.service';
import { PlayerFavoritesController } from './player-favorites.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlayerFavoritesController],
  providers: [PlayerFavoritesService],
  exports: [PlayerFavoritesService],
})
export class PlayerFavoritesModule {}
