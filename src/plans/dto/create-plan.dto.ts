import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform, Type } from 'class-transformer';
import { IsDecimal, IsInt, IsString } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ example: 'Standard' })
  @IsString()
  @Transform(({ value }) => value?.trim())
  planName: string;

  @ApiProperty({ example: '99.99' })
  @IsDecimal()
  @Type(() => String)
  price: Decimal;

  @ApiProperty({ example: 10 })
  @IsInt()
  dataPackage: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  callMinutes: number;
}
