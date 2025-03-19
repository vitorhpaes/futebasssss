import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Session, SessionStatus } from '@prisma/client';

class SessionEntity implements Session {
  id: number;
  date: Date;
  location: string;
  status: SessionStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova sessão de jogo' })
  @ApiResponse({
    status: 201,
    description: 'Sessão criada com sucesso',
    type: SessionEntity,
  })
  async create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as sessões de jogo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões',
    type: [SessionEntity],
  })
  async findAll(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Listar sessões de jogo futuras' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões futuras',
    type: [SessionEntity],
  })
  async findUpcoming(): Promise<Session[]> {
    return this.sessionsService.findUpcoming();
  }

  @Get('past')
  @ApiOperation({ summary: 'Listar sessões de jogo passadas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões passadas',
    type: [SessionEntity],
  })
  async findPast(): Promise<Session[]> {
    return this.sessionsService.findPast();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma sessão de jogo pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Dados da sessão',
    type: SessionEntity,
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Session | null> {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma sessão existente' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Sessão atualizada com sucesso',
    type: SessionEntity,
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma sessão' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Sessão removida com sucesso',
    type: SessionEntity,
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionsService.remove(id);
  }
}
