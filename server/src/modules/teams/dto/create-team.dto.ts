import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: 'Nome do time',
    example: 'Time A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID da sessão do jogo',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;
}
