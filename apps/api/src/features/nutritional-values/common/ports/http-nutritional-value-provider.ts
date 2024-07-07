import { ServingSizeUnit } from '@bite-track/types';

import { NutritionalValue } from '../domain/models/NutritionalValue';

interface NutritionalValueItemSearchParams {
  /**
   * The name of the item to get nutritional information for.
   */
  name: string;

  /**
   * The serving size of the item to get nutritional information for.
   */
  servingSize: number;

  /**
   * The unit of the serving size.
   */
  unit: ServingSizeUnit;
}

interface GetNutritionalValuesByItemsParams {
  items: NutritionalValueItemSearchParams[];
}

interface GetNutritionalValuesByTextParams {
  searchText: string;
}

/**
 * Provides nutritional information from a remote provider, such as a private API.
 */
export abstract class HttpNutritionalValueProvider {
  /**
   * Gets nutritional information for given items.
   * @param params.items The items to get nutritional information for.
   * @returns The nutritional information for every item provided.
   */
  abstract getNutritionalValuesByItems(params: GetNutritionalValuesByItemsParams): Promise<NutritionalValue[]>;

  /**
   * Gets nutritional information for given items, based on a full text search.
   * @param params.searchText The text to search for nutritional information for.
   * @returns The nutritional information for every item provided.
   */
  abstract getNutritionalValuesByText(params: GetNutritionalValuesByTextParams): Promise<NutritionalValue[]>;
}

export type { GetNutritionalValuesByItemsParams, NutritionalValueItemSearchParams, GetNutritionalValuesByTextParams };
