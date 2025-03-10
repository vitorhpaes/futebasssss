import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Body,
  NotFoundException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { FindPlayersDto } from './dto/find-players.dto';
import { UserType, Position } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: UserEntity,
    isArray: true,
  })
  async findAll(
    @Query('name') name?: string,
    @Query('type') type?: UserType,
    @Query('position') position?: Position,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection?: 'asc' | 'desc',
  ): Promise<User[]> {
    return this.usersService.findAll(
      name,
      type,
      position,
      orderBy,
      orderDirection,
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar um usuário existente' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      // Verificar se o usuário existe antes de tentar atualizar
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    // Verificar se o usuário existe antes de tentar remover
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return this.usersService.remove(id);
  }

  @Get('players')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os jogadores com filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de jogadores retornada com sucesso',
    type: UserEntity,
    isArray: true,
  })
  async findPlayers(@Query() findPlayersDto: FindPlayersDto): Promise<User[]> {
    return this.usersService.findPlayers(
      findPlayersDto.name,
      findPlayersDto.position,
      findPlayersDto.orderBy,
      findPlayersDto.orderDirection,
    );
  }
}
