/**
 * Interface that represents the response from the CaloriesNinja nutrition API
 *
 * @see https://calorieninjas.com/api
 * @example
 * {
 *  "name": "apple",
 *  "sugar_g": 19.5,
 *  "fiber_g": 2.4,
 *  "sodium_mg": 1.0,
 *  "potassium_mg": 107.0,
 *  "fat_saturated_g": 0.1,
 *  "cholesterol_mg": 0.0,
 *  "fat_total_g": 0.3,
 *  "calories": 52.0,
 *  "protein_g": 0.3,
 *  "carbohydrates_total_g": 14.0,
 *  "serving_size_g": 100.0
 * }
 */
export interface CaloriesNinjaGetNutritionResponse {
  /**
   * The name of the food item
   */
  name: string;

  /**
   * The total sugar content in grams
   */
  sugar_g: number;

  /**
   * The total fiber content in grams
   */
  fiber_g: number;

  /**
   * The total sodium content in milligrams
   */
  sodium_mg: number;

  /**
   * The total potassium content in milligrams
   */
  potassium_mg: number;

  /**
   * The total saturated fat content in grams
   */
  fat_saturated_g: number;

  /**
   * The total cholesterol content in milligrams
   */
  cholesterol_mg: number;

  /**
   * The total fat content in grams
   */
  fat_total_g: number;

  /**
   * The total calories in the food item
   */
  calories: number;

  /**
   * The total protein content in grams
   */
  protein_g: number;

  /**
   * The total carbohydrates content in grams
   */
  carbohydrates_total_g: number;

  /**
   * The serving size in grams
   */
  serving_size_g: number;
}
