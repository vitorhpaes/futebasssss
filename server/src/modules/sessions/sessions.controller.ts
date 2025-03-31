import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session, SessionStatus } from '@prisma/client';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar uma nova sessão' })
  @ApiBody({ type: CreateSessionDto })
  @ApiResponse({
    status: 201,
    description: 'Sessão criada com sucesso',
  })
  async create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todas as sessões' })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Incluir sessões excluídas logicamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões retornada com sucesso',
  })
  async findAll(
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<Session[]> {
    return this.sessionsService.findAll(includeDeleted === 'true');
  }

  @Get('upcoming')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar sessões futuras' })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Incluir sessões excluídas logicamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões futuras retornada com sucesso',
  })
  async findUpcoming(
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<Session[]> {
    return this.sessionsService.findUpcoming(includeDeleted === 'true');
  }

  @Get('past')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar sessões passadas' })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Incluir sessões excluídas logicamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões passadas retornada com sucesso',
  })
  async findPast(
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<Session[]> {
    return this.sessionsService.findPast(includeDeleted === 'true');
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar uma sessão pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Incluir sessões excluídas logicamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Sessão encontrada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<Session> {
    const session = await this.sessionsService.findOne(
      id,
      includeDeleted === 'true',
    );
    if (!session) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
    }
    return session;
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar uma sessão existente' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiBody({ type: UpdateSessionDto })
  @ApiResponse({
    status: 200,
    description: 'Sessão atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    try {
      return await this.sessionsService.update(id, updateSessionDto);
    } catch (error) {
      // Verificar se a sessão existe antes de tentar atualizar
      const session = await this.sessionsService.findOne(id);
      if (!session) {
        throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover uma sessão (exclusão lógica)' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Sessão removida com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    // Verificar se a sessão existe antes de tentar remover
    const session = await this.sessionsService.findOne(id);
    if (!session) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
    }
    return this.sessionsService.remove(id);
  }

  @Get('deleted/list')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todas as sessões excluídas logicamente' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sessões excluídas retornada com sucesso',
  })
  async findDeleted(): Promise<Session[]> {
    return this.sessionsService.findDeleted();
  }

  @Patch(':id/restore')
  @HttpCode(200)
  @ApiOperation({ summary: 'Restaurar uma sessão excluída logicamente' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Sessão restaurada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async restore(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    // Verificar se a sessão excluída existe antes de tentar restaurar
    const session = await this.sessionsService.findOne(id, true);
    if (!session) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
    }

    // Verificar se a sessão está excluída
    const sessionDeleted = await this.sessionsService.findDeleted();
    const isDeleted = sessionDeleted.some((s) => s.id === id);

    if (!isDeleted) {
      throw new NotFoundException(`Sessão com ID ${id} não está excluída`);
    }

    return this.sessionsService.restore(id);
  }

  @Delete(':id/permanent')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover permanentemente uma sessão' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiResponse({
    status: 200,
    description: 'Sessão removida permanentemente com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async permanentDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Session> {
    // Verificar se a sessão existe antes de tentar remover permanentemente
    const session = await this.sessionsService.findOne(id, true);
    if (!session) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
    }
    return this.sessionsService.permanentDelete(id);
  }

  @Patch(':id/status')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar o status de uma sessão' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['SCHEDULED', 'COMPLETED', 'CANCELED'],
          example: 'COMPLETED',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Status da sessão atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Status inválido' })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: SessionStatus,
  ): Promise<Session> {
    // Verificar se o status é válido
    if (!Object.values(SessionStatus).includes(status)) {
      throw new BadRequestException(
        `Status inválido. Valores permitidos: ${Object.values(
          SessionStatus,
        ).join(', ')}`,
      );
    }

    // Verificar se a sessão existe
    const session = await this.sessionsService.findOne(id);
    if (!session) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
    }

    return this.sessionsService.updateStatus(id, status);
  }
}
