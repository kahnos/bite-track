import { API_CLIENTS } from '@bite-track/types';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { HttpNutritionalValueProvider } from '@/features/nutritional-values/common/ports/http-nutritional-value-provider';
import { MobileNutritionalValuesControllerV1 } from '@/features/nutritional-values/mobile/mobile.nutritional-values.v1.controller';

import { mobileTestAppProvider } from '@/__tests__/jest.setup';
import { caloriesNinjaNutritionResponse } from '@/__tests__/mobile/nutritional-values/mocks/calories-ninja/nutrition-response.mock';
import { getAllByTextResponse } from '@/__tests__/mobile/nutritional-values/responses/get-all-by-text.response';

describe('[Mobile] Nutritional Values', () => {
  const apiPrefix = `/${API_CLIENTS.MOBILE}/nutritional-values`;
  let nutritionalValuesController: MobileNutritionalValuesControllerV1;
  let httpNutritionalValueProvider: HttpNutritionalValueProvider;
  let app: NestFastifyApplication;

  beforeAll(() => {
    nutritionalValuesController = mobileTestAppProvider.app.get(MobileNutritionalValuesControllerV1);
    httpNutritionalValueProvider = mobileTestAppProvider.app.get(HttpNutritionalValueProvider);
    app = mobileTestAppProvider.app;
  });

  describe('Init', () => {
    it('Should be defined', () => {
      expect(nutritionalValuesController).toBeDefined();
    });
  });

  describe('GET /all/by-text/:searchText', () => {
    const url = `${apiPrefix}/all/by-text`;
    it('Returns 200 - nutritional values fetched correctly', async () => {
      const searchText = '2 bananas and an apple';

      // Spy on the getNutritionalValuesByText method
      jest
        .spyOn(httpNutritionalValueProvider, 'getNutritionFromApiByText')
        .mockImplementationOnce(() => Promise.resolve(caloriesNinjaNutritionResponse));

      return app
        .inject({
          method: 'GET',
          url: `${url}/${searchText}`,
        })
        .then((result) => {
          expect(result.statusCode).toEqual(200);
          expect(result.payload).toEqual(JSON.stringify(getAllByTextResponse));
        });
    });
  });
});
