# 🍜 Bite Track 🥗

Monorepo based on `turborepo` used to build a small app for voice controlled nutrition tracking, mostly for fun and because it sounds useful to me.

This is a work in progress, and I'm building it as I go. I'm using this project as a playground for anything I want to practice.

The `/docs` folder contains some notes and ideas I have for future articles, detailing the process of building this app.

## What's inside?

This monorepo includes the following packages and apps:

### Apps and Packages

- `api`: an NestJS API server, based on hexagonal architecture
- `web`: a [Vite](https://vitejs.dev/) single page app
- `mobile`: a [React Native](https://reactnative.dev/) app 🚧
- `@bite-track/eslint-config`: ESLint configurations used throughout the monorepo
- `@bite-track/jest-presets`: Jest configurations
- `@bite-track/ui`: a dummy React UI library (which contains `<CounterButton>` and `<Link>` components)
- `@bite-track/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This monorepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

## TODO

- [ ] Add a CI/CD pipeline
- [ ] Add a mobile app
- [ ] Add a voice recognition feature
- [ ] Add a database
- [ ] Add a cache layer
