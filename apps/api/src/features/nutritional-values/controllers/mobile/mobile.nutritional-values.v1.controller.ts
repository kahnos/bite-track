import { API_CLIENTS, API_VERSIONS } from '@bite-track/types';
import { Controller, Get, Param } from '@nestjs/common';

import { MobileGetAllByText } from '@/features/nutritional-values/controllers/common/decorators/metadata/get-all-by-text';
import { HttpNutritionalValueProvider } from '@/features/nutritional-values/ports/http-nutritional-value-provider';

import { GetNutritionalValuesByTextOutput } from '../common/dtos/outputs/get-by-text.output';

@Controller({ path: `${API_CLIENTS.MOBILE}/nutritional-values`, version: API_VERSIONS.ONE })
export class MobileNutritionalValuesControllerV1 {
  constructor(private readonly _httpNutritionalValueProvider: HttpNutritionalValueProvider) {}

  @MobileGetAllByText()
  @Get('/all/by-text/:searchText')
  async getByText(@Param('searchText') searchText: string): Promise<GetNutritionalValuesByTextOutput> {
    const nutritionalValues = await this._httpNutritionalValueProvider.getNutritionalValuesByText({ searchText });

    return new GetNutritionalValuesByTextOutput(nutritionalValues);
  }
}
