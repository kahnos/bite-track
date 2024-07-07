import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export const MACRO_TOTAL_METADATA: Record<keyof MacroTotalOutput, ApiPropertyOptions> = {
  calories: {
    type: 'number',
    description: 'Total calories',
    example: 100,
    required: true,
  },
  carbohydrates: {
    type: 'number',
    description: 'Total carbohydrates',
    example: 10,
    required: true,
  },
  fats: {
    type: 'number',
    description: 'Total fats',
    example: 10,
    required: true,
  },
  proteins: {
    type: 'number',
    description: 'Total proteins',
    example: 10,
    required: true,
  },
};

export abstract class MacroTotalOutput {
  @ApiProperty(MACRO_TOTAL_METADATA.calories)
  calories!: number;

  @ApiProperty(MACRO_TOTAL_METADATA.carbohydrates)
  carbohydrates!: number;

  @ApiProperty(MACRO_TOTAL_METADATA.fats)
  fats!: number;

  @ApiProperty(MACRO_TOTAL_METADATA.proteins)
  proteins!: number;
}
