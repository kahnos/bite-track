# API Architecture & Testing

## Introduction

In this article, we'll start building the API server using NestJS, and we'll also setup the database using TypeORM. We'll focus primarily on maintaining a scalable codebase with clear abstraction of the domain layer and persistence layers, as well as providers, with an approach based on the ports and adapters architecture and a mixture of other standards and best practices.

We'll also and an overview on how to write tests for the API.   // TODO: Review - Should this be a separate article?

## Setting up the API folder structure

Let's begin by destroying everything! Delete everything inside `/apps/api/src` folder.

```bash
rm -rf apps/api/src/*
```

Fun.

Noe, let's install the necessary NestJS dependencies, as mentioned in the [docs](https://docs.nestjs.com/):

```bash
yarn workspace @bite-track/api add @nestjs/core @nestjs/common rxjs reflect-metadata
```

Next, let's setup a folder structure for the API:

```bash
mkdir -p apps/api/src/{adapters,features,common}
mkdir -p apps/api/src/adapters/{nutritional-value/http,nutritional-value/cloud-storage,nutritional-entry/database}
mkdir -p apps/api/src/features/nutrition-entry/common/{business-logic,web,mobile}
mkdir -p apps/api/src/features/nutrition-entry/common/business-logic/{ports,domain}
mkdir -p apps/api/src/features/nutrition-entry/common/domain/{factories,models,dtos}
mkdir -p apps/api/src/common/{constants,utils,enums}
```

The -p flag will create the necessary parent directories if they don't exist.

> *You can use any naming you like, just keep it consistent*

These folders will be used to separate the different layers of the application,  used as follows:

- `adapters`: containts the adapters (implementations) to specific ports (interfaces) to the external world (APIs, databases, queues, cloud providers, ORMs, etc.).
- `features`: contains the features of the application, which are the use cases of the application. This includes both client layer (controllers) and server layer (business logic and domain).
- `common`: contains shared code between the different layers.

The folder structure should look like this for any given adapter, as an example:

```bash
apps/api/src
├──── adapters
├──────── nutritional-value
├──────────── http
├──────────── cloud-storage
├──────── nutritional-entry
├──────────── database
├──── common
├──────── constants
├──────── utils
├──────── enums
├──────── ...
├──── features
├──────── nutrition-entry
├──────────── common
├──────────────── business-logic
├──────────────────── ports
├──────────────────── ...
├──────────────── domain
├──────────────────── factories
├──────────────────── models
├──────────────── dtos
├──────────────────── outputs
├──────────────────── inputs
├──────────────── ...
├──────────── web
└──────────── mobile
    
```

Everything above is just a suggestion, and you can organize your code however you like. The important part is to keep the separation of concerns and the clear abstraction of the different layers. In here, we're doing that through the use of folders, modules and NestJS's injection system. This is a very powerful feature of NestJS, and it's what makes it so easy to maintain a scalable codebase.

An explanation to the folders above:

- `adapters/nutritional-value/http`: contains the HTTP adapters for the nutritional value feature, for example, for specific external APIs.
- `adapters/nutritional-value/cloud-storage`: contains the cloud storage adapters for the nutritional value feature, for example, for specific cloud providers like AWS or Azure.
- `adapters/nutritional-entry/database`: contains the database adapters for the nutritional entry feature, for example, for specific ORMs like TypeORM or Prisma.
- `common`: contains shared code between the different layers, like constants, utils, enums, etc.
- `features/nutrition-entry/common`: contains the common code between the client and server layers of the nutrition entry feature.
- `features/nutrition-entry/common/business-logic/ports`: contains the ports (interfaces) for the business logic of the nutrition entry feature. These will be implemented by the adapters. For example, a database repository or a cloud provider.
- `features/nutrition-entry/common/domain`: contains the domain logic of the nutrition entry feature, like factories, models, dtos, etc.
- `features/nutrition-entry/*`: contains the client layers for * client (web/mobile) of the nutrition entry feature. This is where the controllers will be, as well as API metadata documentation.

## Setting up our expectations AKA let's test this thing

Before we start writing code, let's setup some expectations for our API. We'll use Jest and Supertest for this, as it's the default testing framework for NestJS.
