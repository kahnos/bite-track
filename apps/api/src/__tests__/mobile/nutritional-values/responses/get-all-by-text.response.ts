import { GetNutritionalValuesByTextOutput } from '@/features/nutritional-values/controllers/common/dtos/outputs/get-by-text.output';

export const getAllByTextResponse: GetNutritionalValuesByTextOutput = {
  items: [
    {
      name: 'bananas',
      macros: {
        calories: 206.3,
        carbohydrates: 52.9,
        fats: 0.8,
        proteins: 2.6,
      },
      serving: {
        size: 236,
        unit: 'GRAMS',
      },
    },
    {
      name: 'apple',
      macros: {
        calories: 53,
        carbohydrates: 14.1,
        fats: 0.2,
        proteins: 0.3,
      },
      serving: {
        size: 100,
        unit: 'GRAMS',
      },
    },
  ],
  total: {
    calories: 259.3,
    carbohydrates: 67,
    fats: 1,
    proteins: 2.9,
  },
};
