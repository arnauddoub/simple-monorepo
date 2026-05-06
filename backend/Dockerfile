FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY . .
ENV CI=true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm build:packages
RUN pnpm deploy --legacy --filter @my-monorepo/backend /app/output
WORKDIR /app/output
RUN node ace build

FROM node:24-alpine AS dokploy
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/output/node_modules /app/node_modules
COPY --from=build /app/output/build /app
EXPOSE 3333
CMD ["node", "./bin/server.js"]
