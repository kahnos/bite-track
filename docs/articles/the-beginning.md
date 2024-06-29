# The Beginning

These series of articles are meant to showcase how to build a production ready TypeScript-based monorepo using turborepo, NestJS, React, Vite.

## What are we building?

### 🍜 Bite Track 🥗

Initially, we'll build a small distributed app for voice controlled nutrition tracking, with a focus on quick and easy tracking. The idea is to have a simple app that allows you to track your meals and snacks, and get a quick overview of your daily intake in terms of macros and calories.

This app will be built using a monorepo structure, with a NestJS API server, a Vite/React single page app, and a React Native mobile app. We'll call it `Bite Track`.

### Purpose

The main purpose of this project is to showcase how to build a production ready TypeScript-based monorepo step-by-step. We'll also cover how to setup a CI/CD pipeline using husky + GitHub Actions, and how to deploy the app to Vercel.

Personally, the main purpose is to have fun building something useful, and to learn more about TypeScript, React, and NestJS. Also, I've been wanting to build a nutrition tracking app for a while, so this is a good opportunity to do it.

In general, I wanted to document the development process through these articles as I build the app, and will code snippets, explanations, and tips on how to build a production ready app, with a focus on maintainability, scalability, and performance.

## First steps

Let's begin by creating a new monorepo using turborepo. Turborepo provides a simple way to manage a monorepo with multiple packages and apps, improving the development experience, task performance, task scheduling, caching, and more.

For more information on turborepo, check out the [official documentation](https://turbo.build/repo/docs).

There's several starter template example available in turborepo, but for this project we'll use the `kitchen-sink` template, which includes several starter apps and packages.

From the apps, we'll keep the `api` and `admin` apps, and from the packages, we'll keep them all: `eslint-config`, `jest-presets`, `logger`, `ui`, and `typescript-config`. We'll rename `admin` to `web`, and use that as our simple frontend, which will be based on Vite and React.

```bash
npx create-turbo@latest --example bite-track
```

For now, the folder structure will look like this:

```bash
bite-track/
├── apps/
│   ├── api/                => NestJS API server
│   └── web/                => React/Vite/Tailwind/Storybook web app
├── packages/
│   ├── config-eslint/       => Shared ESLint configurations
│   ├── config-typescript/   => Shared TypeScript configurations
│   ├── jest-presets/       => Shared Jest configurations
│   ├── logger/             => Isomorphic logger
│   └── ui/                 => React/Vite/Tailwind/Storybook UI library
```

> *You can build this from scratch as well, but you know, why would you*

Let's also go to every package.json and rename the `name` field to `@bite-track/<package-name>` (remember to set the name in the root `package.json` as well). This is usually so we can publish them to npm later, and even though not needed for the apps, I like the standard.

Then, let's cleanup everything and reset the dependencies, to make sure everything is working as expected. From the root folder, run:

```bash
yarn clean
yarn
```

This will re-create the `yarn.lock` file and `node_modules` folder, and install all dependencies.

Now, let's build everything:

```bash
yarn build
```

Take note of the scripts in the `package.json` files, as they are the ones that will be used to build, test, and run the apps and packages; supported by `turbo.json`, which is the configuration file for turborepo's tasks.

These tasks enable you to run commands in parallel, and also to run them in a specific order, which is very useful for a monorepo with multiple packages and apps. It also takes care of caching, so if you run the same command again, it will be **much** faster.

For more info on tasks and how the cache works, see the [docs](https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks).

## Current shared packages

So why do we have some shared packages in this monorepo? Let's take a look at each one of them:

### `@bite-track/eslint-config`

Eslint is used to enforce code quality and consistency, and to catch bugs early. Very important to maintain a clean codebase.

This package contains the shared ESLint configurations used throughout the monorepo. It includes the following configurations:

- `react`
- `server`

Pretty self explanatory.

### `@bite-track/typescript-config`

This package contains the shared TypeScript configurations used throughout the monorepo. It includes the following configurations:

- `base`                => used by the API and shared packages
- `react-library`       => used by the UI library
- `vite`                => used by the web app

TypeScript is a JavaScript exception used for static type checking. It provides additional syntax for defining types or interfaces and mostly helps you avoid runtime errors.

### `@bite-track/jest-presets`

Jest is a delightful JavaScript Testing Framework with a focus on simplicity, and a massive ecosystem. It works with any project, and it's used to test JavaScript code. This package provides two sample Jest configurations:

- `node`                => used by the API
- `browser`             => used by the web app

### `@bite-track/ui`

This package will be a UI library that will contain shared components used by the web app. It will be based on React, Vite, and Tailwind CSS, and will also include Storybook for component documentation.

## Tooling

This monorepo has some additional tools already setup for you (baseline courtesy of `Turbo`):

- [Turbo](https://turbo.build) for managing the monorepo
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS
- [Storybook](https://storybook.js.org) for component documentation
- [Vite](https://vitejs.dev) for fast development
- [React](https://reactjs.org) for building user interfaces
- [NestJS](https://nestjs.com) for building server-side applications

## Maintaining some consistency

To keep the codebase consistent in a simple manner for now, let's add `husky` and `lint-staged` to the root `package.json`:

[`husky`](https://github.com/typicode/husky) is a tool that makes it easy to use githooks as if they were npm scripts. It's used to run tasks before committing or pushing code, to ensure that the code is linted and tested.

[`lint-staged`](https://github.com/lint-staged/lint-staged) is a tool that allows you to run scripts on staged files in git. It's used to run tasks on files that are staged for commit, and it's used in conjunction with `husky` to run tasks before committing or pushing code.

From the root folder, run:

```bash
yarn add -D -W husky lint-staged
```

The `-D` flag is used to add the package as a dev dependency. The `-W` flag is used to add the package to the workspace root, so it's available to all packages and apps.

Then, run:

```bash
npx husky init
```

This simplifies the setup of `husky` by creating the `.husky` folder, with a sample `pre-commit` hook file that we'll modify as follows:

>.husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn
npx lint-staged
```

Add the following to the root `package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": [
      "eslint --fix --cache --no-error-on-unmatched-pattern",
      "prettier --write --ignore-unknown --cache"
    ]
  }
}
```

*Note: If you're having memory issues with eslint, you can use:*

```js
"node --max_old_space_size=4096 ./node_modules/eslint/bin/eslint.js --cache --fix --no-error-on-unmatched-pattern"
```

This will run `eslint` and `prettier` on all staged files before committing, and if there are any errors, it will prevent the commit from happening, so you can fix them before committing.

Prior to commiting, let's make sure we have `eslint` and `prettier` installed in the root folder:

```bash
yarn add -D -W eslint@^8 prettier
```

> Note: We're using `eslint@^8` because of config file compatibility. If you're using version 9 or above, make sure to adjust the config file accordingly.

Let's also add it to the `@bite-track/eslint-config` package:

```bash
yarn workspace @bite-track/eslint-config add -D eslint prettier
```

Finally, let's test it out! Run the following command and let's commit our progress:

```bash
yarn
git add .
git commit -m "feat: add monorepo setup, husky and lint-staged"
```

It should run the tasks and commit the changes (if there are no errors).

## Next steps

This will do for now!

In the next article, we'll start building the API server using NestJS, and we'll also setup the database using TypeORM. We'll focus primarily on maintaining a scalable codebase with clear abstraction of the domain layer and persistence layers, as well as providers, with an approach based on hexagonal architecture, and an overview on how to write tests for the API.

Stay curious! 🐈‍⬛
