import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryCustomerDto {
  @ApiProperty({ example: 'Jonh Doe', required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @Transform(({ value }) => value?.toLowerCase())
  name?: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  cpf?: string;
}
