import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export class CreateSessionDto {
  @ApiProperty({
    description: 'Data e hora da sessão de jogo',
    example: '2023-05-04T19:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Local da sessão de jogo',
    example: 'Campo do Parque',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Status da sessão',
    example: 'SCHEDULED',
    enum: SessionStatus,
    default: SessionStatus.SCHEDULED,
  })
  @IsEnum(SessionStatus)
  @IsOptional()
  status?: SessionStatus;

  @ApiProperty({
    description: 'Observações sobre a sessão',
    example: 'Trazer chuteiras para grama natural',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
