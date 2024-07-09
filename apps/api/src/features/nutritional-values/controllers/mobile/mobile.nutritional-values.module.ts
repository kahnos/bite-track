import { Module } from '@nestjs/common';

import { HttpNutritionalValueProviderModule } from '@/features/nutritional-values/adapters/http/http-nutritional-value-provider.module';

import { MobileNutritionalValuesControllerV1 } from './mobile.nutritional-values.v1.controller';

@Module({
  imports: [HttpNutritionalValueProviderModule],
  controllers: [MobileNutritionalValuesControllerV1],
})
export class MobileNutritionalValuesModule {}
