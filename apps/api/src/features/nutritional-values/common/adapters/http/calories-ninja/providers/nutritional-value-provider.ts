import { API_HEADERS, ENV_CONFIGURATION, ERROR_CODES } from '@bite-track/types';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

import { ApiException } from '@/common/exceptions/api-exception';
import { NutritionalValue } from '@/features/nutritional-values/common/domain/models/NutritionalValue';
import {
  GetNutritionalValuesByItemsParams,
  GetNutritionalValuesByTextParams,
  HttpNutritionalValueProvider,
  NutritionalValueItemSearchParams,
} from '@/features/nutritional-values/common/ports/http-nutritional-value-provider';

import { CaloriesNinjaGetNutritionResponse } from '../interfaces/get-nutrition-response';
import { CaloriesNinjaNutritionalValueMapper } from '../mappers/nutritional-value-mapper';

/**
 * Provides addresses from the ViaCEP API.
 */
@Injectable()
export class CaloriesNinjaNutritionalValueProvider extends HttpNutritionalValueProvider {
  private readonly _logger = new Logger(CaloriesNinjaNutritionalValueProvider.name);

  constructor(
    @Inject(ConfigService)
    private readonly _configService: ConfigService,
  ) {
    super();
  }

  async getNutritionalValuesByText(params: GetNutritionalValuesByTextParams): Promise<NutritionalValue[]> {
    const { searchText } = params;
    const nutritionData = await this.getNutritionFromApiByText({ searchText });
    const mappedNutritionData = CaloriesNinjaNutritionalValueMapper.toDomainArray(nutritionData);

    this._logger.log({
      message: 'Mapped nutritional values',
      data: {
        mappedNutritionData,
      },
    });

    return mappedNutritionData;
  }

  async getNutritionalValuesByItems(params: GetNutritionalValuesByItemsParams): Promise<NutritionalValue[]> {
    const { items } = params;
    const searchText = this._getSearchQuery(items);
    const nutritionData = await this.getNutritionFromApiByText({ searchText });
    const mappedNutritionData = CaloriesNinjaNutritionalValueMapper.toDomainArray(nutritionData);

    this._logger.log({
      message: 'Got nutritional values',
      data: {
        mappedNutritionData,
      },
    });

    return mappedNutritionData;
  }

  async getNutritionFromApiByText(params: { searchText: string }): Promise<CaloriesNinjaGetNutritionResponse[]> {
    const { searchText } = params;
    const apiUrl = `${this._configService.get(ENV_CONFIGURATION.CALORIES_NINJA_URL)}/nutrition?query=${searchText}`;

    this._logger.log({
      message: 'Fetching nutrition data from Calories Ninja',
      data: {
        searchText,
        apiUrl,
      },
    });

    let response;
    try {
      response = await axios({
        url: apiUrl,
        method: 'GET',
        headers: this._getHttpHeaders(),
      });

      if (!response.data?.items || response.data.items.length === 0) {
        throw new ApiException({
          message: 'No items found in response from CaloriesNinja',
          code: ERROR_CODES.NUTRITIONAL_VALUES__NOT_FOUND,
        });
      }
    } catch (error) {
      this._logger.error({
        message: 'Error while fetching nutrition from CaloriesNinja',
        data: {
          searchText,
          error: (error as AxiosError).response?.data,
        },
        context: CaloriesNinjaNutritionalValueProvider.name,
      });
      throw new ApiException({
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: `Error while fetching nutrition from third-party provider.`,
      });
    }

    const nutritionData: CaloriesNinjaGetNutritionResponse[] = response.data.items!;

    this._logger.log({
      message: 'Fetched nutrition from CaloriesNinja',
      data: {
        nutritionData,
      },
    });

    return nutritionData;
  }

  /**
   * Gets a query string to search for nutritional information for the given items.
   * @param items The items to get nutritional information for.
   * @returns The query string to search for nutritional information for the given items.
   */
  private _getSearchQuery(items: NutritionalValueItemSearchParams[]): string {
    let query = '';
    for (const item of items) {
      query += `${item.servingSize}${item.unit.toLowerCase()} ${item.name}, `;
    }
    return query;
  }

  /**
   * Gets the headers to use in the HTTP request.
   * @returns The headers to use in the HTTP request.
   */
  private _getHttpHeaders(): Record<string, string> {
    return {
      [API_HEADERS.X_API_KEY]: this._configService.get(ENV_CONFIGURATION.CALORIES_NINJA_API_KEY) ?? '',
    };
  }
}
