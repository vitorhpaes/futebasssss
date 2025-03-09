import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { GameResultsService } from './game-results.service';
import { CreateGameResultDto } from './dto/create-game-result.dto';
import { UpdateGameResultDto } from './dto/update-game-result.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GameResult } from '@prisma/client';

class GameResultEntity {
  id: number;
  sessionId: number;
  teamAId: number;
  teamBId: number;
  scoreA: number;
  scoreB: number;
  winnerId?: number;
  createdAt: Date;
  updatedAt: Date;
}

@ApiTags('game-results')
@Controller('game-results')
export class GameResultsController {
  constructor(private readonly gameResultsService: GameResultsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar um resultado de jogo' })
  @ApiResponse({
    status: 201,
    description: 'Resultado de jogo criado com sucesso',
    type: GameResultEntity,
  })
  async create(
    @Body() createGameResultDto: CreateGameResultDto,
  ): Promise<GameResult> {
    return this.gameResultsService.create(createGameResultDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os resultados de jogos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de resultados de jogos',
    type: [GameResultEntity],
  })
  async findAll(): Promise<GameResult[]> {
    return this.gameResultsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter um resultado de jogo pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do resultado de jogo' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de jogo encontrado',
    type: GameResultEntity,
  })
  @ApiResponse({ status: 404, description: 'Resultado de jogo não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GameResult> {
    return this.gameResultsService.findOne(id);
  }

  @Get('session/:sessionId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter um resultado de jogo pelo ID da sessão' })
  @ApiParam({ name: 'sessionId', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de jogo encontrado',
    type: GameResultEntity,
  })
  @ApiResponse({ status: 404, description: 'Resultado de jogo não encontrado' })
  async findBySessionId(
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<GameResult> {
    return this.gameResultsService.findBySessionId(sessionId);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar um resultado de jogo' })
  @ApiParam({ name: 'id', description: 'ID do resultado de jogo' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de jogo atualizado com sucesso',
    type: GameResultEntity,
  })
  @ApiResponse({ status: 404, description: 'Resultado de jogo não encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameResultDto: UpdateGameResultDto,
  ): Promise<GameResult> {
    return this.gameResultsService.update(id, updateGameResultDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover um resultado de jogo' })
  @ApiParam({ name: 'id', description: 'ID do resultado de jogo' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de jogo removido com sucesso',
    type: GameResultEntity,
  })
  @ApiResponse({ status: 404, description: 'Resultado de jogo não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<GameResult> {
    return this.gameResultsService.remove(id);
  }
}
