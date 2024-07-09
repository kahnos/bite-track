import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';

import { validateConfig } from '@/common/config/validate-config';
import { winstonConfig } from '@/common/logging/nest-winstons.config';
import { MobileNutritionalValuesModule } from '@/features/nutritional-values/controllers/mobile/mobile.nutritional-values.module';

export const coreImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    validate: validateConfig,
  }),
  WinstonModule.forRoot(winstonConfig),
];

export const mobileImports = () => [MobileNutritionalValuesModule];

@Module({
  imports: [...coreImports, ...mobileImports()],
})
export class AppModule {}
