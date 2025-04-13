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
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateTeamCaptainDto } from './dto/update-team-captain.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Team } from '@prisma/client';

class TeamEntity implements Team {
  id: number;
  name: string;
  color: string;
  sessionId: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  captainId: number | null;
}

class TeamPlayerDto {
  id: number;
  name: string;
  position: string;
  goals: number;
  assists: number;
  confirmed: boolean;
}

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar um novo time' })
  @ApiResponse({
    status: 201,
    description: 'Time criado com sucesso',
    type: TeamEntity,
  })
  async create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os times' })
  @ApiResponse({
    status: 200,
    description: 'Lista de times',
    type: [TeamEntity],
  })
  async findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get('deleted/list')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os times excluídos logicamente' })
  @ApiResponse({
    status: 200,
    description: 'Lista de times excluídos retornada com sucesso',
    type: TeamEntity,
    isArray: true,
  })
  async findDeleted(): Promise<Team[]> {
    const deletedTeams = await this.teamsService.findDeleted();
    return deletedTeams;
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter um time pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Dados do time',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    const team = await this.teamsService.findOne(id);
    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }
    return team;
  }

  @Get(':id/players')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar jogadores de um time' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiQuery({
    name: 'sessionId',
    required: false,
    type: Number,
    description: 'Filtrar por sessão',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de jogadores do time',
    type: [TeamPlayerDto],
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async getTeamPlayers(
    @Param('id', ParseIntPipe) id: number,
    @Query('sessionId') sessionId?: string,
  ): Promise<TeamPlayerDto[]> {
    // Verificar se o time existe
    const team = await this.teamsService.findOne(id);
    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }

    return this.teamsService.getTeamPlayers(
      id,
      sessionId ? parseInt(sessionId, 10) : undefined,
    );
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar um time existente' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Time atualizado com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    // Verificar se o time existe
    const team = await this.teamsService.findOne(id);
    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }

    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover um time (exclusão lógica)' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Time removido com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    // Verificar se o time existe
    const team = await this.teamsService.findOne(id);
    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }

    return this.teamsService.remove(id);
  }

  @Patch(':id/restore')
  @HttpCode(200)
  @ApiOperation({ summary: 'Restaurar um time excluído logicamente' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Time restaurado com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async restore(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    // Verificar se o time excluído existe
    const teamDeleted = await this.teamsService.findOne(id, true);
    if (!teamDeleted) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }

    if (!teamDeleted.deletedAt) {
      throw new NotFoundException(`Time com ID ${id} não está excluído`);
    }

    const restoredTeam = await this.teamsService.restore(id);
    return restoredTeam;
  }

  @Delete(':id/permanent')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover um time permanentemente' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Time removido permanentemente com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async permanentDelete(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    // Verificar se o time existe (mesmo que excluído)
    const team = await this.teamsService.findOne(id, true);
    if (!team) {
      throw new NotFoundException(`Time com ID ${id} não encontrado`);
    }

    const deletedTeam = await this.teamsService.permanentDelete(id);
    return deletedTeam;
  }

  @Patch(':id/captain')
  @HttpCode(200)
  @ApiOperation({ summary: 'Definir o capitão do time' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Capitão definido com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  @ApiResponse({ status: 400, description: 'Jogador não faz parte do time' })
  async updateCaptain(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamCaptainDto: UpdateTeamCaptainDto,
  ): Promise<Team> {
    try {
      return await this.teamsService.updateCaptain(
        id,
        updateTeamCaptainDto.playerSessionId,
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Time não encontrado') {
          throw new NotFoundException(error.message);
        }
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
