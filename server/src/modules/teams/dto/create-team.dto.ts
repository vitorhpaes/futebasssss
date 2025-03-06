import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: 'Nome do time',
    example: 'Time A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Cor do time/uniforme',
    example: 'Azul',
  })
  @IsString()
  @IsNotEmpty()
  color: string;
}
