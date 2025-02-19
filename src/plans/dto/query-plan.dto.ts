import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryPlanDto {
  @ApiProperty({ example: 'Standard', required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @Transform(({ value }) => value?.toLowerCase())
  name?: string;

  @ApiProperty({ example: '99.99', required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  price?: string;
}
