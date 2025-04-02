import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePlayerFavoriteDto {
  @ApiProperty({
    description: 'ID da sessão de jogo',
    example: 1,
  })
  @IsNumber()
  sessionId: number;

  @ApiProperty({
    description: 'ID do jogador que está votando',
    example: 2,
  })
  @IsNumber()
  voterId: number;

  @ApiProperty({
    description: 'ID do jogador favorito',
    example: 3,
  })
  @IsNumber()
  favoriteId: number;
}
