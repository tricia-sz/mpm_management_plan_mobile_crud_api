import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class AddPlansDto {
  @ApiProperty({
    example: [
      'fa86e71b-1760-41d2-af20-e6b18872ce90',
      '6d6cc3b3-7921-44ae-a32c-8d8196fa90d0',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  plansId: string[];
}
