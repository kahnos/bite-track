import { Module } from '@nestjs/common';

import { HttpNutritionalValueProvider } from '@/features/nutritional-values/ports/http-nutritional-value-provider';

import { CaloriesNinjaNutritionalValueProvider } from './calories-ninja/providers/nutritional-value-provider';

@Module({
  providers: [
    {
      provide: HttpNutritionalValueProvider, // tie in adapter to port defined in business logic
      useClass: CaloriesNinjaNutritionalValueProvider,
    },
  ],
  exports: [HttpNutritionalValueProvider],
})
export class HttpNutritionalValueProviderModule {}
