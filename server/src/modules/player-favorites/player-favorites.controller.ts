import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  PlayerFavoritesService,
  MostFavoritedPlayer,
} from './player-favorites.service';
import { CreatePlayerFavoriteDto } from './dto/create-player-favorite.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PlayerFavorite } from '@prisma/client';

class PlayerFavoriteEntity {
  id: number;
  sessionId: number;
  voterId: number;
  favoriteId: number;
  teamId: number;
  createdAt: Date;
}

class MostFavoritedPlayerDto {
  player: {
    id: number;
    name: string;
    email: string;
    position: string;
  };
  favoriteCount: number;
}

@ApiTags('player-favorites')
@Controller('player-favorites')
export class PlayerFavoritesController {
  constructor(
    private readonly playerFavoritesService: PlayerFavoritesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Favoritar um jogador' })
  @ApiResponse({
    status: 201,
    description: 'Jogador favoritado com sucesso',
    type: PlayerFavoriteEntity,
  })
  async create(
    @Body() createPlayerFavoriteDto: CreatePlayerFavoriteDto,
  ): Promise<PlayerFavorite> {
    return this.playerFavoritesService.create(createPlayerFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os favoritos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de favoritos',
    type: [PlayerFavoriteEntity],
  })
  async findAll(): Promise<PlayerFavorite[]> {
    return this.playerFavoritesService.findAll();
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Listar favoritos por sessão' })
  @ApiParam({ name: 'sessionId', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Lista de favoritos da sessão',
    type: [PlayerFavoriteEntity],
  })
  async findBySessionId(
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<PlayerFavorite[]> {
    return this.playerFavoritesService.findBySessionId(sessionId);
  }

  @Get('voter/:voterId')
  @ApiOperation({ summary: 'Listar favoritos por votante' })
  @ApiParam({ name: 'voterId', description: 'ID do votante' })
  @ApiResponse({
    status: 200,
    description: 'Lista de favoritos do votante',
    type: [PlayerFavoriteEntity],
  })
  async findByVoterId(
    @Param('voterId', ParseIntPipe) voterId: number,
  ): Promise<PlayerFavorite[]> {
    return this.playerFavoritesService.findByVoterId(voterId);
  }

  @Get('favorite/:favoriteId')
  @ApiOperation({ summary: 'Listar onde o jogador foi favoritado' })
  @ApiParam({ name: 'favoriteId', description: 'ID do jogador favoritado' })
  @ApiResponse({
    status: 200,
    description: 'Lista de onde o jogador foi favoritado',
    type: [PlayerFavoriteEntity],
  })
  async findByFavoriteId(
    @Param('favoriteId', ParseIntPipe) favoriteId: number,
  ): Promise<PlayerFavorite[]> {
    return this.playerFavoritesService.findByFavoriteId(favoriteId);
  }

  @Get('most-favorited')
  @ApiOperation({ summary: 'Listar jogadores mais favoritados' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limite de resultados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de jogadores mais favoritados',
    type: [MostFavoritedPlayerDto],
  })
  async getMostFavoritedPlayers(
    @Query('limit') limit?: string,
  ): Promise<MostFavoritedPlayer[]> {
    return this.playerFavoritesService.getMostFavoritedPlayers(
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um favorito' })
  @ApiParam({ name: 'id', description: 'ID do favorito' })
  @ApiResponse({
    status: 200,
    description: 'Favorito removido com sucesso',
    type: PlayerFavoriteEntity,
  })
  @ApiResponse({ status: 404, description: 'Favorito não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<PlayerFavorite> {
    return this.playerFavoritesService.remove(id);
  }
}
