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
  InternalServerErrorException,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session, SessionStatus, Prisma } from '@prisma/client';
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
    try {
      const session = await this.sessionsService.findOne(
        id,
        includeDeleted === 'true',
      );
      if (!session) {
        throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
      }
      return session;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Erro ao buscar sessão');
      }
      throw error;
    }
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
    try {
      const session = await this.sessionsService.findOne(id);
      if (!session) {
        throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
      }
      return this.sessionsService.remove(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Erro ao remover sessão');
      }
      throw error;
    }
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
    try {
      const session = await this.sessionsService.findOne(id, true);
      if (!session) {
        throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
      }

      const deletedSessions = await this.sessionsService.findDeleted();
      if (!Array.isArray(deletedSessions)) {
        throw new InternalServerErrorException(
          'Erro ao buscar sessões excluídas',
        );
      }

      const isDeleted = deletedSessions.some((s: any) => s.id === id);
      if (!isDeleted) {
        throw new NotFoundException(`Sessão com ID ${id} não está excluída`);
      }

      return this.sessionsService.restore(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Erro ao restaurar sessão');
      }
      throw error;
    }
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
    try {
      const session = await this.sessionsService.findOne(id, true);
      if (!session) {
        throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
      }
      return this.sessionsService.permanentDelete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(
          'Erro ao excluir permanentemente a sessão',
        );
      }
      throw error;
    }
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
    const validStatuses = Object.values(SessionStatus);
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Status inválido. Valores permitidos: ${validStatuses.map(String).join(', ')}`,
      );
    }

    try {
      const session = await this.sessionsService.findOne(id);
      if (!session) {
        throw new NotFoundException(`Sessão com ID ${id} não encontrada`);
      }
      return this.sessionsService.updateStatus(id, status);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Erro ao atualizar status da sessão');
      }
      throw error;
    }
  }
}
