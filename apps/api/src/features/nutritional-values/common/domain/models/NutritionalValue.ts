import { ServingSizeUnit } from '@bite-track/types';

/**
 * Business Domain model for a NutritionalValue
 */
export class NutritionalValue {
  public name!: string;
  public fats!: number;
  public calories!: number;
  public proteins!: number;
  public carbohydrates!: number;
  public servingSize!: number;
  public servingUnit!: ServingSizeUnit;

  public constructor(properties?: Partial<NutritionalValue>) {
    Object.assign(this, properties);
  }
}
