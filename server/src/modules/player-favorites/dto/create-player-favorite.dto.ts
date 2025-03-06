import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlayerFavoriteDto {
  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @ApiProperty({
    description: 'ID do jogador que vota',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  voterId: number;

  @ApiProperty({
    description: 'ID do jogador favorito',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  favoriteId: number;

  @ApiProperty({
    description: 'ID do time do jogador favorito',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  teamId: number;
}
