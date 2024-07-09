import { SERVING_SIZE_UNITS } from '@bite-track/types';

import { NutritionalValue } from '@/features/nutritional-values/domain/models/NutritionalValue';

import { CaloriesNinjaGetNutritionResponse } from '../interfaces/get-nutrition-response';

/**
 * Maps a CaloriesNinja nutrition response to a NutritionalValue domain model
 */
export class CaloriesNinjaNutritionalValueMapper {
  static toDomain(caloriesNinjaNutrition: CaloriesNinjaGetNutritionResponse): NutritionalValue {
    return {
      calories: caloriesNinjaNutrition.calories,
      carbohydrates: caloriesNinjaNutrition.carbohydrates_total_g,
      fats: caloriesNinjaNutrition.fat_total_g,
      name: caloriesNinjaNutrition.name,
      proteins: caloriesNinjaNutrition.protein_g,
      servingSize: caloriesNinjaNutrition.serving_size_g,
      servingUnit: SERVING_SIZE_UNITS.GRAMS,
    };
  }

  static toDomainArray(caloriesNinjaNutritions: CaloriesNinjaGetNutritionResponse[]): NutritionalValue[] {
    return caloriesNinjaNutritions.map((caloriesNinjaNutrition) => this.toDomain(caloriesNinjaNutrition));
  }
}
