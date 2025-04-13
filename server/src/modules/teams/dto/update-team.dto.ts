import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTeamDto {
  @ApiProperty({
    description: 'Nome do time',
    example: 'Time A',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'ID da sessão do jogo',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  sessionId?: number;
}
