# syntax=docker/dockerfile:1.7

# ---------- Build stage ----------
FROM node:20-alpine AS build

# Install build deps for native modules (sharp/libvips, node-gyp).
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git \
    python3

ENV NODE_ENV=production

WORKDIR /opt/app

# Install dependencies first to leverage layer caching.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

# Copy the rest of the source and build the admin panel.
COPY . .
RUN yarn build

# ---------- Runtime stage ----------
FROM node:20-alpine AS runtime

# Runtime libs needed by sharp/libvips.
RUN apk add --no-cache vips-dev tini

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=1337

WORKDIR /opt/app

# Bring the built application and its node_modules from the build stage.
COPY --from=build /opt/app /opt/app

# Run as the unprivileged "node" user shipped in the base image.
RUN chown -R node:node /opt/app
USER node

EXPOSE 1337

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["yarn", "start"]
