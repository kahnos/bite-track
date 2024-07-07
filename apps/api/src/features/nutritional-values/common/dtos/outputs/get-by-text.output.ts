import { SERVING_SIZE_UNITS, ServingSizeUnit } from '@bite-track/types';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

import { MacroTotalOutput } from '@/common/outputs/macro-total.output';

import { NutritionalValue } from '../../domain/models/NutritionalValue';

const API_PROPERTY_METADATA: Record<string, ApiPropertyOptions> = {
  size: {
    type: 'number',
    description: 'Serving size',
    example: 100,
    required: true,
    minimum: 0,
  },
  unit: {
    description: 'Serving unit',
    example: SERVING_SIZE_UNITS.GRAMS,
    required: true,
    enum: SERVING_SIZE_UNITS,
  },
  name: {
    type: 'string',
    description: 'Name of the nutritional value',
    example: 'Apple',
    required: true,
  },
};

class NutritionalValuesServingOutput {
  @ApiProperty(API_PROPERTY_METADATA.size)
  size!: number;

  @ApiProperty(API_PROPERTY_METADATA.unit)
  unit!: ServingSizeUnit;
}

class NutritionalValuesItemsOutput {
  @ApiProperty(API_PROPERTY_METADATA.name)
  name!: string;

  @ApiProperty({ type: () => MacroTotalOutput })
  macros!: MacroTotalOutput;

  @ApiProperty({ type: () => NutritionalValuesServingOutput })
  serving!: NutritionalValuesServingOutput;
}

/**
 * Output for the GetNutritionalValuesByText use case
 */
export class GetNutritionalValuesByTextOutput {
  @ApiProperty({ type: () => MacroTotalOutput })
  public total!: MacroTotalOutput;
  @ApiProperty({ type: () => NutritionalValuesItemsOutput, isArray: true })
  public items!: NutritionalValuesItemsOutput[];

  public constructor(nutritionalValues: NutritionalValue[]) {
    this.items = this._itemsToOutput(nutritionalValues);
    this.total = this._calculateTotals(this.items);
  }

  /**
   * Convert NutritionalValue items to output format
   */
  _itemsToOutput(nutritionalValues: NutritionalValue[]): NutritionalValuesItemsOutput[] {
    return nutritionalValues.map((item) => ({
      name: item.name,
      macros: {
        calories: item.calories,
        carbohydrates: item.carbohydrates,
        fats: item.fats,
        proteins: item.proteins,
      },
      serving: {
        size: item.servingSize,
        unit: item.servingUnit,
      },
    }));
  }

  /**
   * Calculate the total macro values for all items
   */
  _calculateTotals(items: NutritionalValuesItemsOutput[]): MacroTotalOutput {
    return items.reduce(
      (acc, item) => {
        acc.calories += item.macros.calories;
        acc.carbohydrates += item.macros.carbohydrates;
        acc.fats += item.macros.fats;
        acc.proteins += item.macros.proteins;

        return acc;
      },
      { calories: 0, carbohydrates: 0, fats: 0, proteins: 0 },
    );
  }
}
