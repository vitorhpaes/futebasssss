import { ApiPropertyOptional } from '@nestjs/swagger';
import { Position } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindPlayersDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nome do jogador',
    example: 'João',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por posição do jogador',
    enum: ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'],
    example: 'MIDFIELDER',
  })
  @IsOptional()
  @IsEnum(Position)
  position?: Position;

  @ApiPropertyOptional({
    description: 'Ordenar por (name, position)',
    example: 'name',
  })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Direção da ordenação (asc, desc)',
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === 'desc' ? 'desc' : 'asc'))
  orderDirection?: 'asc' | 'desc';
}
