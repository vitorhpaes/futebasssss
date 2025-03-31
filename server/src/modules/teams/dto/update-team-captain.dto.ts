import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateTeamCaptainDto {
  @ApiProperty({
    description: 'ID da sessão do jogador que será capitão',
    example: 1,
  })
  @IsNumber()
  playerSessionId: number;
}
