import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PlayerSessionsService } from './player-sessions.service';
import { CreatePlayerSessionDto } from './dto/create-player-session.dto';
import { UpdatePlayerSessionDto } from './dto/update-player-session.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PlayerSession } from '@prisma/client';

class PlayerSessionEntity implements Partial<PlayerSession> {
  id: number;
  userId: number;
  sessionId: number;
  teamId: number;
  confirmed: boolean;
  goals: number;
  assists: number;
  createdAt: Date;
  updatedAt: Date;
}

@ApiTags('player-sessions')
@Controller('player-sessions')
export class PlayerSessionsController {
  constructor(private readonly playerSessionsService: PlayerSessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova associação entre jogador e sessão' })
  @ApiResponse({
    status: 201,
    description: 'Associação criada com sucesso',
    type: PlayerSessionEntity,
  })
  async create(
    @Body() createPlayerSessionDto: CreatePlayerSessionDto,
  ): Promise<PlayerSession> {
    return this.playerSessionsService.create(createPlayerSessionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as associações entre jogadores e sessões',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de associações',
    type: [PlayerSessionEntity],
  })
  async findAll(): Promise<PlayerSession[]> {
    return this.playerSessionsService.findAll();
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Listar associações por sessão' })
  @ApiParam({ name: 'sessionId', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Lista de associações para a sessão',
    type: [PlayerSessionEntity],
  })
  async findBySessionId(
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<PlayerSession[]> {
    return this.playerSessionsService.findBySessionId(sessionId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Listar associações por usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de associações para o usuário',
    type: [PlayerSessionEntity],
  })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<PlayerSession[]> {
    return this.playerSessionsService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma associação pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da associação' })
  @ApiResponse({
    status: 200,
    description: 'Dados da associação',
    type: PlayerSessionEntity,
  })
  @ApiResponse({ status: 404, description: 'Associação não encontrada' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlayerSession | null> {
    return this.playerSessionsService.findOne(id);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Confirmar presença de um jogador em uma sessão' })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  @ApiQuery({ name: 'sessionId', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Presença confirmada com sucesso',
    type: PlayerSessionEntity,
  })
  async confirmPresence(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<PlayerSession> {
    return this.playerSessionsService.confirmPresence(userId, sessionId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma associação existente' })
  @ApiParam({ name: 'id', description: 'ID da associação' })
  @ApiResponse({
    status: 200,
    description: 'Associação atualizada com sucesso',
    type: PlayerSessionEntity,
  })
  @ApiResponse({ status: 404, description: 'Associação não encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerSessionDto: UpdatePlayerSessionDto,
  ): Promise<PlayerSession> {
    return this.playerSessionsService.update(id, updatePlayerSessionDto);
  }

  @Patch(':id/stats')
  @ApiOperation({
    summary: 'Atualizar estatísticas de um jogador em uma sessão',
  })
  @ApiParam({ name: 'id', description: 'ID da associação' })
  @ApiQuery({ name: 'goals', required: true, type: Number })
  @ApiQuery({ name: 'assists', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas atualizadas com sucesso',
    type: PlayerSessionEntity,
  })
  async updateStats(
    @Param('id', ParseIntPipe) id: number,
    @Query('goals', ParseIntPipe) goals: number,
    @Query('assists', ParseIntPipe) assists: number,
  ): Promise<PlayerSession> {
    return this.playerSessionsService.updateStats(id, goals, assists);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma associação' })
  @ApiParam({ name: 'id', description: 'ID da associação' })
  @ApiResponse({
    status: 200,
    description: 'Associação removida com sucesso',
    type: PlayerSessionEntity,
  })
  @ApiResponse({ status: 404, description: 'Associação não encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<PlayerSession> {
    return this.playerSessionsService.remove(id);
  }
}
