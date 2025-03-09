import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'nova-senha123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
