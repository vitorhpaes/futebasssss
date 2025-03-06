import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SessionsModule } from './modules/sessions/sessions.module';
import { TeamsModule } from './modules/teams/teams.module';
import { PlayerSessionsModule } from './modules/player-sessions/player-sessions.module';
import { GameResultsModule } from './modules/game-results/game-results.module';
import { PlayerFavoritesModule } from './modules/player-favorites/player-favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    TeamsModule,
    PlayerSessionsModule,
    GameResultsModule,
    PlayerFavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
