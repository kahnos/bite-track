import { ValueOf } from '../types';

/**
 * ERROR_CODES
 *
 * @description The error codes that are supported by the system. Shared between client and server.
 */
export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: 'ERROR:INTERNAL_SERVER_ERROR',
  VALIDATION: 'ERROR:VALIDATION',
  NUTRITIONAL_VALUES__NOT_FOUND: 'ERROR:NUTRITIONAL_VALUES__NOT_FOUND',
} as const;

export type ErrorCode = ValueOf<typeof ERROR_CODES>;
