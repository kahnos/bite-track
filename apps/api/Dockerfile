# 🙏 TY for the template: https://www.tomray.dev/nestjs-docker-production
# See: https://turbo.build/repo/docs/guides/tools/docker

FROM node:18-alpine AS base

###################
# BUILDER FOR LOCAL DEVELOPMENT
###################

FROM base AS development
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo@^2
RUN yarn global add @nestjs/cli@^10

# First install dependencies (as they change less often)
# Add lockfile and package.json's of isolated subworkspace
COPY --chown=node:node .gitignore .gitignore
COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock
RUN mkdir -p ./apps/api
COPY --chown=node:node ./apps/api/package.json ./apps/api/package.json

# Bundle app source
COPY --chown=node:node . .

# Install dependencies
RUN yarn install --frozen-lockfile

# Don't run production as root
USER node

###################
# BUILDER FOR PRODUCTION
###################

FROM base As builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add turbo@^2
COPY --chown=node:node . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune @bite-track/api --docker

###################
# INSTALLER FOR PRODUCTION
###################

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo@^2
RUN yarn global add @nestjs/cli@^10

# First install dependencies (as they change less often)
# Add lockfile and package.json's of isolated subworkspace
COPY --chown=node:node .gitignore .gitignore
COPY --chown=node:node --from=builder /app/out/json/ .
COPY --chown=node:node --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile && yarn cache clean
# TODO: Add --production flag to yarn install after resolving missing devDependencies

# Build the project
COPY --chown=node:node --from=builder /app/out/full/ .
COPY --chown=node:node turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn build --filter=@bite-track/api

###################
# PRODUCTION
###################

FROM base As production
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=installer /app .

# Start the server using the production build
CMD [ "node", "apps/api/dist/main.js" ]
