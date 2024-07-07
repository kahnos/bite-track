import { ValueOf } from '@/types';

/**
 * ENVIRONMENTS
 *
 * API environments
 */
export const ENVIRONMENTS = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',

  /**
   * Not a real environment. It's used by jest and test runners.
   */
  _TEST: 'test',
} as const;

/**
 * Environments
 *
 * API environments
 */
export type Environments = ValueOf<typeof ENVIRONMENTS>;
