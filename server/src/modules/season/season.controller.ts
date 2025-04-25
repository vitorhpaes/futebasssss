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
import { SeasonService } from './season.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Season } from '@prisma/client';

@ApiTags('season')
@Controller('season')
export class SeasonController {
  constructor(private readonly seasonsService: SeasonService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar um resultado de jogo' })
  @ApiResponse({
    status: 201,
    description: 'Resultado de jogo criado com sucesso',
  })
  async create(@Body() createSeasonDto: CreateSeasonDto): Promise<Season> {
    return this.seasonsService.create(createSeasonDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os resultados de jogos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de resultados de jogos',
  })
  async findAll(): Promise<Season[]> {
    return this.seasonsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obter um resultado de jogo pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do resultado de jogo' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de jogo encontrado',
  })
  @ApiResponse({ status: 404, description: 'Resultado de jogo não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Season> {
    return this.seasonsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar um resultado de jogo' })
  @ApiParam({ name: 'id', description: 'ID do resultado de jogo' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de jogo atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Resultado de jogo não encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ): Promise<Season> {
    return this.seasonsService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover um resultado de jogo' })
  @ApiParam({ name: 'id', description: 'ID do resultado de jogo' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de jogo removido com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Resultado de jogo não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Season> {
    return this.seasonsService.remove(id);
  }
}
