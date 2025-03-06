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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
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
  createdAt: Date;
  updatedAt: Date;
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
  @ApiOperation({ summary: 'Listar todos os times' })
  @ApiResponse({
    status: 200,
    description: 'Lista de times',
    type: [TeamEntity],
  })
  async findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um time pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Dados do time',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Team | null> {
    return this.teamsService.findOne(id);
  }

  @Get(':id/players')
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
  ): Promise<any[]> {
    return this.teamsService.getTeamPlayers(
      id,
      sessionId ? parseInt(sessionId, 10) : undefined,
    );
  }

  @Patch(':id')
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
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um time' })
  @ApiParam({ name: 'id', description: 'ID do time' })
  @ApiResponse({
    status: 200,
    description: 'Time removido com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return this.teamsService.remove(id);
  }
}
