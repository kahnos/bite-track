import { ValueOf } from '../types';

/**
 * SERVING_SIZE_UNITS
 *
 * @description The units for serving size that are supported by the system.
 */
export const SERVING_SIZE_UNITS = {
  GRAMS: 'GRAMS',
  UNIT: 'UNIT',
} as const;

export type ServingSizeUnit = ValueOf<typeof SERVING_SIZE_UNITS>;
