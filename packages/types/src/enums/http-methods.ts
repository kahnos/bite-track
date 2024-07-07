import { ValueOf } from '../types';

/**
 * HTTP_METHODS
 *
 * @description The HTTP methods that are supported by the system.
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
  CONNECT: 'CONNECT',
  TRACE: 'TRACE',
} as const;

export type HttpMethod = ValueOf<typeof HTTP_METHODS>;
