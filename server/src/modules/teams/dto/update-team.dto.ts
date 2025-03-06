import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
    description: 'Cor do time/uniforme',
    example: 'Azul',
    required: false,
  })
  @IsString()
  @IsOptional()
  color?: string;
}
