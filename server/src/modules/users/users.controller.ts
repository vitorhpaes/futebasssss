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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { FindPlayersDto } from './dto/find-players.dto';
import { UserType, Position } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('deleted/list')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os usuários excluídos logicamente' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários excluídos retornada com sucesso',
    type: UserEntity,
    isArray: true,
  })
  async findDeleted(): Promise<User[]> {
    return this.usersService.findDeleted();
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

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Incluir usuários excluídos logicamente',
  })
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
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<User[]> {
    return this.usersService.findAll(
      name,
      type,
      position,
      orderBy,
      orderDirection,
      includeDeleted === 'true',
    );
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Incluir usuários excluídos logicamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('includeDeleted') includeDeleted?: string,
  ): Promise<User> {
    const user = await this.usersService.findOne(id, includeDeleted === 'true');
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
  @ApiOperation({ summary: 'Remover um usuário (exclusão lógica)' })
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

  @Patch(':id/restore')
  @HttpCode(200)
  @ApiOperation({ summary: 'Restaurar um usuário excluído logicamente' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário restaurado com sucesso',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async restore(@Param('id', ParseIntPipe) id: number): Promise<User> {
    // Verificar se o usuário excluído existe antes de tentar restaurar
    const user = await this.usersService.findOne(id, true);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Verificar se o usuário está excluído
    const usersDeleted = await this.usersService.findDeleted();
    const isDeleted = usersDeleted.some((u) => u.id === id);

    if (!isDeleted) {
      throw new NotFoundException(`Usuário com ID ${id} não está excluído`);
    }

    return this.usersService.restore(id);
  }

  @Delete(':id/permanent')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remover permanentemente um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido permanentemente com sucesso',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async permanentDelete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    // Verificar se o usuário existe antes de tentar remover permanentemente
    const user = await this.usersService.findOne(id, true);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return this.usersService.permanentDelete(id);
  }
}
