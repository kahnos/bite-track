import { ValueOf } from '@/types';

export const API_CLIENTS = {
  MOBILE: 'mobile',
} as const;

export type ApiClient = ValueOf<typeof API_CLIENTS>;
