import { NestFactory } from '@nestjs/core';

import 'dotenv/config';

import { ENV_CONFIGURATION, ENVIRONMENTS } from '@bite-track/types';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ApiException } from '@/common/exceptions/api-exception';
import { GlobalExceptionFilter } from '@/common/exceptions/global-exception.filter';
import { RequestLoggerInterceptor } from '@/common/interceptors/logger.interceptor';

import { AppModule } from '@/app.module';

const version = process.env.npm_package_version;

async function bootstrap() {
  // ===== App =====
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const nodeEnv = process.env[ENV_CONFIGURATION.NODE_ENV];
  const isLocal = nodeEnv === ENVIRONMENTS.LOCAL || nodeEnv === ENVIRONMENTS.DEVELOPMENT;

  // ===== Security =====
  // see: https://github.com/helmetjs/helmet#how-it-works
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  app.enableCors();

  // ===== Monitoring =====
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // ===== Interceptors =====
  app.useGlobalInterceptors(new RequestLoggerInterceptor(logger));

  // ===== Filters =====
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ===== Pipes =====
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: ApiException.fromValidationError,
    }),
  );

  // ===== Docs =====
  if (isLocal) {
    const options = new DocumentBuilder()
      .setTitle('🍕 Bite Track API 🍕')
      .setVersion(version ?? '1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  const apiPort = process.env[ENV_CONFIGURATION.API_PORT] ?? 10000;
  await app.listen(apiPort, '0.0.0.0', () => {
    logger.log({
      message: `🍕 Running @bite-track/api at port: ${apiPort} 🍕`,
    });
  });
}
void bootstrap();
