import * as fs from 'fs';

import { NestFactory } from '@nestjs/core';

import 'dotenv/config';

import { createClient } from '@hey-api/openapi-ts';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from '@/app.module';

const version = process.env.npm_package_version;

async function generateDocs() {
  // ===== App =====
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // ===== Docs =====
  logger.log('Generating OpenAPI docs...');
  const options = new DocumentBuilder()
    .setTitle('🍕 Bite Track API 🍕')
    .setVersion(version ?? '1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  logger.log('Writing OpenAPI docs to file...');
  fs.writeFileSync('./src/swagger.json', JSON.stringify(document));

  logger.log('Generating OpenAPI client...');
  createClient({
    input: 'src/swagger.json',
    output: '../../packages/api-client/src', // we generate the client in the types package, which is compiled afterwards
  });
  logger.log('OpenAPI client generated! 🎉');
}
void generateDocs();
