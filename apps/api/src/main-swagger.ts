import * as fs from 'fs';

import { NestFactory } from '@nestjs/core';

import 'dotenv/config';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app.module';

const version = process.env.npm_package_version;

async function generateDocs() {
  // ===== App =====
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // ===== Docs =====
  const options = new DocumentBuilder()
    .setTitle('🍕 Bite Track API 🍕')
    .setVersion(version ?? '1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('./src/swagger.json', JSON.stringify(document));
}
void generateDocs();
