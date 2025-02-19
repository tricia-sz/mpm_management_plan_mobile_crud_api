import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Jonh Doe' })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ example: '01234567890' })
  @IsString()
  cpf: string;

  @ApiProperty({ example: '(99) 99999-9999' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'customer@example.com' })
  @IsEmail()
  email: string;
}
