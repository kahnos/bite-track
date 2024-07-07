import { ValueOf } from '@/types';

export const API_VERSIONS = {
  ONE: '1',
} as const;

export type ApiVersion = ValueOf<typeof API_VERSIONS>;
